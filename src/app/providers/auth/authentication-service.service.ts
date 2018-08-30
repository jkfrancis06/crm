import { Injectable } from '@angular/core';

import {ConstantServiceService} from '../const/constant-service.service';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Headers, Response} from '@angular/http';
import {Observable, of} from 'rxjs/index';
import {catchError, map, timeout} from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  public token: string;
  public loginUrl = '/crm/index.php/admin/login';
  SERVER_ADDRESS: string;
  result: any;


  constructor(private httpClient: HttpClient,
              private constProvider: ConstantServiceService ) {
    // set token if saved in local storage
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
    this.SERVER_ADDRESS = this.constProvider.SERVER_ADDRESS;
  }


  //
  // login (password, username): Promise<any> {
  //
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Access-Control-Allow-Origin': '*'
  //     })
  //   };
  //
  //   return this.httpClient.post(this.SERVER_ADDRESS + '/crm/index.php/admin/login', {
  //     login: username,
  //     password: password
  //   }, httpOptions).toPromise()
  //     .then(res =>
  //       console.log(res)
  //     )
  //     .catch(msg => console.log(msg));
  // }


  login(username: string, password: string): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient.post(this.SERVER_ADDRESS + '/crm/index.php/admin/login', {
      login: username,
      password: password
    }, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(error => of(
          800 // Is a network error
        ))
      );



    // return this.httpClient.post(this.SERVER_ADDRESS + '/crm/index.php/admin/login', {
    //   login: username,
    //   password: password
    // }, httpOptions)
    //   .pipe(
    //     map(response => console.log(response))
  }


  private handleError (error: HttpErrorResponse) {
    // TODO: seems we cannot use messageService from here...
    const errMsg = (error.message) ? error.message : 'Server error';
    console.error(errMsg);
    if (error.status === 401 ) {
      window.location.href = '/';
    }
    return Observable.throw(errMsg);
  }

}

