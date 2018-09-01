import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgControl, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

// Materialize modules

import {
  MzBaseModal, MzFeatureDiscoveryModule, MzIconMdiModule, MzIconModule, MzModalComponent,
  MzModalModule, MzNavbarModule, MzSidenavModule,
  MzSpinnerModule,
  MzToastModule,
  MzValidationModule
} from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzButtonModule } from 'ngx-materialize';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from './core/auth.guard';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavFooterComponent } from './components/nav-footer/nav-footer.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {AvatarModule} from 'ng2-avatar';






//  App routes declaration

const routes: Routes = [
  // Super Admin routes
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'change-password', component: ChangePasswordComponent}
  ];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    NavFooterComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AvatarModule,
    //
    MzValidationModule,
    MzInputModule,
    MzButtonModule,
    MzModalModule,
    MzSpinnerModule,
    MzToastModule,
    MzFeatureDiscoveryModule,
    MzIconModule,
    MzIconMdiModule,
    MzNavbarModule,
    MzSidenavModule,
    //
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
