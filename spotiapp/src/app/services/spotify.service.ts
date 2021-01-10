import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private headers = new HttpHeaders({
    'Authorization':'Bearer BQDOvMIKK3wsXcNlcIwvEBuScav6byb1_45lsfTBzW_8pBGi0T21TaPLLDJ7evZ9wqjuPGHQiLiWaEaZJMA'
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
