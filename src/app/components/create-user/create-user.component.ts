import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;


  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    isClient: ''
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
      minlength: 'Le mot de passe doit contenir au moins 7 caractères.',
    },
    isClient: {
      required: 'Veuillez renseigner ce champ.',
      error: 'Nom d\'utilisateur ou mot de passe invalides.',
    }
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
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
    });
  }

  onSubmit() {

    if (!this.userForm.valid) {
      return;
    }
  }

}
