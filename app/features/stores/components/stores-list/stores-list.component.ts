import { debounceTime, switchMap, tap } from 'rxjs';
import { StoreService } from './../../service/stores.service';
import { Component, computed, signal } from '@angular/core';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrl: './stores-list.component.css'
})
export class StoresListComponent {

  content!: any[];
  totalPages!: number;
  totalElements!: number;
  numberOfPage!: number;
  last!: boolean;
  first!: boolean;

  constructor(private storeService: StoreService) { }

  name = signal("");
  email = signal("");
  category = signal("");
  location = signal("");
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

  onSearchChange() {
    this.currentPage.set(0);
  }

  search = computed(() => ({
    name: this.name(),
    email: this.email(),
    category: this.category(),
    location: this.location(),
    status: this.status(),
    currentPage: this.currentPage(),
    recodsPerPage: this.recodsPerPage()
  }));

  stores = toSignal(
    toObservable(this.search).pipe(
      debounceTime(200),
      switchMap((search) => {
        return this.storeService.fetchStores(search).pipe(
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
}