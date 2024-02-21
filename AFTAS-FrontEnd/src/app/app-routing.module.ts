import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './components/dashboard/competitions/competitions.component';
import { PodiumComponent } from './components/dashboard/podium/podium.component';
import { ResultsComponent } from './components/dashboard/results/results.component';
import { MembersComponent } from './components/dashboard/members/members.component';

const routes: Routes = [
  {
    path : 'Competitions',
    component : CompetitionsComponent ,
    title : 'Competitions Page'
  },
  {
    path : 'Members',
    component : MembersComponent ,
    title : 'Members Page'
  },
  {
    path : 'Podium',
    component : PodiumComponent ,
    title : 'Podium Page'
  },
  {
    path : 'Results',
    component : ResultsComponent ,
    title : 'Results Page'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
