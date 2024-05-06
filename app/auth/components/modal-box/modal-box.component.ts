import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal-box-auth',
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss'
})
export class ModalBoxComponent {
  @Input() message: string = '';
  @Input() description: string = '';
  @Input() showModal: boolean = false;

  @Output() confirmClicked: EventEmitter<void> = new EventEmitter<void>();

  openModal() {
    this.showModal = true;
  }

  confirm() {
    this.confirmClicked.emit();
    this.showModal = false;
  }
}
