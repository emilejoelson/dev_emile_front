import { FilterReq } from "./FilterReq.model";
import { SortReq } from "./SortReq.model";

export interface SearchReq {
    filters: FilterReq[];
    sorts: SortReq[];
    page: number;
    size: number;
  }