import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturesComponent } from './components/features/features.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { BlogPreviewComponent } from './components/blog-preview/blog-preview.component';
import { FooterComponent } from './components/footer/footer.component';
import { DragImageComponent } from './components/drag-image/drag-image.component';
import { MailSubsComponent } from './components/mail-subs/mail-subs.component';
import { DwgComponent } from './components/dwg/dwg.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { MainComponent as main2 } from './components/panel-components/main/main.component';
import { PageNotFoundComponent } from './components/PageNotFound/PageNotFound.component';
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { HotToastModule } from '@ngneat/hot-toast';
import { HttpClientModule } from '@angular/common/http';
import { SnowcompComponent } from './components/snowcomp/snowcomp.component';
import { PhotosComponent } from './components/panel-components/photos/photos.component';
import { PastComponent } from './components/panel-components/past/past.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FeaturesComponent,
    TestimonialComponent,
    BlogPreviewComponent,
    FooterComponent,
    DragImageComponent,
    MailSubsComponent,
    DwgComponent,
    LoginComponent,
    PanelComponent,
    PageNotFoundComponent,
    main2,
    SnowcompComponent,
    PhotosComponent,
    PastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HotToastModule.forRoot(),
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
