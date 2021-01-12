import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private headers = new HttpHeaders({
    'Authorization':'Bearer BQBzmvqtLFuJTtcR3LzyFuyzctSZSrqYiGcFYob15Y8gWmqKkzpg1zHFkwfawjlJmutNTVcp_Tm_y_W5J9I',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  private id:string = '';
  constructor(
    private http:HttpClient,
    ) {

     }
  getNewToken(){
    this.http.get('https://get-token-spotify99.herokuapp.com/spotify/45102a80bf914d2fb740e8b5024ba639/40a6df9532624232876b627651ffc877').subscribe((token:any)=>{
      this.headers = new HttpHeaders({
        'Authorization':`Bearer ${token.access_token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      });
      console.log(this.headers);
      return token.access_token;
    });
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
   getPodcast(id:string){
    return  this.http.get(`https://api.spotify.com/v1/shows/${id}?market=US`,{headers:this.headers});
   }
}
