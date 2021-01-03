import { Component, OnInit } from '@angular/core';

import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public time:any;
  public cargando=false;
  public artistas:any = [];
  constructor(private spotify:SpotifyService) { }

  ngOnInit(): void {
  }
  buscarArtista(artista:string){
    if(artista.length>0){
      clearTimeout(this.time);
      this.cargando = true;
      this.time = setTimeout(() => {
        this.spotify.getArtist(artista).subscribe((artista:any)=>{
          this.artistas = artista;
          console.log(this.artistas);
          if(this.artistas.length>0){
            this.cargando=false;
          }
        });
      }, 1000);
    }
  }

}
