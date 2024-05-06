import { ErrorMessageComponent } from './error-message/error-message.component';
import { CommonModule } from "@angular/common";
import { NgModule, Type } from "@angular/core";
import { ToastComponent } from "./toast/toast.component";
import { ModalBoxComponent } from './modal-box/modal-box.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

export const SHARED_COMPONENTS: Array<Type<any>> = [
  ToastComponent,
  ErrorMessageComponent,
  ModalBoxComponent,
  ModalDialogComponent,
  LoadingSpinnerComponent,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...SHARED_COMPONENTS],
  exports: [...SHARED_COMPONENTS],
})
export class SharedComponentsModule {}