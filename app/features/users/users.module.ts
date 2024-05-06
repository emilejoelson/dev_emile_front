import { NgModule } from "@angular/core";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { UserService } from "./service/users.service";
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RoleDisplayNamePipe } from "./pipes/RoleDisplayNamePipe";

@NgModule({
    declarations: [
        UsersListComponent,
        RoleDisplayNamePipe
    ],
    imports: [
        UsersRoutingModule,
        SharedModule,
        FormsModule,
        CommonModule,
    ],
    providers: [UserService]
})
export class UsersModule { }