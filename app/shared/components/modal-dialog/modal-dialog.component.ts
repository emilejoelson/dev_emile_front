import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss'
})
export class ModalDialogComponent {
  @Input() message: string = '';
  @Input() description: string = '';
  @Input() showModal: boolean = false;

  @Output() acceptClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  accept() {
    this.acceptClicked.emit();
    this.closeModal();
  }

  cancel(){
    this.cancelClicked.emit();
    this.closeModal();
  }
}
