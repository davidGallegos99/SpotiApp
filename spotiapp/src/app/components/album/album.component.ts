import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public album:any = [];
  public duration:number = 0;
  public tracks:any = [];
  public cargando:boolean=true;
  constructor(
      private spotify:SpotifyService,
      private  activatedRoute:ActivatedRoute,
      private _route:Router
    ) { 
      this.spotify.getNewToken();
    }

  ngOnInit(): void {
    this.getAlbum();
  }
  
  getAlbum(){
    this.activatedRoute.params.subscribe(params=>{
      this.spotify.getAlbum(params.id).subscribe((album:any)=>{
        this.album = album;
        this.tracks = album.tracks.items;
        this.tracks.forEach((track:any) => {
          let uri;
          uri = track.uri.replace(/:/g,'/');
          uri = uri.replace('spotify','');
          uri = 'https://open.spotify.com/embed'+uri;
          track.uri = uri;
        });
        if(this.album.length!=0){
          this.cargando = false;
        }
        album.tracks.items.forEach((track:any) => {
            this.duration = this.duration + (track.duration_ms/60000);
        });
      });
    });
  }

}
