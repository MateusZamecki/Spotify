import { IPlaylist } from './../../interfaces/IPlaylist';
import { SpotifyService } from './../../services/spotify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CurrentPlayback } from '../current-playback/current-playback.component';
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playlistIcon = faMusic;

  playlists: IPlaylist[];

  menuOptions = 'Home';

  constructor(private router: Router,
    private spotifyService: SpotifyService){  }

  ngOnInit(): void {
    this.getPlaylists();
  }

  buttonClick(button: string){
    this.menuOptions = button;
    this.router.navigateByUrl('player/home');
  }

  goToPlaylist(playlistId: string){
    this.menuOptions = playlistId;
    this.router.navigateByUrl(`player/list/playlist/${playlistId}`)
  }

  async getPlaylists(){
    this.playlists = await this.spotifyService.getUserPlaylist();
  }

}
