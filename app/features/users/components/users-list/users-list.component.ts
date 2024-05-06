import { Component, computed, signal } from '@angular/core';
import { UserService } from '../../service/users.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  content!: any[];
  totalPages!: number;
  totalElements!: number;
  numberOfPage!: number;
  last!: boolean;
  first!: boolean;

  showConfirmationPopup: boolean = false;

  constructor(private userService: UserService) { }

  firstName = signal("");
  lastName = signal("");
  email = signal("");
  role = signal("['USER','OWNER_SHOP']");
  status = signal('');
  currentPage = signal(0);
  recodsPerPage = signal(10);

  nextPage(next: number): void {
    this.currentPage.set(next - 1);
  }

  recordsPerPage(recordsPage: number) {
    this.recodsPerPage.set(recordsPage);
    this.currentPage.set(0);
  }

  onStatusChange(status: any) {
    this.status.set(status);
    this.currentPage.set(0);
  }

  onRoleChange(role: any) {
    this.role.set(role);
    this.currentPage.set(0);
  }

  onSearchChange() {
    this.currentPage.set(0);
  }

  search = computed(() => ({
    firstName: this.firstName(),
    lastName: this.lastName(),
    email: this.email(),
    role: this.role(),
    status: this.status(),
    currentPage: this.currentPage(),
    recodsPerPage: this.recodsPerPage()
  }));

  stores = toSignal(
    toObservable(this.search).pipe(
      debounceTime(200),
      switchMap((search) => {
        return this.userService.fetchStores(search).pipe(
          tap(response => {
            this.content = response.content;
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
            this.numberOfPage = response.currentPage;
            this.last = response.last;
            this.first = response.first;
          })
        );
      })
    )
  );

  openMessageConfirmation(userId: number) {
    this.showConfirmationPopup = true;
  }

  onAccept() { }

  onCancel() {
    this.showConfirmationPopup = false;
  }
}
