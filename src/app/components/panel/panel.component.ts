import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FbservisService } from 'src/app/services/fbservis.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit {
  userLevel!: string;
  userName!: string;
  constructor(
    public servis: DataService,
    public fbservice: FbservisService,
    public router: Router,
    public toast: HotToastService
  ) {}

  ngOnInit() {
    this.fbservice.AktifUyeBilgi.subscribe((user: any) => {
      this.userName = user.displayName;
      this.userLevel = user.email;
    });
    document
      .querySelector('#sidebarCollapse')
      ?.addEventListener('click', () => {
        document.querySelector('#sidebar')?.classList.toggle('active');
        document.querySelector('#content')?.classList.toggle('active');
      });

    this.userLevel = this.servis.getUserLevel();
    this.userName = this.servis.getUserName();
  }

  logOut() {
    this.fbservice
      .logout()
      .pipe(
        this.toast.observe({
          success: 'Oturum Başarıyla Kapatıldı',
          loading: 'Oturum Kapatılıyor...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['login']);
      });
  }

  addClassForSideNav() {
    // $(function() {
    //   // Sidebar toggle behavior
    //   $('#sidebarCollapse').on('click', function() {
    //     $('#sidebar, #content').toggleClass('active');
    //   });
    // });
    // document.querySelector("#sidebar")
  }
}
