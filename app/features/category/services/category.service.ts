import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CATEGORY_URL } from 'd:/AB/norsify-front/src/app/core/constants/CATEGORY_URL';
import { Category } from 'd:/AB/norsify-front/src/app/core/models/category.model';
import { API_BASE_URL } from 'd:/AB/norsify-front/src/app/core/constants/API_BASE_URL';
import { SearchReq } from '../../../shared/models/search-query/SearchReq.model';
import { PaginatedResponseDto } from '../../../shared/models/pagination/paginated-response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_BASE_URL}${CATEGORY_URL}`).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

  getAllCategoriesWithFilter(searchRequest: SearchReq): Observable<PaginatedResponseDto<Category>> {
    const params = new HttpParams().set('filters', JSON.stringify(searchRequest.filters))
                                    .set('sorts', JSON.stringify(searchRequest.sorts))
                                    .set('page', searchRequest.page.toString())
                                    .set('size', searchRequest.size.toString());
    return this.http.get<PaginatedResponseDto<Category>>(`${API_BASE_URL}/categories/with-filter`, { params });
  }


  public getCategoryById(categoryId: number): Observable<Category> {
    return this.http
      .get<Category>(`${API_BASE_URL}${CATEGORY_URL}/${categoryId}`)
      .pipe(
        catchError((error: any) => {
          throw error;
        })
      );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http
      .post<Category>(`${API_BASE_URL}${CATEGORY_URL}`, category)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (
            error.status === 400 &&
            error.error &&
            Array.isArray(error.error)
          ) {
            // If it's a validation error, return the error array
            return throwError(error.error);
          } else {
            // Otherwise, return the error object
            return throwError(error);
          }
        })
      );
  }

  public updateCategory(
    categoryId: number,
    category: Category
  ): Observable<Category> {
    return this.http
      .put<Category>(`${API_BASE_URL}${CATEGORY_URL}/${categoryId}`, category)
      .pipe(
        catchError((error: any) => {
          throw error;
        })
      );
  }

  public deleteCategory(categoryId: number): Observable<void> {
    return this.http
      .delete<void>(`${API_BASE_URL}${CATEGORY_URL}/${categoryId}`)
      .pipe(
        catchError((error: any) => {
          throw error;
        })
      );
  }

  public toggleCategoryStatus(categoryId: number): Observable<any> {
    return this.http
      .put(`${API_BASE_URL}${CATEGORY_URL}/category-toggle/${categoryId}`, null)
      .pipe(
        catchError((error: any) => {
          throw error;
        })
      );
  }
}
