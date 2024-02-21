import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './components/dashboard/competitions/competitions.component';
import { PodiumComponent } from './components/dashboard/podium/podium.component';
import { ResultsComponent } from './components/dashboard/results/results.component';
import { MembersComponent } from './components/dashboard/members/members.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { authGuard } from './guard/auth/auth.guard';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { DasboardLayoutComponent } from './components/layout/dasboard-layout/dasboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: DasboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'Competitions', component: CompetitionsComponent, canActivate: [authGuard] },
      { path: 'Members', component: MembersComponent, canActivate: [authGuard] },
      { path: 'Podium', component: PodiumComponent, canActivate: [authGuard] },
      { path: 'Results', component: ResultsComponent, canActivate: [authGuard] }
    ],
  }
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
