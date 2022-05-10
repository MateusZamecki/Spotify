import { RightPanelComponent } from './../../components/right-panel/right-panel.component';
import { CurrentPlayback } from './../../components/current-playback/current-playback.component';
import { HomeComponent } from '../home/home.component';
import { UserFooterComponent } from './../../components/user-footer/user-footer.component';
import { PlayerRoutes } from './player.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    MenuButtonComponent,
    UserFooterComponent,
    HomeComponent,
    CurrentPlayback,
    RightPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRoutes),
    FontAwesomeModule,
    FormsModule
  ]
})
export class PlayerModule { }
