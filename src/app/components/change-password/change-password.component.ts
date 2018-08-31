import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationServiceService} from '../../providers/auth/authentication-service.service';
import {MzToastService} from 'ngx-materialize';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {PasswordForm} from '../../models/password-form';
import {PasswordValidation} from '../../validator/password-validation';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {

  @ViewChild('featureDiscovery') featureDiscovery: any;

  passwordForm: FormGroup;

  // error messages
  errorMessageResources = {
    password: {
      required: 'Ce champ est obligatoire.',
      error: 'Mot de passe incorrect',
    },
    new_password: {
      required: 'Ce champ est obligatoire.',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères.',
    },
    conf_password: {
      required: 'Ce champ est obligatoire.',
      MatchPassword: 'Les mots de passe doivent etre identiques.',
    }
  };

  change_password: PasswordForm = {
    password: '',
    new_password: '',
    conf_password: '',
  };
  loader = false;
  user: any;
  first_start: any;
  is_feature_open: boolean;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationServiceService,
              private toastService: MzToastService,
              private dataRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    // check if is first start  password change or not
    this.first_start = localStorage.getItem('must_change_password');

    if (this.first_start === 1) {
      this.user = JSON.parse(localStorage.getItem('must_change_password'));
    }
    // login form fields constraints
    this.passwordForm = this.formBuilder.group({
      password: [this.change_password.password, Validators.required],
      new_password: [this.change_password.new_password, Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      conf_password: [this.change_password.conf_password, Validators.required],
    }, {
      validator: PasswordValidation.MatchPassword
    });

    this.user = JSON.parse(localStorage.getItem('user'));


  }

  ngAfterViewInit() {
    if (this.featureDiscovery) {
      this.featureDiscovery.open();
      this.is_feature_open = false;
    }
  }







  onSubmit() {

  }

  triggerFeatureDiscovery() {
    if (this.is_feature_open === true) {
      this.featureDiscovery.close();
    } else {
      this.featureDiscovery.open();
    }
  }
}
