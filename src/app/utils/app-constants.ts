export class AppConstants {

    public static USER_NAME_INVALID ='';

    

    
// Provide all set of validation messages here
public static readonly  VALIDATION_MESSAGES = {
    email: {
      required: 'Required',
      email: 'This email is invalid'
    },
    phoneNumber: {
        required: 'Required',
        phoneNumber: 'This phone number is invalid'
    },
    password: {
      required: 'Required',
      minlength: 'The password length must be greater than or equal to 8'
    },
    confirmPassword: {
      required: 'Required',
      match: 'Password does not match'
    },
    firstName: {
      required: 'Required'
    },
    lastName: {
      required: 'Required'
    }
  };
}
