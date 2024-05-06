import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  passwordVisible = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  errorMessage: string = '';
  loginForm!: FormGroup;
  username: string = '';
  password: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) { }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required, Validators.pattern('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/')],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = "";
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.tokenStorage.saveAccessToken(response.accessToken.token);
        this.tokenStorage.saveRefreshToken(response.refreshToken.token);
        this.loading = false;
        this.router.navigate(['/dashboard'])
      },
      error => {
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    );
  }
}
