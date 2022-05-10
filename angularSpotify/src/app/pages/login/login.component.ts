import { Router } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private spotifyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.verifyToken();
  }

  verifyToken(){
    const token = this.spotifyService.getTokenUrlCallBack();
    if(!!token){
      this.spotifyService.setAccess(token);
      this.router.navigate(['/player/home']);
    }
  }

  openLoginPage() {
    window.location.href = this.spotifyService.getUrlLogin();
  }

}
