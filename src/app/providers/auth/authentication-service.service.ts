import { Injectable } from '@angular/core';

import {ConstantServiceService} from '../const/constant-service.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {Headers, Response} from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  public token: string;
  public loginUrl = '/crm/index.php/admin/login';


  constructor(private httpClient: HttpClient,
              private constProvider: ConstantServiceService ) {
    // set token if saved in local storage
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
  }


  Login(password, username): Promise<void>  {

    let getHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });


    const url = this.constProvider.SERVER_ADDRESS + this.loginUrl;
    return this.httpClient.post('http://197.255.237.253:8001/crm/index.php/admin/login', {
      'login': username,
      'password': password
    } , {header: getHeaders}).toPromise()
      .then(res =>
        console.log(res)
      )
      .catch(msg => console.log(msg));

  }

}

