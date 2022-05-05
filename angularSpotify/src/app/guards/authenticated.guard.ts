import { SpotifyService } from './../services/spotify.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanLoad {

  constructor(private router: Router,
    private spotifyService: SpotifyService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token');
      if(!token){
        return this.unauthenticated();
      }

      return new Promise((res) => {
        const usuario = this.spotifyService.initializeUser();
        if(usuario){
          res(true);
        }else{
          res(this.unauthenticated())
        }
      });
  }

  unauthenticated(){
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
