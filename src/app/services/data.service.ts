import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Info } from '../models/Info';
import { Uye } from '../models/Uye';
import { MytoastService } from './mytoast.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apiUrl = 'http://localhost:3000/';
  data!: any;
  data2: any = {
    photopath: 'base64url22232222222222',
    mediaName:
      "Geome2222232322222tri Konu anlatımlı Ders Foyu Ucgenler (1).pdf” dosyasını Disk'e yüklendi",
    mediaSize: '172222222232332kb',
  };
  aktifuser!: boolean;
  yeniuye: Uye = new Uye();
  userdetay!: any;
  userLevel!: string;
  userIddd!: number;
  userNameeeeee!: string;
  dataInfo!: boolean;
  dataNew!: any;
  nData!: any;
  userPasts!: any;
  constructor(
    public toast: MytoastService,
    public http: HttpClient,
    public router: Router
  ) {}

  register(userName: string, password: string, status: boolean) {
    let s: Info = new Info();
    this.yeniuye.username = userName;
    this.yeniuye.password = password;
    this.yeniuye.admin = 'user';
    this.yeniuye.dateofreg = new Date().toLocaleDateString('tr-TR');
    this.http.post(`${this.apiUrl}users`, this.yeniuye).subscribe((d) => {
      s.islem = true;
      s.mesaj = 'Başarılıyla kayıt olundu Giriş Yapabilirsiniz';
      this.toast.applyToast(s);
      this.dataNew = [
        {
          photopath: '222222222222222222222222222222222222222222222222222',
          mediaName:
            "Geome2222232322222tri Konu anlatımlı Ders Foyu Ucgenler (1).pdf” dosyasını Disk'e yüklendi",
          mediaSize: '172222222232332kb',
        },
      ];
      this.http
        .post(`${this.apiUrl}photos`, {
          username: userName,
          data: { d: this.dataNew },
        })
        .subscribe((dss) => {
          console.log('başarılı');
        });

      let date = new Date();
      let hours = date.getHours();
      let minute = date.getMinutes();
      let seconds = date.getSeconds();
      this.http
        .post(`${this.apiUrl}pasts`, {
          pasts: [
            {
              date: new Date().toLocaleDateString('tr-TR'),
              time: `${hours}:${minute}:${seconds}`,
              mediaName: "'inde hesap oluşturuldu",
            },
          ],
        })
        .subscribe((d) => {
          console.log(d);
        });
    });
  }

  OturumKontrol(userName: string, password: string, status: boolean) {
    //--> oturum aç işlevi görüyor
    let s: Info = new Info();

    if (status) {
      this.http
        .get(`${this.apiUrl}users?username=${userName}&password=${password}`)
        .subscribe((d: any) => {
          if (d.length >= 1) {
            s.islem = true;
            s.mesaj = 'Giriş Yapıldı';
            this.toast.applyToast(s);
            this.aktifuser = true;
            this.router.navigate(['/panel']);

            this.userdetay = d['0'];
            this.userIddd = this.userdetay.id;
            this.userNameeeeee = this.userdetay.username;
            this.userLevel = this.userdetay.admin;
            // console.log(this.userdetay);

            this.getUserPhotos(this.userdetay.username);
            this.getUserPasts(this.userIddd);
            // this.http
            //   .get(`${this.apiUrl}photos?username=${this.userdetay.username}`)
            //   .subscribe((resp) => {
            //     this.data = resp;
            //     // this.data['0'].data.d; -->>>>>>>>> eklenecek veri yeir
            //     // this.data['0'].data.push(this.data2); --> Ekleme İşlemiiiiii çok önemli

            //     // ben
            //     if (this.data['0'].data.d.length >= 1) {
            //       //--> Giriş yapınca önceki fotoğrafları var ise onları this.data da tutmakta şu an bunu ekrana yazdıracağız
            //       this.dataInfo = true; //--> Foto datasına bilgi vermek amacıyla
            //       // console.log(this.data['0'].data.d);
            //     }
            //   });
          } else {
            s.islem = false;
            s.mesaj = 'Böyle bir kullanıcı bulunamadı';
            this.toast.applyToast(s);
          }
        });
    }
    return true;
  }

  getUserPhotos(username: any) {
    this.http
      .get(`${this.apiUrl}photos?username=${username}`)
      .subscribe((resp) => {
        this.nData = resp;
        // this.data['0'].data.d; -->>>>>>>>> eklenecek veri yeir
        // this.data['0'].data.push(this.data2); --> Ekleme İşlemiiiiii çok önemli

        // this.nData = resp;
        // ben
        // if (this.data['0'].data.d.length >= 1) {
        //   //--> Giriş yapınca önceki fotoğrafları var ise onları this.data da tutmakta şu an bunu ekrana yazdıracağız
        //   this.dataInfo = true; //--> Foto datasına bilgi vermek amacıyla
        //   // console.log(this.data['0'].data.d);
        // }
        // console.log(this.nData);
        // setTimeout(() => {
        //   this.userIddd = this.nData['0'].id;
        //   console.log(this.userIddd);

        // this.uploadThePhoto('photopath', 'mediaName', 'mediaSize'); //-------->>>>>>> Çağırma, foto ekleme
        // }, 1000);
        return resp;
      });
  }

  getUserPasts(userId: number) {
    this.http.get(`${this.apiUrl}pasts/${userId}`).subscribe((d: any) => {
      this.userPasts = d.pasts;
    });
  }

  returnUserPasts() {
    return this.userPasts;
  }

  newUserPast(date: any, time: any, mediaName: string) {
    let newPast = {
      date: date,
      time: time,
      mediaName: mediaName,
    };
    this.userPasts.push(newPast);
    this.http
      .patch(`${this.apiUrl}pasts/${this.userIddd}`, { pasts: this.userPasts })
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  getUserLevel() {
    return this.userLevel;
  }

  getUserName() {
    return this.userNameeeeee;
  }

  returnUserPhotos() {
    return this.nData['0'].data.d;
  }

  uploadThePhoto(
    photopath: Observable<any>,
    mediaName: string,
    mediaSize: string
  ) {
    // console.log(this.userdetay);
    // console.log(this.getUserPhotos(this.userdetay.username));
    // console.log('username', this.userNameeee);
    this.data2 = {
      photopath: photopath,
      mediaName: `${mediaName} dosyasını disk'e yüklendi.`,
      mediaSize: mediaSize,
    };

    // console.log(typeof this.nData);
    this.nData['0'].data.d.push(this.data2); //data: { d: this.dataNew },

    // console.log('deneme', this.nData['0'].data.d);
    // console.log(this.userIddd);

    this.http
      .patch(`${this.apiUrl}photos/${this.userIddd}`, {
        data: { d: this.nData['0'].data.d },
      })
      .subscribe((err) => {
        console.log(err);
      });
  }

  aktiflikkontrol() {
    if (this.aktifuser) {
      return true;
    } else {
      return false;
    }
  }

  YeniFotoğrafEkle() {
    // this.http.patch()
  }
}
