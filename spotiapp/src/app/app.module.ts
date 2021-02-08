import "@angular/compiler";
import { IconDefinition } from '@ant-design/icons-angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AccountBookFill, AlertFill, AlertOutline,PlayCircleTwoTone, UserOutline, LockOutline, ExclamationCircleOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill,PlayCircleTwoTone, UserOutline, LockOutline, ExclamationCircleOutline ];



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { DomsecurePipe } from './pipes/domsecure.pipe';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumComponent } from './components/album/album.component';
import { PodcastComponent } from './components/podcast/podcast.component';
/*      FIREBASE     */
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from "src/environments/environment";
import { LoginComponent } from "./components/login/login.component";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    NoimagePipe,
    TarjetaComponent,
    DomsecurePipe,
    AlbumComponent,
    PodcastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzAlertModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzModalModule,
    NzBadgeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NzIconModule.forRoot(icons),
  ],
  providers: [BrowserModule,BrowserAnimationsModule,NzModalService,
    {provide: "spotiapp-6f54d.appspot.com", useValue: 'gs://spotiapp-6f54d.appspot.com/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
