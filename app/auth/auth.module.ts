import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from "./service/auth.service";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component.";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalBoxComponent } from "./components/modal-box/modal-box.component";
import { CreateStoreComponent } from "./components/create-store/create-store.component";
import { AuthGuard } from "./guards/auth.guard";
import { authInterceptorProviders } from "./interceptors/auth.interceptor";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'resetPassword', component: ResetPasswordComponent },
    { path: 'new-password-form', component: ChangePasswordComponent },
    { path: 'create-store', component: CreateStoreComponent },
];


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        ChangePasswordComponent,
        ModalBoxComponent,
        CreateStoreComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule.forChild(routes),
    ],
    exports: [],
    providers: [AuthService, AuthGuard, authInterceptorProviders]
})
export class AuthModule { }