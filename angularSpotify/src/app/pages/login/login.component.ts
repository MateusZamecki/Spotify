import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.verifyToken();
  }

  verifyToken(){
    const token = this.spotifyService.getTokenUrlCallBack();

    if(!!token){
      this.spotifyService.setAccess(token);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getUrlLogin();
  }

}
