import { SpotifyService } from './spotify.service';
import { newMusic } from 'src/app/Common/factorie';
import { IMusic } from './../interfaces/iMusic';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentlyPlaying = new BehaviorSubject<IMusic>(newMusic());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService)
  {
    this.getMyCurrentlyPlayingTrack();
  }

  async getMyCurrentlyPlayingTrack(){
    clearTimeout(this.timerId);
    const currentlyPlaying = await this.spotifyService.getMyCurrentlyPlayingTrack();
    this.setCurrentlyPlayingTrack(currentlyPlaying);
    this.timerId = setInterval(async () => {
      await this.getMyCurrentlyPlayingTrack();
    },1000)
  }

  setCurrentlyPlayingTrack(music: IMusic){
    this.currentlyPlaying.next(music);
  }
}
