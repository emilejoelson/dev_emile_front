import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-confirmation-popup',
  templateUrl: './message-confirmation-popup.component.html',
  styleUrl: './message-confirmation-popup.component.css'
})
export class MessageConfirmationPopupComponent {

  @Input() showModal: boolean = false;
  @Output() acceptClicked: EventEmitter<any> = new EventEmitter();
  @Output() cancelClicked: EventEmitter<any> = new EventEmitter();

  closePopup() {
    this.showModal = false;
  }

  accept() {
    this.acceptClicked.emit();
    this.closePopup();
  }

  cancel() {
    this.cancelClicked.emit();
    this.closePopup();
  }
}
