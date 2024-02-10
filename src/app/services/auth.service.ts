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
    if (this.servis.aktiflikkontrol()) {
      sonuc = true;
    } else {

      s.islem = false;
      s.mesaj = 'Please log in first!';
      this.toast.applyToast(s);

      this.router.navigate(['/login']);
    }
    return sonuc;
  }
}
