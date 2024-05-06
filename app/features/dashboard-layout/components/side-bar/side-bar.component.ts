import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../auth/service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor(private authService: AuthService) { }

  @Input() status: boolean = false;

  signOut() {
    this.authService.logout();
  }
}
