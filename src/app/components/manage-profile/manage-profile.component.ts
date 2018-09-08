import { Component, OnInit } from '@angular/core';
import {RestApiRequestService} from '../../providers/rest/rest-api-request.service';
import {MzToastService} from 'ngx-materialize';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {


  loader = false;
  droits: any;
  permissions = {
    edit_profile: false,
    delete_profile: false,
    add_profile: false
  };
  temp_profile: any;
  profiles: any;

  constructor(private restApiService: RestApiRequestService,
              private toastService: MzToastService) { }

  ngOnInit() {

    this.droits = JSON.parse(localStorage.getItem('droit'));

    console.log(this.droits);

    if (this.droits.admin.profil.includes('edit')) {
      this.permissions.edit_profile = true;
    }

    if (this.droits.admin.user.includes('delete')) {
      this.permissions.delete_profile = true;
    }

    if (this.droits.admin.user.includes('add')) {
      this.permissions.add_profile = true;
    }

    this.loader = true;  // show loader

    this.restApiService.loadProfileList().subscribe(response => {

      console.log(response);
      this.loader = false; // hide loader
      if (response === 800) {
        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.profiles = response.profil;
        this.temp_profile = this.profiles;
      }

    });
  }

  removeProfile(profile_id, index) {
    if (confirm('Voulez vous vraiment supprimer ce profil?')) {
      this.loader = true;  // show loader

      this.restApiService.deleteProfile(profile_id).subscribe(response => {

        console.log(response);
        this.loader = false; // hide loader
        if (response === 800) {
          // If network error
          this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
        }

        if (response.result === 1) {
          this.profiles.splice(index, 1);
          this.toastService.show(response.comment, 5000, 'green');
        }

      });
    }
  }

  onSearchChange(val: string) {
    // if the value is an empty string don't filter the items
    // Reset items back to all of the items
    this.profiles = this.temp_profile;

    if (val && val.trim() != '') {
      this.profiles = this.profiles.filter((item) => {
        const row = item.c_libelle;
        return (row.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

}
