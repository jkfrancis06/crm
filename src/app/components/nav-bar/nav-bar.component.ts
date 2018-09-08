import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: any;
  last_login: string;
  droits: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    if (this.checkDate(this.user.c_date_con) === true) {
      this.last_login = 'Aujourd\'hui ' + this.formatDate(this.user.c_date_con).time;
    } else {
      this.last_login =  this.formatDate(this.user.c_date_con).date + ' ' +  this.formatDate(this.user.c_date_con).time;
    }

    // get user rights
    this.droits = JSON.parse(localStorage.getItem('droit'));

    console.log(this.droits);

    if (this.droits.admin) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

  checkDate(date) {
    const d = new Date();
    const otherDate = new Date(date);
    return (d.toDateString() === otherDate.toDateString());
  }


  formatDate(date) {
    const d = new Date();
    const otherDate = new Date(date);
    let hours = otherDate.getHours();
    let minutes: any;
    minutes = otherDate.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes ;
    const year = otherDate.getMonth() + 1 + '-' + otherDate.getDate() + '-' + otherDate.getFullYear()
    return {
      date: year,
      time: strTime
    };
    // console.log(otherDate.getMonth() + 1 + '-' + otherDate.getDate() + '-' + otherDate.getFullYear() + ' ' + strTime );
    //
    // console.log(otherDate.getHours() + ':' + otherDate.getMinutes() + ':' + otherDate.getSeconds())
  }


  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('droit');
    localStorage.removeItem('user');
    localStorage.removeItem('must_change_password');
    this.router.navigate(['/login']);
  }
}
