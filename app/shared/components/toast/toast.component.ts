import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';





@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toasts: any[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  closeToast(toast: any): void {
    this.toastService.removeToast(toast);
  }
}
