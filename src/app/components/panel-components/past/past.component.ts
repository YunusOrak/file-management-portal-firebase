import { Component, OnInit } from '@angular/core';
import { Pasts } from 'src/app/models/Pasts';
import { DataService } from 'src/app/services/data.service';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css'],
})
export class PastComponent implements OnInit {
  userPasts: Pasts[] = [];
  currentUserId!: any;
  constructor(public servis: DataService, public fbservice: FbservisService) {}

  ngOnInit() {
    // this.userPasts = this.servis.returnUserPasts();
    this.fbservice.AktifUyeBilgi.subscribe(
      (d) => (this.currentUserId = d?.uid)
    );
    this.fbservice.getThePasts().subscribe((d: any) => {
      this.userPasts = d.filter((e: any) => e.uid == this.currentUserId);
      console.log(this.userPasts);
    });

    // .subscribe((resp: any) => {
    //   console.log(resp);
    // });
  }
}
