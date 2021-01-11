import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private headers = new HttpHeaders({
    'Authorization':'Bearer BQATgi1RQvWcnLEwCMJAEQV6cKFfI9Gm965F3BgaUcSf2leGEEVfD9zhEj-NZjv8M-va-_0g0h0ca0MWOEU',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
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
  getItem(artista:string){
    return this.http.get(`https://api.spotify.com/v1/search?query=${artista}&type=show%2Ctrack%2Cartist&market=US`,{headers:this.headers});
                    
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
   getArtistAlbums(idArtist:string){
      return this.http.get(`https://api.spotify.com/v1/artists/${idArtist}/albums?market=US`,{headers:this.headers})
                      .pipe(map((data:any)=>{
                        return data.items;
                      }));
   }
   getAlbum(id:string){ 
     return this.http.get(`https://api.spotify.com/v1/albums/${id}?market=US`,{headers:this.headers});

   }
}
