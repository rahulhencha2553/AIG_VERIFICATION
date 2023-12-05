import { AbstractControl } from '@angular/forms';

export class AppUtils {


   public  emailPattern = /^[a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;

  //           password matcher
  static match(control: AbstractControl): void | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl!.pristine || confirmPasswordControl!.pristine) {
      return null;
    }

    if (passwordControl!.value === confirmPasswordControl!.value) {
      return null;
    }

    confirmPasswordControl!.setErrors({ match: true });
  }

  //  check is email

  public isEmail(email: any) {
    if (!isNaN(email)) {
      if (!email.match(this.emailPattern)) {
        alert('Please enter valid email');
        return false;
      }
    }
    return true;
  }


  // change icons 
  public static changePassowrdIcon(element:any){
    if(element.type==='text')
    element.type ='password'
  else
  element.type ='text'
    
  }
}
