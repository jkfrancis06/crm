import { Component, OnInit } from '@angular/core';
import {RestApiRequestService} from '../../providers/rest/rest-api-request.service';
import {MzToastService} from 'ngx-materialize';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  loader = false;
  users: any;

  constructor(private restApiService: RestApiRequestService,
              private toastService: MzToastService) { }

  ngOnInit() {

    this.loader = true;  // show loader

    this.restApiService.loadUserList().subscribe(response => {

      console.log(response);
      this.loader = false; // hide loader
      if (response === 800) {
        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.users = response.users;
      }

    });
  }

}
