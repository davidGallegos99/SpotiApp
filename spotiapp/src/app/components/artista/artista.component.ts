import { Component, OnInit } from '@angular/core';
import {catchError} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {
  public id:string = '';
  public artista:any;
  public topTracks:any = [];
  public cargando:boolean = true;
  constructor(private spotify:SpotifyService,private activatedRoute:ActivatedRoute,private _router: Router) {
    this.activatedRoute.params.subscribe((params)=>{
      this.id = params.id;
      this.getArtist();
      this.getTopTracks();
    });
   }

  ngOnInit(): void {
  }
  getArtist(){
    this.spotify.jalarArtista(this.id).subscribe((data)=>{
      this.artista = data;
      if(this.artista){
        this.cargando = false;
      }
      console.log(this.artista);
    }, err =>{
      this._router.navigate(['home']);
    });
  }
  getTopTracks(){
    this.spotify.getTopTracks(this.id).subscribe((tracks)=>{
      tracks.forEach((track:any) => {
        let uri;
        uri = track.uri.replace(/:/g,'/');
        uri = uri.replace('spotify','');
        uri = 'https://open.spotify.com/embed'+uri;
        track.uri = uri;
      });
      console.log('Tracks: ',tracks);
        this.topTracks = tracks;
    });
  }

}
