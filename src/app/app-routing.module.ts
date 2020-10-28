import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtendedUsersComponent } from './extended-users/extended-users.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';



const routers: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'extended-users', component: ExtendedUsersComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({

  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
