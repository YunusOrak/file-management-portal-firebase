import { Injectable } from '@angular/core';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Info } from '../models/Info';

@Injectable({
  providedIn: 'root',
})
export class MytoastService {
  constructor(private toast: HotToastService) {}

  applyToast(info: Info) {
    if (info.islem) {
      this.toast.success(info.mesaj, {
        style: {
          border: '1px solid #0e7309',
          padding: '16px',
          color: '#0e7309',
        },
      });
    } else {
      this.toast.error(info.mesaj, {
        style: {
          border: '1px solid #a30505',
          padding: '16px',
          color: '#a30505',
        },
      });
    }
  }
}
