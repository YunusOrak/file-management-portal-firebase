import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { FbservisService } from 'src/app/services/fbservis.service';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Pasts } from 'src/app/models/Pasts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: boolean = true;
  logandreg = {
    mail: '',
    password: '',
    displayName: '',
    status: this.login,
  };
  // past!: Pasts[];
  past!: any;
  constructor(
    public toast: HotToastService,
    public servis: DataService,
    public fbservis: FbservisService,
    public auth: Auth,
    public route: Router
  ) {}

  ngOnInit() {
    this.fbservis.AktifUyeBilgi.subscribe((user) => {
      console.log(user);
    });
    // console.log(this.logandreg);
    // this.toast.applyToast(info);
  }

  kontrol() {
    if (this.login) {
      this.fbservis
        .login(this.logandreg.mail, this.logandreg.password)
        .pipe(
          this.toast.observe({
            success: 'Oturum Başarıyla Açıldı',
            loading: 'Oturum Açılıyor...',
            error: ({ message }) => `${message}`,
          })
        )
        .subscribe((resp) => {
          this.route.navigate(['panel']);
        });
    } else {
      this.fbservis
        .register(this.logandreg.mail, this.logandreg.password)
        .pipe(
          switchMap(({ user: { uid } }) =>
            this.fbservis.UyeEkle({
              uid,
              email: this.logandreg.mail,
              displayName: this.logandreg.displayName,
            })
          ),
          this.toast.observe({
            success: 'Kayıt Başarılı',
            loading: 'Kayıt Yapılıyor...',
            error: ({ message }) => `${message}`,
          })
        )
        // .pipe(
        //   this.toast.observe({
        //     success: 'Başarıyla kayıt olundu',
        //     loading: 'Kontrol ediliyor...',
        //     error: ({ message }) => `${message}`,
        //   })
        // )
        .subscribe((resp) => {
          this.login = !this.login;
          this.fbservis.AktifUyeBilgi.subscribe((user: any) => {
            // this.past = [
            //   {
            //     uid: user.uid.toString(),
            //     date: new Date().toLocaleDateString('tr-TR'),
            //     time: new Date().getTime().toString(),
            //     message: 'in de oluşturuldu',
            //   },
            // ];
            let date = new Date();
            let hours = date.getHours();
            let minute = date.getMinutes();
            let seconds = date.getSeconds();
            this.fbservis.pasts({
              uid: user.uid.toString(),
              date: new Date().toLocaleDateString('tr-TR'),
              time: `${hours}:${minute}:${seconds}`.toString(),
              message: 'in de oluşturuldu',
            });
          });
          // this.fbservis.posts();
        });
    }
  }
}
