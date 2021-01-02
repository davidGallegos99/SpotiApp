import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private time:any;
  constructor(private spotify:SpotifyService) { }

  ngOnInit(): void {
  }
  buscarArtista(artista:string){
    if(artista.length>0){
      clearTimeout(this.time);
      this.time = setTimeout(() => {
        this.spotify.getArtist(artista).subscribe((artista)=>{
          console.log(artista);
        });
      }, 3000);
    }
  }

}
