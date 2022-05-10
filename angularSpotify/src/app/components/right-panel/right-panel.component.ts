import { PlayerService } from './../../services/player.service';
import { Router } from '@angular/router';
import { IArtist } from './../../interfaces/IArtist';
import { IPlaylist } from './../../interfaces/IPlaylist';
import { IMusic } from './../../interfaces/iMusic';
import { ISearchResult } from './../../interfaces/ISearchResult';
import { SpotifyService } from './../../services/spotify.service';
import { faSearch, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  search:string = '';
  searchIcon = faSearch;
  musicIcon = faMusic;
  menuOptions: string = '';
  songsResult: IMusic[] = [];
  playlistsResult: IPlaylist[] = [];

  constructor(private spotifyService: SpotifyService,
    private playerService: PlayerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async searchMusic(search: string){
    this.search = search;
    const searchResult = await this.spotifyService.searchMusic(this.search);
    this.songsResult = searchResult.songs;
    this.playlistsResult = searchResult.playlists;
  }

  async playMusic(music: IMusic){
    await this.spotifyService.playMusic(music.id);
    this.menuOptions = music.id;
    this.playerService.setCurrentlyPlayingTrack(music);
  }

  onKeyUpEvent(search: string){
    this.searchMusic(search);
  }
}
