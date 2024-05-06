export class FilterRequest {
    key: string;
    operator: string;
    field_type: string;
    value: Object;
    value_to?: Object;

    constructor(key: string, operator: string, field_type: string, value: Object, value_to?: Object) {
        this.key = key;
        this.operator = operator;
        this.field_type = field_type;
        this.value = value;
        this.value_to = value_to;
    }
}