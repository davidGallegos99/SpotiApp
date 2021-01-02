import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private headers = new HttpHeaders({
    'Authorization':'Bearer BQCigZKagVZiqpagCY64WMzM0GJAW25xbUWmevmrXIGw75lquU0FGUqiHpCKXAiZ9RiMCpuKyqVG5DGB9qE'
  });
  constructor(private http:HttpClient) { }
  getNewReleases(){
    return this.http.get('https://api.spotify.com/v1/browse/new-releases',{headers:this.headers});
  }
  getArtist(artista:string){
    return this.http.get(`https://api.spotify.com/v1/search?q=${artista}&type=artist&limit=18`,{headers:this.headers});
  }
}
