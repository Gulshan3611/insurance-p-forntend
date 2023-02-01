import { FormGroup } from '@angular/forms';

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['ConfirmPasswordValidator']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ ConfirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
