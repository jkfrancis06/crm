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
      required: 'Veuillez renseigner ce champ.',
      error: 'Nom d\'utilisateur ou mot de passe invalides.',
    },
    password: {
      required: 'Veuillez renseigner ce champ.',
      error: 'Nom d\'utilisateur ou mot de passe invalides.',
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
          this.toastService.show('Erreur réseau. Veuillez réessayer plus tard',5000, 'red');
        } else {
          // if invalid password or username
          if (response.result === 0) {
            // show toast and forms to invalid
            this.toastService.show(response.comment,6000, 'red');
          } else {
            // if success show success toast and set user data in local storage
            this.toastService.show(response.comment,5000, 'green');
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('must_change_password', response.must_change_password);
            localStorage.setItem('droit', JSON.stringify(response.droit));
            this.router.navigate(['/']);
          }
        }

      }
    )


    this.submitted = true;
    this.user = Object.assign({}, this.loginForm.value);
  }


}
