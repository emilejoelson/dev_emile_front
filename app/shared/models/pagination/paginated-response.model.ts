export interface PaginatedResponseDto<T> {
    records: T[];
    totalRecords: number;
    pages: number;
  }