import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SpotifyService } from './../../services/spotify.service';
import { IUser } from './../../interfaces/iUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  user: IUser = null;
  exitIcone = faSignOutAlt;

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logout(){
    this.spotifyService.logout();
  }
}
