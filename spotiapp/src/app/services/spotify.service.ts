import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private headers = new HttpHeaders({
    'Authorization':'Bearer BQCp1RkQHZacFjGTuY1oSMY5vgDujaUP2G24OJDutx7mM0PxI81hz3AKTh2Feo4rcITibgZ07qg3IU2p9c0'
  });
  constructor(private http:HttpClient) { }
  getNewReleases(){
    return this.http.get('https://api.spotify.com/v1/browse/new-releases',{headers:this.headers})
                    .pipe(map((data:any)=>{
                        return data.albums.items;
                    }))
  }
  getArtist(artista:string){
    return this.http.get(`https://api.spotify.com/v1/search?q=${artista}&type=artist&limit=18`,{headers:this.headers})
                    .pipe(map((data:any)=>{
                      return data.artists.items;
                    }));
   }
}
