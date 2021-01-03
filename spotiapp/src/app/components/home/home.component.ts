import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public newReleases: any;
  public cargando:boolean = true;
  constructor(private spotify:SpotifyService) { }

  ngOnInit(): void {
    this.spotify.getNewReleases().subscribe((data:any)=>{
      console.log(data);
      this.newReleases = data;
      if(this.newReleases.length>0) {
        this.cargando=false;
      }
    });
  }

}
