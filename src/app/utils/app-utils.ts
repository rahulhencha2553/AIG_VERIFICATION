import { AbstractControl } from '@angular/forms';
declare var butterup: any;
export class AppUtils {



// dismiss modal
public static modalDismiss(id:string){
const button = document.getElementById(id);
button?.click();
}


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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    
  }


  // change icons 
  public static changePassowrdIcon(element:any){
    if(element.type==='text')
    element.type ='password'
  else
  element.type ='text'
    
  }

  public static openToast(type:string='success',message:string='',title:string='Success'){
    butterup.toast({
      title: title,
      message: message,
      location: 'top-center',
      icon: true,
      dismissable: false,
      type: type,
 
     });
  }

  

  public static months =[
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

public static getYearsArray(){
  let years =[];
  for(let i=2000;i<=new Date().getFullYear();i++)
  years.push(i);
return years;
}
}
