import { SpotifyConfiguration } from './../../environments/environment';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  getUrlLogin():string {
    const authEndPoint = `${SpotifyConfiguration.authEndPoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenUrlCallBack():string {
    if (!window.location.hash){
      return '';
    }
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccess(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }
}
