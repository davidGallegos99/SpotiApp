import "@angular/compiler";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';


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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ArtistaComponent,
    NavbarComponent,
    NoimagePipe,
    TarjetaComponent,
    DomsecurePipe,
    AlbumComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NzSpinModule,
    NzAlertModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzBadgeModule
  ],
  providers: [BrowserModule,BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
