export class FormValidator {

    
    // checking field is valid or not
 public static  formValidCheck(fieldName:string,form:any){
    const field = form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }


// mark as touch to all fields to show errors
public static formSubmittion(addForm:any) {
  Object.keys(addForm.controls).forEach((key) => {
    const control = addForm.get(key);
    if (control) {
      control.markAsTouched();
    }
  });
  const firstInvalidControl = document.querySelector('input.ng-invalid');
}





}