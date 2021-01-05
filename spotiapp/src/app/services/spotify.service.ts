import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private headers = new HttpHeaders({
    'Authorization':'Bearer BQCtqpGRkK9ijmVqCpDq80w5avBLMyaJZsVTIL4v686XZoZcgkWpAF-CpUnZmu1dqUujnSAuxbf6NVzGbq8'
  });
  private id:string = '';
  constructor(
    private http:HttpClient,
    ) {

     }
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
   jalarArtista(id:string){
     console.log(id);
    return this.http.get(`https://api.spotify.com/v1/artists/${id}`,{headers:this.headers});

   }
   getTopTracks(id:string){
    return this.http.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=es`,{headers:this.headers})
                    .pipe(map((data:any)=>{
                      return data.tracks;
                    }));
   }
}
