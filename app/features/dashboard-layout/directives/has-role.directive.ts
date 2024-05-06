import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { TokenStorageService } from "../../../core/services/token-storage.service";

@Directive({
    selector: '[appHasRole]',
    standalone: true
})
export class HasRoleDirective {
    userRoles: string[];

    @Input() set appHasRole(roles: string[]) {
        if (roles.some(role => this.userRoles.includes(role))) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainerRef.clear();
        }
    }

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private tokenStorageService: TokenStorageService
    ) {
        this.userRoles = this.tokenStorageService.getUser()['roles'];
    }
}

