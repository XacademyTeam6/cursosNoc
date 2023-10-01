import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',    
    children: [
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: ':id',
        component: UserComponent,
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
