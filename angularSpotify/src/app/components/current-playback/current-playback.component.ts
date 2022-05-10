import { SpotifyService } from './../../services/spotify.service';
import { PlayerService } from './../../services/player.service';
import { IMusic } from '../../interfaces/iMusic';
import { IArtist } from '../../interfaces/IArtist';
import { Component, OnInit } from '@angular/core';
import { newArtist, newMusic } from 'src/app/Common/factorie';

@Component({
  selector: 'app-current-playback',
  templateUrl: './current-playback.component.html',
  styleUrls: ['./current-playback.component.scss']
})
export class CurrentPlayback implements OnInit {

  artist: IArtist = newArtist();
  currentlyPlaying: IMusic = newMusic();

  constructor(private spotifyService: SpotifyService ,private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getCurrentlyPlayingMusic()
  }

  async getCurrentlyPlayingMusic(){
    this.playerService.currentlyPlaying.subscribe(music => {
      this.currentlyPlaying = music;
    });
    if(this.currentlyPlaying){
      this.currentlyPlaying = await this.spotifyService.getMyCurrentlyPlayingTrack();
    }
  }
}
