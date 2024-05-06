import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'roleDisplayName'
})
export class RoleDisplayNamePipe implements PipeTransform {
    transform(roles: string[]): string {
        if (roles.includes("OWNER_SHOP") && roles.includes("USER")) {
            return "Owner shop";
        } else if (roles.includes("ADMIN") && roles.includes("USER")) {
            return "Admin";
        } else {
            return "Client";
        }   
    }
}