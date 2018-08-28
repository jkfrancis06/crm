import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NgControl, ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';

// Materialize modules

import {
  MzBaseModal, MzModalComponent, MzModalModule, MzSpinnerModule, MzToastModule,
  MzValidationModule
} from 'ngx-materialize';
import { MzInputModule } from 'ngx-materialize';
import { MzButtonModule } from 'ngx-materialize';
import { HttpClientModule } from '@angular/common/http';
import { LoaderModalComponent } from './components/loader-modal/loader-modal.component';





//  App routes declaration

const routes: Routes = [
  // Super Admin routes
  { path: 'login', component: LoginComponent},
  { path: 'test', component: LoaderModalComponent}
  ];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    //
    MzValidationModule,
    MzInputModule,
    MzButtonModule,
    MzModalModule,
    MzSpinnerModule,
    MzToastModule,
    //
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
