import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export class FormValidator {
  // checking field is valid or not
  public static formValidCheck(fieldName: string, form: any) {
    const field = form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  // mark as touch to all fields to show errors
  public static formSubmittion(addForm: any) {
    Object.keys(addForm.controls).forEach((key) => {
      const control = addForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
    const firstInvalidControl = document.querySelector('input.ng-invalid');
  }
}

export function passwordConfirmationValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(controlName);
    const confirmPasswordControl = formGroup.get(matchingControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
