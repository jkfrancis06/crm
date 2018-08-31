import {AbstractControl, FormGroup} from '@angular/forms';

export class PasswordValidation {
  static MatchPassword(AC: AbstractControl) {
    const new_password = AC.get('new_password').value; // to get value in input tag
    const conf_password = AC.get('conf_password').value;// to get value in input tag
    if (new_password != conf_password) {
      AC.get('conf_password').setErrors( {MatchPassword: true} );
    } else {
      return null;
    }
  }
}
