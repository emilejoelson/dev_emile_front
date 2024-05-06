import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { StoresListComponent } from "../stores/components/stores-list/stores-list.component";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['USER']
    },
    children: [
      {
        path: 'stores',
        loadChildren: () => import('../stores/stores.module').then(m => m.StoresModule),
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
      },
      {
        path : 'categories',
        loadChildren : () => import('../category/category.module').then(m =>m.CategoryModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule { }