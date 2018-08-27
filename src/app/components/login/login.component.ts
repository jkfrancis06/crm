import { Component, OnInit, Renderer } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginData} from '../../models/login-data';
import {AuthenticationServiceService} from '../../providers/auth/authentication-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;


  // error messages
  errorMessageResources = {
    username: {
      required: 'Username is required.',
    },
    password: {
      required: 'Password is required.',
    }
  };

  // initial values

  user: LoginData = {
    username: '',
    password: ''
  };


  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationServiceService) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    console.log(this.loginForm.value);

    this.authenticationService.login('toto', 'toto').then(response => {
        console.log(response);
      }
    )

    this.submitted = true;
    this.user = Object.assign({}, this.loginForm.value);
  }

}
