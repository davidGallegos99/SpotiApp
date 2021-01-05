import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public newReleases: any;
  public alert_error:boolean = false;
  public cargando:boolean = true;
  public error_message:string ='';
  constructor(private spotify:SpotifyService,private _router:Router) { }

  ngOnInit(): void {
    this.spotify.getNewReleases().subscribe((data:any)=>{
      this.newReleases = data;
      if(this.newReleases.length>0) {
        this.cargando=false;
      }
    },(error)=>{
      this.alert_error = true;
      this.cargando = false;
      this.error_message = error.error.error.message;
      console.log(error);
    });
  }
  verArtista(item:any){
    let idArtist = '';
    if(item.type === 'album'){
      idArtist = item.artists[0].id;
      this._router.navigate(['artista',idArtist]);
    }
   }

}
