import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfilService } from '../../../../shared/services/profil.service';
import { TokenStorageService } from '../../../../core/services/token-storage.service';
import { AuthService } from '../../../../auth/service/auth.service';


@Component({
  selector: 'app-header',

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  status: boolean = true;
  firstName!: string;
  lastName!: string;
  email!: string;

  @Output() statusEvent = new EventEmitter<boolean>();

  constructor(
    private httpService: ProfilService,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const currentUserId = this.tokenStorageService.getUser()["id"];
    if (currentUserId) {
      this.httpService.getUserProfil(parseInt(currentUserId)).subscribe(
        (user) => {
          this.firstName = user["firstName"];
          this.lastName = user["lastName"];
          this.email = user["email"];
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Pas d'user");
    }
  }

  toggleSidebar() {
    this.status = !this.status;
    this.statusEvent.emit(this.status);
  }

  menuToggle(): void {
    const toggleMenu: HTMLElement | null = document.querySelector(".menu");
    if (toggleMenu) {
      toggleMenu.classList.toggle("active");
    }
  }

  signOut() {
    this.authService.logout();
  }

}
