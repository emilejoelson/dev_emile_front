import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<any[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  constructor() { }

  createToast(type: string, text: string): void {
    let icon: string;
    switch (type) {
      case 'success':
        icon = 'fa-check-circle';
        break;
      case 'error':
        icon = 'fa-exclamation-circle';
        break;
      case 'warning':
        icon = 'fa-exclamation-triangle';
        break;
      case 'info':
        icon = 'fa-info-circle';
        break;
      default:
        icon = 'fa-info-circle';
    }
    const toast = { type, text, icon };
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = [...currentToasts, toast];
    this.toastsSubject.next(updatedToasts);
    setTimeout(() => this.removeToast(toast), 5000);
  }

  removeToast(toast: any): void {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = currentToasts.filter(t => t !== toast);
    this.toastsSubject.next(updatedToasts);
  }
}
