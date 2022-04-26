import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login.routes';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes)
  ]
})
export class LoginModule{}
