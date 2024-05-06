import { NgModule } from "@angular/core";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { ToastComponent } from "./components/toast/toast.component";
import { ErrorMessageComponent } from "./components/error-message/error-message.component";
import { ModalBoxComponent } from "./components/modal-box/modal-box.component";
import { ModalDialogComponent } from "./components/modal-dialog/modal-dialog.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { ErrorPageComponent } from "./components/error-page/error-page.component";
import { CommonModule } from "@angular/common";
import { MessageConfirmationPopupComponent } from "./components/message-confirmation-popup/message-confirmation-popup.component";


const SHARED_MODULES = [
    PaginationComponent,
    ToastComponent,
    ErrorMessageComponent,
    ModalBoxComponent,
    ModalDialogComponent,
    LoadingSpinnerComponent,
    ErrorPageComponent,
    MessageConfirmationPopupComponent
];

@NgModule({
    imports: [CommonModule],
    declarations: [...SHARED_MODULES],
    exports: [...SHARED_MODULES],
})
export class SharedModule { }