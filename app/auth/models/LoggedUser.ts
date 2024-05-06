export class LogedUser {
    id: number;
    roles: string[];

    constructor(id: number, roles: string[]) {
        this.id = id;
        this.roles = roles;
    }

    public hasRole(role: string): boolean {
        return this.roles.includes(role);
    }
}