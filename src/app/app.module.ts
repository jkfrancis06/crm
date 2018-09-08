import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FormsModule, NgControl, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

// Materialize modules

import {
  MzBaseModal, MzCheckboxModule, MzCollapsibleModule, MzDropdownModule, MzFeatureDiscoveryModule, MzIconMdiModule,
  MzIconModule,
  MzModalComponent,
  MzModalModule, MzNavbarModule, MzSelectModule, MzSidenavModule,
  MzSpinnerModule, MzTextareaModule,
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
import {ChartsModule} from 'ng2-charts';
import { UserManageComponent } from './components/user-manage/user-manage.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { ManageProfileComponent } from './components/manage-profile/manage-profile.component';
// import { EditUserComponent } from './components/edit-user/edit-user.component';






//  App routes declaration

const routes: Routes = [
  // Super Admin routes
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'admin/user-manage', component: UserManageComponent, canActivate: [AuthGuard]},
  { path: 'admin/create-user', component: CreateUserComponent, canActivate: [AuthGuard]},
  { path: 'admin/edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard]},
  { path: 'admin/edit-profile/:id', component: EditProfileComponent, canActivate: [AuthGuard]},
  { path: 'admin/profile-manage', component: ManageProfileComponent, canActivate: [AuthGuard]},
  { path: 'admin/create-profile', component: AddProfileComponent, canActivate: [AuthGuard]},
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    NavFooterComponent,
    ChangePasswordComponent,
    UserManageComponent,
    CreateUserComponent,
    EditUserComponent,
    EditProfileComponent,
    AddProfileComponent,
    ManageProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxPaginationModule,
    FormsModule,
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
    MzCollapsibleModule,
    MzCheckboxModule,
    MzSelectModule,
    MzDropdownModule,
    MzTextareaModule,
    //
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
