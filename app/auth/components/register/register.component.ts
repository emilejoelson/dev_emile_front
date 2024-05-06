import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ErrorResponse {
  code: number;
  status: string;
  message: string;
} 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  loading = false;
  errorMessage = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  passwordVisible = false;
  signupForm!: FormGroup;
  message: string = 'Completed';
  description: string = 'Registration successful! Please check your email to verify your account.';
  showModal: boolean = false;


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required,Validators.pattern('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/')],
    });
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  openModal() {
    this.showModal = true;
  }

  confirm() {
    this.showModal = false;
    this.router.navigate(['/login']);
  }
  onSubmit() {
    this.errorMessage = '';

    this.loading = true;
    this.authService.register(this.firstName, this.lastName, this.email, this.password).subscribe(
      (response) => {
        console.log('Registration successful: ' + response);
        this.openModal();
        this.loading = false;
      },
      error => {
        console.log('Error: ' + error);
        this.loading = false;
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
      });
  }
}
