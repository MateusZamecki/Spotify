import { IUsuario } from './../interfaces/iusuario';
import { SpotifyConfiguration } from './../../environments/environment';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { setSpotifyUser } from '../Common/spotify.helper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private spotifyApi: Spotify.SpotifyWebApiJs = null;
  private usuario: IUsuario;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async initializeUser() {
    if(!!this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token)
      return false;

    try {

      this.setAccess(token);
      await this.getSpotifyUser();
      return !!this.usuario;

    }catch(exception) {

    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = setSpotifyUser(userInfo);
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
    this.spotifyApi.skipToNext();
  }
}
