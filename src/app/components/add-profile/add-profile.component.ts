///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestApiRequestService} from '../../providers/rest/rest-api-request.service';
import {MzToastService} from 'ngx-materialize';
import {Router} from '@angular/router';
import {Profile} from '../../models/profile';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;


  profile: Profile = {
    libelle: '',
    description: '',
    modules: []
  };

  // error messages
  errorMessageResources = {
    libelle: {
      required: 'Veuillez renseigner ce champ.'
    },
    description: {
      required: 'Veuillez renseigner ce champ.',
      minlength: 'La description doit contenir au moins 10 caractères.',
    },
    modules: {
    }
  };

  clients: any;

  loader = false;

  modules: any;

  constructor(private formBuilder: FormBuilder,
              private restApiService: RestApiRequestService,
              private toastService: MzToastService,
              private router: Router) { }

  ngOnInit() {
    // form fields constraints
    this.profileForm = this.formBuilder.group({
      libelle: [this.profile.libelle, Validators.required],
      description: [this.profile.description, Validators.compose([
        Validators.required,
        Validators.minLength(10),
      ])],
      modules: [this.profile.modules]
    });


    // get modules list from the server

    this.loader = true;

    this.restApiService.loadModulesList().subscribe(response => {

      this.loader = false;

      if (response === 800) {

        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.modules = response.modules;
      }

      console.log(this.profile);

    });

  }

  onSubmit() {

    if (!this.profileForm.valid) {
      return;
    }

    console.log(this.profileForm.value);

    this.loader = true;

    this.restApiService.createProfile(this.profileForm.value).subscribe(response => {

      console.log(response);

      this.loader = false;

      // this.loader = false;
      if (response === 800) {

        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response === 400) {

        // If network error
        this.toastService.show('Parametres invalides.', 5000, 'red');
      }

      if (response.result === 1) {
        this.toastService.show(response.comment, 5000, 'green');
        this.router.navigate(['/admin/profile-manage']);
      }

    });

  }

}
