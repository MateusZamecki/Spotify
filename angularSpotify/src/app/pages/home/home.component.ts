import { newMusic } from 'src/app/Common/factorie';
import { PlayerService } from './../../services/player.service';
import { SpotifyService } from './../../services/spotify.service';
import { IMusic } from './../../interfaces/iMusic';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  songsRecentlyPlayed: IMusic[] = null;
  playIcon = faPlay;
  currentlyPlaying: IMusic = newMusic();
  subs: Subscription[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getCurrentlyPlayingMusic();
    this.getMyRecentlyPlayedSongs();
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getCurrentlyPlayingMusic(){
    const subs = this.playerService.currentlyPlaying.subscribe(music => {
      this.currentlyPlaying = music;
    });
    this.subs.push(subs);
  }

  async playMusic(music: IMusic){
    await this.spotifyService.playMusic(music.id);
    this.playerService.setCurrentlyPlayingTrack(music);
  }

  async getMyRecentlyPlayedSongs(){
    this.songsRecentlyPlayed = await this.spotifyService.getMyRecentlyPlayedTracks();
  }

  

  getArtist(music:IMusic){
    return music.artists.map(artist => artist.name).join(', ');
  }



}
