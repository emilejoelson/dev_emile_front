import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from 'd:/AB/norsify-front/src/app/core/models/category.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  categoryId!: number;
  category!: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      this.getCategoryDetails(this.categoryId);
    });
  }

  getCategoryDetails(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe(
      (category: Category) => {
        this.category = category;
        console.log('Details category with id : ', categoryId, ' : ', category);
      },
      (error) => {
        console.log('Error fetching category details: ', error);
      }
    );
  }
}
