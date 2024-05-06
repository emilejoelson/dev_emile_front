import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../auth/models/category.model';
import { ToastService } from '../../../../shared/services/toast.service';
import { ValidationResponse } from '../../../../core/models/validation-response.model';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css'],
})
export class NewCategoryComponent implements OnInit {
  newCategory: Category = {
    id: 0,
    name: '',
    description: '',
    status: false,
  };

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      if (categoryId) {
        this.loadCategory(categoryId);
      }
    });
  }

  loadCategory(categoryId: number): void {
    this.categoryService
      .getCategoryById(categoryId)
      .subscribe((category) => (this.newCategory = category));
  }

  returnToLogin(): void {
    this.router.navigateByUrl('/dashboard/categories');
  }

  addOrUpdateCategory(): void {
    if (this.newCategory.id) {
      this.updateCategory(this.newCategory.id, this.newCategory); // Pass both categoryId and category
    } else {
      this.addCategory();
    }
  }

  addCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: (createdCategory) => {
        console.log('Category added : ', createdCategory);
        this.newCategory = {
          id: 0,
          name: '',
          description: '',
          status: false,
        };
        this.toastService.createToast('success', 'Category added successfully');
        this.router.navigateByUrl('/dashboard/categories');
      },
      error: (err) => {
        console.error('Error adding category: ', err);
        if (err.status === 400 && Array.isArray(err.error)) {
          const validationErrors: ValidationResponse[] = err.error;
          validationErrors.forEach((error) => {
            this.toastService.createToast('error', error.message);
          });
        } else {
          this.toastService.createToast(
            'error',
            'Failed to add category. Please try again.'
          );
        }
      },
    });
  }

  updateCategory(categoryId: number, category: Category): void {
    // Accept categoryId and category as arguments
    this.categoryService.updateCategory(categoryId, category).subscribe({
      next: (updatedCategory) => {
        console.log('Category updated : ', updatedCategory);
        this.toastService.createToast(
          'success',
          'Category updated successfully'
        );
        this.router.navigateByUrl('/dashboard/categories');
      },
      error: (err) => {
        console.error('Error updating category: ', err);
        if (err.status === 400 && Array.isArray(err.error)) {
          const validationErrors: ValidationResponse[] = err.error;
          validationErrors.forEach((error) => {
            this.toastService.createToast('error', error.message);
          });
        } else {
          this.toastService.createToast(
            'error',
            'Failed to update category. Please try again.'
          );
        }
      },
    });
  }
}
