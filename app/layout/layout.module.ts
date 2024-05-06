import { NgModule } from "@angular/core";
import { HomeModule } from "./components/home/home.module";

@NgModule({
  imports: [
    HomeModule,
  ],
  exports: [
    HomeModule,
  ]
})
export class LayoutModule { }