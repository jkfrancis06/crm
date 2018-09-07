import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {RestApiRequestService} from "../../providers/rest/rest-api-request.service";
import {MzToastService} from "ngx-materialize";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;


  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    isClient: false,
    client: '',
    profile: [],
  }

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
  clients: any;
  loader = false;
  sub: any;
  id: any;

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
      isClient: [this.user.isClient],
      client: [this.user.client],
      profile: [this.user.profile, Validators.required],
    });


    // get client list from the server

    this.loader = true;

    this.restApiService.loadClientList().subscribe(response => {

      // this.loader = false;
      if (response === 800) {

        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.clients = response.clients;
        console.log(this.clients);
      }

    });

    // get profile list from the server

    this.restApiService.loadProfileList().subscribe(response => {

      this.loader = false;

      // this.loader = false;
      if (response === 800) {

        // If network error
        this.toastService.show('Erreur réseau. Veuillez réessayer plus tard', 5000, 'red');
      }

      if (response.result === 1) {
        this.user.profile = response.profil;
        console.log(this.user);
      }

    });

  }

  onSubmit() {

    if (!this.userForm.valid) {
      return;
    }

    console.log(this.userForm.value);

    this.loader = true

    this.restApiService.createUser(this.userForm.value).subscribe(response => {

      console.log(response)

      this.loader = false

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
