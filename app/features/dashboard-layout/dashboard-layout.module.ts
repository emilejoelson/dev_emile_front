import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DashboardLayoutRoutingModule } from "./dasboard-layout-routing.module";
import { HasRoleDirective } from "./directives/has-role.directive";

@NgModule({
    declarations: [
        HeaderComponent,
        SideBarComponent,
        MainLayoutComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        DashboardLayoutRoutingModule,
        HasRoleDirective
    ]
})
export class DashboardLayoutModule { }