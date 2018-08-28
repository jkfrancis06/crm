import { Injectable } from '@angular/core';

import {ConstantServiceService} from '../const/constant-service.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  public token: string;
  public loginUrl = '/crm/index.php/admin/login';
  SERVER_ADDRESS: string;


  constructor(private httpClient: HttpClient,
              private constProvider: ConstantServiceService ) {
    // set token if saved in local storage
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
    this.SERVER_ADDRESS = this.constProvider.SERVER_ADDRESS;
  }



  login (password, username): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.httpClient.post('http://197.255.237.253:8001/crm/index.php/admin/login', {
      'login': username,
      'password': password
    } , httpOptions).toPromise()
      .then(res =>
        console.log(res)
      )
      .catch(msg => console.log(msg));
  }

}

