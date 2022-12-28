import { Component, OnInit } from '@angular/core';
import { confirmPasswordReset } from '@firebase/auth';
import { Image } from 'src/app/models/Image';
import { DataService } from 'src/app/services/data.service';
import { FbservisService } from 'src/app/services/fbservis.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  photos!: any;
  currentUserId!: any;
  constructor(public servis: DataService, public fbservice: FbservisService) {}

  ngOnInit() {
    this.fbservice.AktifUyeBilgi.subscribe((d) => {
      this.currentUserId = d?.uid;
      this.fbservice
        .getTheImages()
        .subscribe(
          (d) => (this.photos = d.filter((e) => e.uid == this.currentUserId))
        );
    });
    // this.fbservice.getTheImages().subscribe((d:any) => this.photos = d.filter((e:any)=> e.uid == this.currentUserId));
    // this.fbservice
    //   .getTheImages()
    //   .subscribe(
    //     (d) =>
    //       (this.photos = d.filter(
    //         (element) => element.uid == this.currentUserId
    //       ))
    //   );
    // this.fbservice.getTheImages().subscribe((d) => {
    //   this.photos = d;
    //   console.log(d);
    // });
    // this.fbservice.AktifUyeBilgi.subscribe((d) => {
    //   this.currentUserId = d?.uid;
    //   this.fbservice.getTheImages().subscribe((a) => {
    //     this.photos = a.filter((element) => element.uid == this.currentUserId);
    //   });
    // });
    // this.photos = this.servis.returnUserPhotos();
  }
}
