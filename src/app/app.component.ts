import { Component } from '@angular/core';
import { FbservisService } from './services/fbservis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'file-management-portal';
  uye = this.fbservice.AktifUyeBilgi;

  constructor(public fbservice: FbservisService) {}
}
