import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(this.checkDate());
  }

  checkDate() {
    const d = new Date();
    const otherDate = new Date('2018-08-29 10:07:51');
    let hours = otherDate.getHours();
    let minutes = otherDate.getMinutes();
    const seconds = otherDate.getSeconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ':' + seconds;
    console.log(otherDate.getMonth() + 1 + '-' + otherDate.getDate() + '-' + otherDate.getFullYear() + ' ' + strTime );

    // console.log(otherDate.getHours() + ':' + otherDate.getMinutes() + ':' + otherDate.getSeconds())
    return (d.toDateString() === otherDate.toDateString());
  }


}
