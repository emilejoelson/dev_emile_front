import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { EntryComponent } from "../entry/entry.component";
import { AboutComponent } from "../about/about.component";
import { ContactComponent } from "../contact/contact.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@NgModule({
    declarations: [
        HomeComponent,
        EntryComponent,
        AboutComponent,
        ContactComponent,
        FooterComponent,
        NavbarComponent
    ],
    imports: [
    ],
    exports: [
        HomeComponent,
    ]
})
export class HomeModule { }