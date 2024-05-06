import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoresListComponent } from "./components/stores-list/stores-list.component";
import { FormsModule } from "@angular/forms";
import { StoresRoutingModule } from "./stores-routing.module";
import { StoreService } from "./service/stores.service";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    declarations: [
        StoresListComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        SharedModule,
        StoresRoutingModule,
    ],
    providers: [StoreService]
})
export class StoresModule { }