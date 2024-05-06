import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  emailSent: boolean = false;
  emailVerificationForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.emailVerificationForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
  sendLink() {
    this.loading = true;
    this.authService.sendForgetPasswordEmail(this.email).subscribe(
      (response: any) => {
        console.log('Email sended successfully !!:', response);
        this.emailSent = true;
        
      },
      (error) => {
        console.error('error sending Email:', error);
        this.loading = false;
        this.errorMessage = error.error.message
      }
    ).add(() => {
      this.loading = false;
    });
  }

  resendLink() {
    this.loading = true;
    this.authService.resendForgetPasswordEmail(this.email).subscribe(
      (response: any) => {
        console.log('Resend link successful:', response);
      },
      (error) => {

        console.error('Error resending link:', error);
        this.loading = false;
      }
    ).add(() => {
      this.loading = false;
    });
  }

}

