import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PanelComponent } from './components/panel/panel.component';
import { MainComponent as PanelMainComponent } from './components/panel-components/main/main.component';
import { PageNotFoundComponent } from './components/PageNotFound/PageNotFound.component';
import { RecentComponent } from './components/panel-components/recent/recent.component';
import { PhotosComponent } from './components/panel-components/photos/photos.component';
import { PastComponent } from './components/panel-components/past/past.component';
import { DownloadsComponent } from './components/panel-components/downloads/downloads.component';
import { TrashComponent } from './components/panel-components/trash/trash.component';
import { AuthService } from './services/auth.service';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['panel']);

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent, ...canActivate(redirectToHome) },
  {
    path: 'panel',
    component: PanelComponent,
    // canActivate: [AuthService],
    ...canActivate(redirectToLogin),
    children: [
      { path: '', component: PanelMainComponent },
      { path: 'recent', component: RecentComponent },
      { path: 'photos', component: PhotosComponent },
      { path: 'past', component: PastComponent },
      { path: 'downloads', component: DownloadsComponent },
      { path: 'trash', component: TrashComponent },
    ],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }, // redirect to `pagenotfoundComponent---404`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
