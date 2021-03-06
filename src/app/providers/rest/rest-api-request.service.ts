import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ConstantServiceService} from '../const/constant-service.service';
import {Observable, of, throwError, TimeoutError} from 'rxjs/index';
import {catchError, map, timeout} from 'rxjs/internal/operators';
import {Router} from '@angular/router';
import {MzToastService} from 'ngx-materialize';

@Injectable({
  providedIn: 'root'
})
export class RestApiRequestService {

  public token: string;
  public changePasswordUrl = '/crm/index.php/admin/change_password';
  public dashboardUrl = '/crm/index.php/dashboard';
  public userListUrl = '/crm/index.php/admin/user_list';
  public clientListUrl = '/crm/index.php/client/client_list';
  public moduleListUrl = '/crm/index.php/admin/module_list';
  public userAddUrl = '/crm/index.php/admin/user_add';
  public profileListUrl = '/crm/index.php/admin/profil_list';
  public editUserUrl = '/crm/index.php/admin/user_edit';
  public deleteUserUrl = '/crm/index.php/admin/user_delete';
  public deleteProfileUrl = '/crm/index.php/admin/profil_delete';
  public addProfileUrl = '/crm/index.php/admin/profil_add';
  public editProfileUrl = '/crm/index.php/admin/profil_edit';


  SERVER_ADDRESS: string;
  result: any;

  constructor(
    private httpClient: HttpClient,
    private constProvider: ConstantServiceService,
    private router: Router,
    private toastService: MzToastService,
  ) {
    this.SERVER_ADDRESS = this.constProvider.SERVER_ADDRESS;
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
    this.token = localStorage.getItem('token');
    const input = new FormData();
    input.append('token', this.token);
    input.append('user_id', user_id);
    input.append('old_password', old_password);
    input.append('new_password', new_password);
    input.append('isActive', isActive);
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


  // Load dashboard data

  loadDashboardData(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');

    console.log(this.token);

    const input = new FormData();
    input.append('token', this.token);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.dashboardUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }



  // Load user list

  loadUserList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const input = new FormData();
    input.append('token', this.token);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.userListUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }



  // Load client list

  loadClientList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const input = new FormData();
    input.append('token', this.token);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.clientListUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }


  // Load modules list

  loadModulesList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const input = new FormData();
    input.append('token', this.token);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.moduleListUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }


  // Load profile list

  loadProfileList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const input = new FormData();
    input.append('token', this.token);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.profileListUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
// set request timeout to 1 minutes
        timeout(60000),
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }



  // create user

  createUser(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const isclient: any = user.isClient ? 1 : 0 ;


    const input = new FormData();
    input.append('token', this.token);
    input.append('nom', user.lastname);
    input.append('prenom', user.firstname);
    input.append('mail', user.email);
    input.append('tel', user.telephone);
    input.append('isClient', user );
    input.append('profil_id', user.profile.c_id);

    console.log(user.isClient ? 1 : 0);

    if (isclient === 1) {
      input.append('client_id', user.client.c_id);
    }

    console.log();

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.userAddUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }


  // edit user

  editUser(user, user_id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const isReset: any = user.isReset ? 1 : 0 ;


    const input = new FormData();
    input.append('token', this.token);
    input.append('user_id', user_id);
    input.append('nom', user.lastname);
    input.append('prenom', user.firstname);
    input.append('isReset', isReset );
    input.append('profil_id', user.profile.c_id);

    console.log(user.isReset ? 1 : 0);


    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.editUserUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }



  // delete user

  deleteUser(user_id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);


    const input = new FormData();
    input.append('token', this.token);
    input.append('user_id', user_id);


    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.deleteUserUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }


  // delete profile

  deleteProfile(profile_id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);


    const input = new FormData();
    input.append('token', this.token);
    input.append('profil_id', profile_id);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.deleteProfileUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }



  // create profile

  createProfile(profile): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const input = new FormData();
    input.append('token', this.token);
    input.append('libelle', profile.libelle);
    input.append('description', profile.description);

    let modules: any;
    modules = [];
    // pushing only ids un new array
    for (let i = 0; i < profile.modules.length; i++) {
      modules.push(profile.modules[i].c_id);
    }
    input.append('modules', modules);

    console.log(modules);

    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.addProfileUrl, input, httpOptions)
      .pipe(
        map(response => this.result = response),
        timeout(60000), // set request timeout to 1 minutes
        catchError(
          error => of(
            this.handleError(error)
          ))
      );

  }


  // edit profile

  editProfile(profile, profile_id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.token = localStorage.getItem('token');
    console.log(this.token);

    const isReset: any = profile.isReset ? 1 : 0 ;


    const input = new FormData();
    input.append('token', this.token);
    input.append('profil_id', profile_id);
    input.append('libelle', profile.libelle);
    input.append('description', profile.description);
    input.append('modules', profile.modules);


    return this.httpClient.post(this.SERVER_ADDRESS + '' + this.editProfileUrl, input, httpOptions)
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
      console.log(error);

      if (error.status === 500) { // session expired
        this.toastService.show('Une erreur de serveur est survenue. Veuillez réessayer plus tard.', 5000, 'red');
      }

      if (error.status === 401) { // session expired
        this.toastService.show('Session expirée. Veuillez vous connecter a nouveau.', 5000, 'red');
        this.router.navigate(['/login']);
      }

      if (error.status === 400) { // Bad request
        return error;
      }
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    return error.status;
    // return an observable with a user-facing error message
    // return throwError(
    //   'Something bad happened; please try again later.');
  }
}
