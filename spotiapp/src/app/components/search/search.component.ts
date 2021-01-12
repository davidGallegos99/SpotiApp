import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public time:any;
  public noArtists:boolean=false;
  public noPodcasts:boolean=false;
  public noTracks:boolean=false;
  public tracks:any = [];
  public value:string = '';
  public img:string = '';
  public alert_message:boolean =false;
  public error_message:string = '';
  public error_busqueda:boolean = false;
  public cargando=false;
  public items:any = [];
  constructor(
    private spotify:SpotifyService,
    private _router:Router
    ) { 
      this.spotify.getNewToken();
    }

  ngOnInit(): void {
  }
  verAlbum(id:string){
    this._router.navigate(['album',id]);
  }
  buscarArtista(artista:string){
    if(artista.length>0){
      clearTimeout(this.time);
      this.cargando = true;
      this.error_busqueda = false;
      this.time = setTimeout(() => {
        this.spotify.getItem(artista).subscribe((artista:any)=>{
          this.items = artista;
          if(this.items.artists.items==0){
            this.noArtists = true;
          }else{
            this.noArtists = false;
          }
          if(this.items.shows.items==0){
            this.noPodcasts = true;
          }else{
            this.noPodcasts = false;
          }
          if(this.items.tracks.items==0){
            this.noTracks = true;
          }else{
            this.noTracks = false;
          }
          if(this.items.artists.items.length>0 || this.items.tracks.items.length>0 || this.items.shows.items.length>0){
            this.cargando=false;
            this.tracks = this.items.tracks.items;
            this.tracks.forEach((track:any) => {
              let uri;
              uri = track.uri.replace(/:/g,'/');
              uri = uri.replace('spotify','');
              uri = 'https://open.spotify.com/embed'+uri;
              track.uri = uri;
            });
          }else{
            this.error_busqueda = true;
          }
        },(error)=>{
          this.cargando = false;
          this.alert_message = true;
          this.error_message = error.error.error.message;
        });
      }, 1000);
    }
  }
  verArtista(item:any){
    this._router.navigate(['artista',item.id]);
   }
  showPodcast(item:any){
    this._router.navigate(['podcast',item.id]);
  }

}
