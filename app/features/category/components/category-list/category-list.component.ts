import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../auth/models/category.model';
import { Router } from '@angular/router';
import { SearchReq } from '../../../../shared/models/search-query/SearchReq.model';
import { PaginatedResponseDto } from '../../../../shared/models/pagination/paginated-response.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  searchRequest: SearchReq = { filters: [], sorts: [], page: 0, size: 5 };
  totalRecords: number = 0;
  pages: number = 0;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }
  
  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        // Reset search request filters
        this.searchRequest.filters = [];
        this.totalRecords = this.categories.length;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadCategoriesWithFilter(): void {
    this.categoryService.getAllCategoriesWithFilter(this.searchRequest).subscribe(
      (response: PaginatedResponseDto<Category>) => {
        this.categories = response.records;
        this.totalRecords = response.totalRecords;
        this.pages = response.pages;
      },
      (error) => {
        console.error('Error loading filtered categories:', error);
      }
    );
  }

  addFilter(key: string, value: string): void {
    this.searchRequest.filters.push({ key, value, operator: 'LIKE' });
    this.loadCategoriesWithFilter();
  }

  removeFilter(index: number): void {
    this.searchRequest.filters.splice(index, 1);
    this.loadCategoriesWithFilter();
  }

  nextPage(): void {
    if (this.searchRequest.page < this.pages) {
      this.searchRequest.page++;
      this.loadCategoriesWithFilter();
    }
  }

  prevPage(): void {
    if (this.searchRequest.page > 0) {
      this.searchRequest.page--;
      this.loadCategoriesWithFilter();
    }
  }

  addNewCategory() {
    this.router.navigateByUrl('/dashboard/categories/new-category');
  }

  showCategoryDetails(categoryId: number): void {
    this.router.navigate(['/dashboard/categories/category-details', categoryId]);
  }

  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        () => {
          this.loadCategoriesWithFilter();
          console.log('Category deleted successfully');
        },
        (error) => {
          console.log('Error deleting category with id ', categoryId);
        }
      );
    }
  }

  toggleCategoryStatus(category: Category): void {
    const originalStatus = category.status;
    category.status = !category.status;
    this.categoryService.toggleCategoryStatus(category.id).subscribe({
      next: (response) => {
        console.log('Toggle successful. Updated category:', response);
      },
      error: (err) => {
        console.log('Error toggling category status:', err);
        category.status = originalStatus;
      },
    });
  }

  editCategory(category: Category): void {
    if (category) {
      this.router.navigate(['/dashboard/categories/new-category'], {
        queryParams: { categoryId: category.id },
      });
    } else {
      console.error('Category is undefined.');
    }
  }
}
