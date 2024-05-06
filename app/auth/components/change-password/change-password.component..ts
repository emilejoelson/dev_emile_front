import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface ErrorResponse {
  code: number;
  status: string;
  message: string;
} 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {
  token: string = '';
  newPassword: string = '';
  errorMessage: string = '';
  confirmPassword: string = '';


  loading: boolean = false;
  passwordVisible = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['code'];
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.authService.resetPassword(this.newPassword, this.token).subscribe(
      (response: boolean) => {
        console.log('Password reset successful:', response);
        this.loading = false;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error resetting password:', error);
        if (Array.isArray(error.error)) {

          for (let er of error.error) {
            console.error("field : ", er.field);
            console.error("message : ", er.message);
            const requirementsArray = er.message.split('.,');
            let requirementsString = requirementsArray.join('\n- ');
            this.errorMessage = "- " + requirementsString
            console.log("- ", requirementsString);
          }


        } else {

          const errorResponse: ErrorResponse = error.error;
          this.errorMessage = errorResponse.message;
        }
        this.loading = false;
      }
    );
  }
}

