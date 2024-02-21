import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadComponent } from './components/dashboard/head/head.component';
import { ScriptComponent } from './components/dashboard/script/script.component';
import { SideBarComponent } from './components/dashboard/side-bar/side-bar.component';
import { CompetitionsComponent } from './components/dashboard/competitions/competitions.component';
import { PodiumComponent } from './components/dashboard/podium/podium.component';
import { ResultsComponent } from './components/dashboard/results/results.component';
import { MembersComponent } from './components/dashboard/members/members.component';
import { CompetitionsModalComponent } from './components/dashboard/competitions-modal/competitions-modal.component';
import { SelectCompetitionComponent } from './components/dashboard/select-competition/select-competition.component';
import { ViewMembersComponent } from './components/dashboard/view-members/view-members.component';
import { AddMembersComponent } from './components/dashboard/add-members/add-members.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddMemberCompetitionComponent } from './components/dashboard/add-member-competition/add-member-competition.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    ScriptComponent,
    SideBarComponent,
    CompetitionsComponent,
    PodiumComponent,
    ResultsComponent,
    MembersComponent,
    CompetitionsModalComponent,
    SelectCompetitionComponent,
    ViewMembersComponent,
    AddMembersComponent,
    AddMemberCompetitionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
