import { Component, OnInit, Renderer } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginData} from '../../models/login-data';
import {AuthenticationServiceService} from '../../providers/auth/authentication-service.service';
import {MzModalService, MzToastService} from 'ngx-materialize';


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

  loader = false;


  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationServiceService,
              private modalService: MzModalService,
              private toastService: MzToastService,
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
    let req = this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(response => {
        console.log(response);
        this.loader = false;
        if (response === 800) {
          this.toastService.show('Network error. Please try again later',4000, 'red');
        }else {
          if (response.result === 0) {
            alert('error');
          } else {
            alert('ok');
          }
        }

      }
    )


    this.submitted = true;
    this.user = Object.assign({}, this.loginForm.value);
  }


}
