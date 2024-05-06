import { FilterRequest } from "./FilterRequest";
import { SortRequest } from "./SortRequest";

export class SearchRequest {
    filters!: FilterRequest[];
    sorts!: SortRequest[];
    page: number = 0;
    size: number = 10;

    addFilter(filter: FilterRequest): void {
        this.filters.push(filter);
    }
    addSort(sort: SortRequest): void {
        this.sorts.push(sort);
    }
}