import { Component, OnInit } from '@angular/core';
import { Observable, ObservableInput, Subscriber } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { FbservisService } from 'src/app/services/fbservis.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  myImage!: Observable<any>;
  currentUser!: any;
  base64code!: any;
  mediaSize: any = 0;
  mediaName!: string;

  constructor(
    public servis: DataService,
    public fbservice: FbservisService,
    public toast: HotToastService
  ) {}

  ngOnInit() {
    this.fbservice.AktifUyeBilgi.subscribe((d) => (this.currentUser = d));
  }

  uploadThePhoto(event: any) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.currentUser.mediaSize = Math.floor(file.size / 1000);
    this.mediaSize > 1000
      ? (this.currentUser.mediaSize = this.mediaSize / 1000 + ' MB')
      : (this.currentUser.mediaSize += ' KB');
    this.currentUser.mediaName = file.name;
    this.fbservice
      .uploadImage(
        event.target.files[0],
        `images/${this.currentUser.uid}${Math.floor(
          Math.random() * 10000
        ).toString()}`
      )
      .pipe(
        this.toast.observe({
          loading: 'Fotoğraf Yükleniyor...',
          success: 'Fotoğraf yüklendi',
          error:
            'Fotoğraf yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
        }),
        // concatMap((foto) => this.fbservice.addPhotoToStorage(foto))
        // concatMap((foto) => this.currentUser.path = foto)
        concatMap((foto) =>
          this.fbservice.addPhotoToStorage(this.currentUser, foto)
        )
      )
      .subscribe(() => {
        // console.log(this.currentUser);
        // this.fbservice.addPhotoToStorage(this.currentUser);
      });
  }

  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;

    const file: File = (target.files as FileList)[0];

    this.uploadThePhoto($event);

    this.mediaSize = Math.floor(file.size / 1000);
    this.mediaSize > 1000
      ? (this.mediaSize = this.mediaSize / 1000 + ' MB')
      : (this.mediaSize += ' KB');
    this.mediaName = file.name;

    // this.uploads.push(this.styles);
    // console.log(this.mediaSize);
    this.convertToBase64(file);
  };

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      this.myImage = d;
      // this.servis.uploadThePhoto(this.myImage, this.mediaName, this.mediaSize);
      // newUserPast(date: any, time: any, mediaName: string) {
      let date = new Date();
      let hours = date.getHours();
      let minute = date.getMinutes();
      let seconds = date.getSeconds();
      this.fbservice.AktifUyeBilgi.subscribe((user: any) => {
        this.fbservice.addPasts({
          uid: user.uid.toString(),
          date: new Date().toLocaleDateString('tr-TR'),
          time: `${hours}:${minute}:${seconds}`.toString(),
          message: `${this.mediaName} diske yüklendi`,
        });
      });

      // this.servis.newUserPast(
      //   new Date().toLocaleDateString('tr-TR'),
      //   `${hours}:${minute}:${seconds}`,
      //   `${this.mediaName} diske yüklendi`
      // );
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);

      subscriber.complete();
    };

    filereader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }

  addClassAndText() {
    document.querySelector('.upload-bg')?.classList.add('addclass');
  }

  leaveAllClass() {
    document.querySelector('.upload-bg')?.classList.remove('addclass');
  }

  cliktheInputFile() {
    (<HTMLInputElement>document.querySelector('.file-input')).click();
  }
}
