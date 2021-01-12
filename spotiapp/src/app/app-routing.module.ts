import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './components/album/album.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { HomeComponent } from './components/home/home.component';
import { PodcastComponent } from './components/podcast/podcast.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'search',component:SearchComponent},
  {path:'artista/:id',component:ArtistaComponent},
  {path:'album/:id',component:AlbumComponent},
  {path:'podcast/:id',component:PodcastComponent},
  {path:'', pathMatch:'full', redirectTo:'home'},
  {path:'**', pathMatch:'full', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
