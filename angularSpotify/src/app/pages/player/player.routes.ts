import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel.component';
import { HomeComponent } from '../home/home.component';
import { PlayerComponent } from './player.component';
import { Routes } from "@angular/router";

export const PlayerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
]
