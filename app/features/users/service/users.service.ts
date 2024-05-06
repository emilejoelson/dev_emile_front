import { Injectable } from "@angular/core";
import { HttpService } from "../../../core/services/http.service";
import { FilterRequest } from "../../../shared/models/search-query/FilterRequest";
import { map } from "rxjs";

@Injectable()
export class UserService {

    constructor(private http: HttpService) { }

    fetchStores(searchUser: any) {
        
        const filters = new Array<FilterRequest>();
        if (searchUser.firstName) filters.push(new FilterRequest("firstName", "LIKE", "STRING", searchUser.firstName));
        if (searchUser.lastName) filters.push(new FilterRequest("lastName", "LIKE", "STRING", searchUser.lastName));
        if (searchUser.email) filters.push(new FilterRequest("email", "LIKE", "STRING", searchUser.email));
        if (searchUser.status) filters.push(new FilterRequest("isActivated", "EQUAL", "BOOLEAN", searchUser.status));
        // if (searchUser.role) filters.push(new FilterRequest("roles", "IN", "STRING", searchUser.role));

        return this.http.post("users/search", {
            "filters": filters, 
            "sorts": [],
            "page": searchUser.currentPage,
            "size": searchUser.recodsPerPage
        }).pipe(map(response => {
            return {
                content: response.content,
                currentPage: response.number + 1,
                totalPages: response.totalPages,
                totalElements: response.totalElements,
                first: response.first,
                last: response.last
            }
        }));
    }
}