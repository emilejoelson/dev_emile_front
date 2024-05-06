import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StoresListComponent } from "./components/stores-list/stores-list.component";

const routes: Routes = [
    {
        path: '',
        component: StoresListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StoresRoutingModule { }