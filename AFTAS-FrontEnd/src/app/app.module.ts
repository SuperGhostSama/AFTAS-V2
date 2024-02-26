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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddMemberCompetitionComponent } from './components/dashboard/add-member-competition/add-member-competition.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth/auth.interceptor';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { DasboardLayoutComponent } from './components/layout/dasboard-layout/dasboard-layout.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { MyCompetitionsComponent } from './components/dashboard/my-competitions/my-competitions.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { MemberVerificationComponent } from './components/dashboard/member-verification/member-verification.component';

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
    LoginComponent,
    RegisterComponent,
    AuthLayoutComponent,
    DasboardLayoutComponent,
    NavbarComponent,
    MyCompetitionsComponent,
    NotificationsComponent,
    MemberVerificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
