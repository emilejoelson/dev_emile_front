import { NgModule } from '@angular/core';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryDetailsComponent,
    NewCategoryComponent,
  ],
  imports: [
    CategoryRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CategoryModule {}
