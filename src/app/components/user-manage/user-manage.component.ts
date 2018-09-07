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
  droits: any;
  permissions = {
    edit_user: false,
    delete_user: false,
    add_user: false
  };

  constructor(private restApiService: RestApiRequestService,
              private toastService: MzToastService) { }

  ngOnInit() {

    this.droits = JSON.parse(localStorage.getItem('droit'));

    console.log(this.droits);

    if (this.droits.admin.user.includes('edit')) {
      this.permissions.edit_user = true;
    }

    if (this.droits.admin.user.includes('delete')) {
      this.permissions.delete_user = true;
    }

    if (this.droits.admin.user.includes('add')) {
      this.permissions.add_user = true;
    }

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

  removeUser(user_id, index) {
    if (confirm('Voulez vous vraiment supprimer cet utilisateur?')) {
      this.loader = true;  // show loader

      this.restApiService.deleteUser(user_id).subscribe(response => {

        console.log(response);
        this.loader = false; // hide loader
        if (response === 800) {
          // If network error
          this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
        }

        if (response.result === 1) {
          this.users.splice(index, 1);
          this.toastService.show(response.comment, 5000, 'green');
        }

      });
    }
  }
}
