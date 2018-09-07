import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';
import {RestApiRequestService} from '../../providers/rest/rest-api-request.service';
import {MzToastService} from 'ngx-materialize';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;


  user = {
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    isClient: false,
    client: '',
    profile: '',
    isReset: false,
  };

  temp_user: any;

  // error messages
  errorMessageResources = {
    firstname: {
      required: 'Veuillez renseigner ce champ.'
    },
    lastname: {
      required: 'Veuillez renseigner ce champ.'
    },
    email: {
      required: 'Veuillez renseigner ce champ.',
      error: 'Addresse email invalide.',
      email: 'Addresse email invalide.',
    },
    telephone: {
      required: 'Veuillez renseigner ce champ.',
      error: 'Invalid phone number.',
      minlength: 'Veuillez saisir un numéro valide.',
    },
    isClient: {
      required: 'Veuillez renseigner ce champ.',
      error: 'Nom d\'utilisateur ou mot de passe invalides.',
    },
    profile: {
      required: 'Veuillez renseigner ce champ.'
    }
  };
  users: any;
  profiles: any;
  loader = false;
  sub: any;
  id: any;
  usr: any;

  constructor(private formBuilder: FormBuilder,
              private restApiService: RestApiRequestService,
              private toastService: MzToastService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);
    // form fields constraints
    this.userForm = this.formBuilder.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      telephone: [this.user.telephone, Validators.compose([
        Validators.required,
        Validators.minLength(7),
      ])],
      profile: [this.user.profile, Validators.required],
      isReset: [this.user.isReset],
    });


    // get client list from the server

    this.loader = true;



    // get profile list from the server

    this.restApiService.loadProfileList().subscribe(response => {

      console.log(response);
      // this.loader = false;
      if (response === 800) {

        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.profiles = response.profil;

        this.restApiService.loadUserList().subscribe(res => {


          this.loader = false;

          // this.loader = false;
          if (res === 800) {

            // If network error
            this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
          }

          if (res.result === 1) { // if success
            console.log(res);
            // get user from id
            this.users = res.users;
            console.log(this.users);
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].c_id === this.id) {
                this.temp_user = this.users[i];
                // get profile from profile id;
                for (let j = 0; j < this.profiles.length; j++ ) {
                  if (this.profiles[j].c_id === this.temp_user.c_id_pro) {
                    this.temp_user.profile = this.profiles[j];
                    console.log(this.temp_user);
                    const usr = {
                      firstname: this.temp_user.c_prenom,
                      lastname: this.temp_user.c_nom,
                      email: this.temp_user.c_login,
                      telephone: this.temp_user.c_tel,
                      profile: this.temp_user.profile,
                      isReset: false
                    };
                    this.userForm.setValue(usr);
                  }
                }
              }
            }

          }

        });
      }

    });



  }

  onSubmit() {

    if (!this.userForm.valid) {
      return;
    }

    console.log(this.userForm.value);

    this.loader = true;

    this.restApiService.editUser(this.userForm.value, this.temp_user.c_id).subscribe(response => {

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
        this.router.navigate(['/admin/user-manage']);
      }

    });

  }
}
