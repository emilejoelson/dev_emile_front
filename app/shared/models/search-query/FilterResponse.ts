import { OperationSystem } from "./OperationSystem"

export class FilterResponse {
    content: OperationSystem[];
    number: number;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;

    constructor(content: OperationSystem[], number: number, totalPages: number,
        totalElements: number, first: boolean, last: boolean) {
        this.content = content;
        this.number = number;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.first = first;
        this.last = last;
    }
}