import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';

import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import {
  switchMap,
  of,
  Observable,
  from,
  concatMap,
  map,
  take,
  ObservableInput,
} from 'rxjs';
import { FBUye } from '../models/FBUye';
import { Pasts } from '../models/Pasts';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root',
})
export class FbservisService {
  aktifUye = authState(this.auth);
  deneme!: Array<any>;
  currentUserId!: any;
  data: any;
  constructor(
    public fs: Firestore,
    public auth: Auth,
    public storage: Storage
  ) {}

  logout() {
    return from(this.auth.signOut());
  }

  // ************* GÜNCELLEMEK İÇİN BİREBİR
  // addCity() {
  //   console.log(this.aktifUye);
  //   setDoc(doc(this.fs, 'uyeler', 'LA'), {
  //     name: 'Los Angeles',
  //     state: 'CA',
  //     country: 'USA',
  //   });
  // }
  // ************* GÜNCELLEMEK İÇİN BİREBİR

  register(mail: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, password));
  }

  login(mail: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, password));
  }

  UyeEkle(uye: FBUye) {
    let ref = doc(this.fs, 'Uyeler', uye.uid);
    return from(setDoc(ref, uye));
  }

  pasts(past: Pasts) {
    return from(setDoc(doc(this.fs, 'Pasts', past.uid), past));
  }

  addPasts(past: Pasts) {
    const ref = collection(this.fs, 'Pasts/');
    return addDoc(ref, past);
  }

  getThePasts() {
    var ref = collection(this.fs, 'Pasts');
    return this.aktifUye.pipe(
      concatMap((user) => {
        const myQuery = query(ref);
        return collectionData(myQuery, { idField: 'pastId' }) as Observable<
          Pasts[]
        >;
      })
    );
  }

  uploadImage(image: File, path: string) {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }

  getTheImages() {
    var ref = collection(this.fs, 'Images');
    return collectionData(ref) as Observable<Image[]>;
  }

  addPhotoToStorage(userInfos: any, path: string) {
    userInfos.path = path;
    let ref = doc(
      this.fs,
      'Images',
      Math.floor(Math.random() * 10000).toString()
    );
    return from(setDoc(ref, userInfos));
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Pasts>;
      })
    );
  }
}
