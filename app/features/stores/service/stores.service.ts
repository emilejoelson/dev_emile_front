import { map } from "rxjs";
import { FilterRequest } from "../../../shared/models/search-query/FilterRequest";
import { Injectable } from "@angular/core";
import { HttpService } from "../../../core/services/http.service";

@Injectable()
export class StoreService {

    constructor(private http: HttpService) { }

    fetchStores(searchStore: any) {
        const filters = new Array<FilterRequest>();
        if (searchStore.name) filters.push(new FilterRequest("name", "LIKE", "STRING", searchStore.name));
        if (searchStore.email) filters.push(new FilterRequest("email", "LIKE", "STRING", searchStore.email));
        if (searchStore.category) filters.push(new FilterRequest("category", "LIKE", "STRING", searchStore.category));
        if (searchStore.location) filters.push(new FilterRequest("location", "LIKE", "STRING", searchStore.location));
        if (searchStore.status) filters.push(new FilterRequest("isEnabled", "EQUAL", "BOOLEAN", searchStore.status));

        return this.http.post("stores/search", {
            "filters": filters,
            "sorts": [],
            "page": searchStore.currentPage,
            "size": searchStore.recodsPerPage
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