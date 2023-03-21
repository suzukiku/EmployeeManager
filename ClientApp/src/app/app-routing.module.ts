import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserPage } from './_models/user-page/user-page';
import { AdminPage } from './_models/admin-page/admin-page';
import { AuthPage } from './_models/auth-page/auth-page';

const routes: Routes = [
  {
    path: 'auth-page',
    component: AuthPage,
    canActivate: []
  },
  {
    path: 'user-page',
    component: UserPage
  },
  { 
    path: 'admin-page',
    component: AdminPage
  },
  {
    path: '',
    redirectTo: '/auth-page',
    pathMatch:'full'
  }
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }