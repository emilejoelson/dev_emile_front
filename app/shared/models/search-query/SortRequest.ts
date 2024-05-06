export class SortRequest {
    key: string;
    direction: string;

    constructor(key: string, direction: string) {
        this.key = key;
        this.direction = direction;
    }
}
