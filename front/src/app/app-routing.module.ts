import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: 'home',
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  },
  {
    component: UserListComponent,
    path : 'fantomes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
