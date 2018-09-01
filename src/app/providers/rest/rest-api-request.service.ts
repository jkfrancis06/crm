import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ConstantServiceService} from '../const/constant-service.service';
import {Observable, of, throwError, TimeoutError} from 'rxjs/index';
import {catchError, map, timeout} from 'rxjs/internal/operators';
import {Router} from "@angular/router";
import {MzToastService} from "ngx-materialize";

@Injectable({
  providedIn: 'root'
})
export class RestApiRequestService {

  public token: string;
  public changePasswordUrl = '/crm/index.php/admin/change_password';
  SERVER_ADDRESS: string;
  result: any;

  constructor(
    private httpClient: HttpClient,
    private constProvider: ConstantServiceService,
    private router: Router,
    private toastService: MzToastService,
  ) {
    this.SERVER_ADDRESS = this.constProvider.SERVER_ADDRESS;
    this.token = localStorage.getItem('token');
  }


  /*
  * Change password service
  */

  changePassword(user_id, old_password, new_password): Observable<any> {

    console.log(localStorage.getItem('must_change_password'));
    const isActive = localStorage.getItem('must_change_password');
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };
    let input = new FormData();
    input.append('token', this.token)
    input.append('user_id', user_id)
    input.append('old_password', old_password)
    input.append('new_password', new_password)
    input.append('isActive', isActive)
    console.log(this.token);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.changePasswordUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
        ))
      );

  }



  private handleError(error: HttpErrorResponse) {
    if (error instanceof TimeoutError) {  // If is timeout error
      return 800;
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error)
      if (error.status === 401) { // session expired
        this.toastService.show('Session expirée. Veuillez vous connecter a nouveau.', 5000, 'red');
        this.router.navigate(['/login']);
      }

      if (error.status === 400) { // Bad request
        return error;
      }
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return error.status;
    // return an observable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
  }
}
