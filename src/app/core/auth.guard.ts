import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {any} from "codelyzer/util/function";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  must_change_password: any;

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    const must_change_password = localStorage.getItem('must_change_password');
    if (token === null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      console.log(must_change_password)
      if (must_change_password === '0') {
        return true;
      } else {
        this.router.navigate(['/change-password']);
        return false;
      }
    }
  }
}
