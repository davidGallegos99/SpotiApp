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
  public error_busqueda:boolean = false;
  public cargando=false;
  public artistas:any = [];
  constructor(
    private spotify:SpotifyService,
    private _router:Router
    ) { }

  ngOnInit(): void {
  }
  buscarArtista(artista:string){
    if(artista.length>0){
      clearTimeout(this.time);
      this.cargando = true;
      this.error_busqueda = false;
      this.time = setTimeout(() => {
        this.spotify.getArtist(artista).subscribe((artista:any)=>{
          this.artistas = artista;
          if(this.artistas.length>0){
            this.cargando=false;
          }else{
            this.error_busqueda = true;
          }
        });
      }, 1000);
    }
  }
  verArtista(item:any){
    console.log(item);
    console.log(item.id);
    this._router.navigate(['artista',item.id]);
   }

}
