import { Router } from '@angular/router';
import { IArtist } from './../interfaces/IArtist';
import { IMusic } from './../interfaces/iMusic';
import { IUser } from '../interfaces/iUser';
import { SpotifyConfiguration } from './../../environments/environment';
import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { mapSpotifyUser, SpotifyArtistForArtist, SpotifyCurrentlyPlayingTrackForMusic, SpotifyPlaylistForPlaylist, SpotifySimplifiedTrackForMusic, SpotifyTrackForMusic } from '../Common/spotify.helper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: IUser;

  constructor(private router: Router) {
    this.spotifyApi = new Spotify();
  }

  async initializeUser() {
    if(!!this.user){
      return true;
    }

    const token = localStorage.getItem('token');

    if(!token){
      return false;
    }

    try {
      this.setAccess(token);
      await this.getSpotifyUser();
      return !!this.user;
    }catch(ex) {
      console.log(this.user)
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = mapSpotifyUser(userInfo);
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

  async getUserPlaylist(offset = 0, limit = 50){
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistForPlaylist);
  }

  async getTopArtists(limit = 10):Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    console.log(artists)
    return artists.items.map(SpotifyArtistForArtist);
  }

  async searchMusic(search: string, offset = 0, limit = 15){
    const searchAll = await this.spotifyApi.search(search, ['playlist', 'track'], { offset, limit });
    const songs = searchAll.tracks.items.map(SpotifyTrackForMusic);
    const playlists = searchAll.playlists.items.map(SpotifyPlaylistForPlaylist);
    return { songs , playlists }
  }

  async playMusic(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentMusic(): Promise<IMusic>{
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackForMusic(musicSpotify.item);
  }

  async backMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async getMyRecentlyPlayedTracks(){
    const songsRecentlyPlayed = await this.spotifyApi.getMyRecentlyPlayedTracks();
    return songsRecentlyPlayed.items.map(song => SpotifySimplifiedTrackForMusic(song.track));
  }

  async getMyCurrentlyPlayingTrack(){
    const currentlyPlaying = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackForMusic(currentlyPlaying.item);
  }

  async getMyRecentlyPlayedTrack(){
    const songsRecentlyPlayed = await this.spotifyApi.getMyRecentlyPlayedTracks();
    return songsRecentlyPlayed.items.map(song => SpotifySimplifiedTrackForMusic(song.track))[0];
  }
}
