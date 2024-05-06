import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../models/Store.model';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html'
})
export class CreateStoreComponent{

  logoFile: File | null = null;
  logoUrl: string | null = null;
  isLogoUploadedStep2: boolean = false;

  message: string = 'Completed !';
  errorMessage: string = '';
  description: string = 'Your store has been created successfully! Please check your email to verify your account.';
  showModal: boolean = false;
  loading: boolean = false;
  formError: boolean = false;
  showPart2: boolean = false;
  showPart3: boolean = false;
  currentStep: number = 1;

  fileSizeErrorMessage: string = '';
  dimensionsErrorMessage: string = '';
  sizeError: boolean = true;


  storeData: Store = {
    name: '',
    description: '',
    email: '',
    category: '',
    location: '',
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  };

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  nextStep(): void {

    if (this.currentStep === 1) {
      this.showPart2 = true;
      this.currentStep = 2;
    } else if (this.currentStep === 2) {
      this.showPart3 = true;
      this.currentStep = 3;
    }
  }

  prevStep(): void {
    if (this.currentStep === 2) {
      this.showPart2 = false;
      this.currentStep = 1;
    } else if (this.currentStep === 3) {
      this.showPart3 = false;
      this.currentStep = 2;
    }
  }

  onCreateStore(): void {

    this.errorMessage = ''
    this.loading = true;
    if (!this.logoFile) {
      console.log("you shoold add a logo");

      this.loading = false;
      return;
    }

    this.authService.createStore(this.storeData, this.logoFile).subscribe(
      (response) => {
        console.log('Store created successfully:', response);
        console.log("Your store is created successfully");
        this.openModal();
        this.loading = false;
      },
      (error) => {
        console.error('Error creating store:', error);
        console.log("storeData" + JSON.stringify(this.storeData));
        this.loading = false;
        this.errorMessage = error.error.message
      }
    );
  }

  onFileChange(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoFile = fileInput.files[0];
        this.logoUrl = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);

      this.isLogoUploadedStep2 = true;
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  confirm(): void {
    this.showModal = false;
    this.router.navigate(['/login']);
  }

  onCreateStorePart1(): void {
    console.log('Submitting Personal Information:', this.storeData);
  }

  onCreateStorePart2(): void {
    console.log('Submitting Store Information:', this.storeData);
  }

  onCreateStorePart3(): void {
    console.log('Submitting Email & Password:', this.storeData);
  }
}
