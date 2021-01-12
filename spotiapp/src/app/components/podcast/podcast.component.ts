import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';
@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {
  public podcast:any = [];
  public cargando:boolean = true;
  constructor(private activatedRoute:ActivatedRoute,private spotify:SpotifyService,private _router:Router) {
    setTimeout(() => {
      this.activatedRoute.params.subscribe((params)=>{
        this.spotify.getPodcast(params.id).subscribe(podcast=>{
          this.podcast = podcast;
          if(this.podcast!=undefined){
            this.cargando=false;
            this.podcast.episodes.items.forEach((track:any) => {
              let uri;
              uri = track.uri.replace(/:/g,'/');
              uri = uri.replace('spotify','');
              uri = 'https://open.spotify.com/embed'+uri;
              track.uri = uri;
            });
          }
          console.log(this.podcast);
        },error=>{
          console.log(error);
          this._router.navigate(['asdasd']);
        });
      });
    }, 500);
   }

  ngOnInit(): void {
    this.spotify.getNewToken();
  }
  showPodcast(){

  }

}
