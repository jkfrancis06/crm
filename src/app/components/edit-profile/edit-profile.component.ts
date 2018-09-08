import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestApiRequestService} from '../../providers/rest/rest-api-request.service';
import {MzToastService} from 'ngx-materialize';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;


  profile = {
    c_id: '',
    c_libelle: '',
    c_description: '',
    c_modules: []
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

  sub: any;

  private id: any;
  private profiles: any;
  temp_modules: any;

  constructor(private formBuilder: FormBuilder,
              private restApiService: RestApiRequestService,
              private toastService: MzToastService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    // get param from router

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    // form fields constraints

    this.profileForm = this.formBuilder.group({
      libelle: [this.profile.c_libelle, Validators.required],
      description: [this.profile.c_description, Validators.compose([
        Validators.required,
        Validators.minLength(10),
      ])],
      modules: [this.temp_modules]
    });

    // get profile list from the server

    this.loader = true;


    this.restApiService.loadProfileList().subscribe(response => {

      this.loader = false;

      if (response === 800) {

        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.profiles = response.profil;

        for (let i = 0; i < this.profiles.length; i++) {
          if (this.profiles[i].c_id === this.id) {
            this.profile = this.profiles[i];
            // pushing only ids un new array
            this.temp_modules = [];
            for (let t = 0; t < this.profile.c_modules.length; t++) {
              this.temp_modules.push(this.profile.c_modules[t].c_id);
            }
          }
        }

        console.log( this.temp_modules)

        // then load modules

        this.restApiService.loadModulesList().subscribe(res => {

          this.loader = false;

          if (res === 800) {

            // If network error
            this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
          }

          if (res.result === 1) {
            this.modules = res.modules;

            // set value of form


            // for (let j = 0; j < this.profile.c_modules.length; j++) {
            //   for (let k = 0; k < this.modules.length; j++) {
            //     if (this.profile.c)
            //       }
            // }

            const prof = {
              libelle: this.profile.c_libelle,
              description: this.profile.c_description,
              modules: this.temp_modules
            }

            this.profileForm.setValue(prof);
          }

          console.log(this.profile);

        });


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

    this.restApiService.editProfile(this.profileForm.value, this.id).subscribe(response => {

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
