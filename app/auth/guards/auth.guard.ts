import { TokenStorageService } from './../../core/services/token-storage.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private tokenStorageService: TokenStorageService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.tokenStorageService.getUser();

        if (currentUser) {
            const allowedRoles = route.data['roles'] as string[];
            if (allowedRoles && !allowedRoles.some(role => currentUser['roles'].includes(role))) {
                this.router.navigate(['/unauthorized']);
                return false;
            }
            // authorised
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}