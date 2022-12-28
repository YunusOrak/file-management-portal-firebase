import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Info } from '../models/Info';
import { DataService } from './data.service';
import { MytoastService } from './mytoast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  userName: string = 'json-server2';
  password: string = 'typicode22';
  status: boolean = true;
  constructor(
    public servis: DataService,
    private router: Router,
    public toast: MytoastService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let s: Info = new Info();
    var sonuc: boolean = false;
    // if (this.servis.OturumKontrol(this.userName, this.password, this.status)) {
    if (this.servis.aktiflikkontrol()) {
      sonuc = true;
    } else {
      // alert('Yetkiniz yok giriş yapamazsınız');

      s.islem = false;
      s.mesaj = 'Lütfen önce giriş yapınız!';
      this.toast.applyToast(s);

      this.router.navigate(['/login']);
    }
    return sonuc;
  }
}

// }
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     public servis: DataService
//   ) {

//   }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     var sonuc: boolean = false;
//     if (this.servis.OturumKontrol()) {
//       sonuc = true;
//     } else {
//       location.href = "/login";
//     }
//     return sonuc;
//   }
