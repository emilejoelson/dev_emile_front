import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { DashboardLayoutModule } from "./dashboard-layout/dashboard-layout.module";
import { StoresModule } from "./stores/stores.module";
import { SharedModule } from "../shared/shared.module";
import { CategoryModule } from "./category/category.module";

const FEATURES_MODULES = [
    DashboardLayoutModule,
    StoresModule,
    CategoryModule
];

@NgModule({
    declarations: [],
    imports: [
        SharedModule,
        FEATURES_MODULES
    ],
    exports: [
        FEATURES_MODULES
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class FeaturesModule { }