import { Injectable } from "@angular/core";
import { HttpService } from "../../core/services/http.service";

@Injectable({
    providedIn: 'root'
})
export class ProfilService {

    constructor(private http: HttpService) { }

    getUserProfil(userId: number) {
        return this.http.get(`users/${userId}`);
    }
}