import { Component, OnInit, Renderer } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginData} from '../../models/login-data';
import {AuthenticationServiceService} from '../../providers/auth/authentication-service.service';
import {MzModalService, MzToastService} from 'ngx-materialize';
import {Router} from "@angular/router";


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
      error: 'Invalid username or password.',
    },
    password: {
      required: 'Password is required.',
      error: 'Invalid username or password.',
    }
  };

  // initial values

  user: LoginData = {
    username: '',
    password: ''
  };

  loader = false;


  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationServiceService,
              private modalService: MzModalService,
              private toastService: MzToastService,
              private router: Router
  ) { }

  ngOnInit() {
    // login form fields constraints
    this.loginForm = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    // show loader
    this.loader = true;
    console.log(this.loginForm.value);
    // send login request to rest api
    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
        console.log(response);
        this.loader = false;
        if (response === 800) {
          // If network error
          this.toastService.show('Network error. Please try again later',5000, 'red');
        } else {
          // if invalid password or username
          if (response.result === 0) {
            // show toast and forms to invalid
            this.toastService.show('Invalid username or password',5000, 'red');
            this.loginForm.controls['username'].setErrors({'error': true});
            this.loginForm.controls['password'].setErrors({'error': true});
          } else {
            // if success show success toast and set user data in local storage
            this.toastService.show('Login successful',5000, 'green');
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/']);
          }
        }

      }
    )


    this.submitted = true;
    this.user = Object.assign({}, this.loginForm.value);
  }


}
