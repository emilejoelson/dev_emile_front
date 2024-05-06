import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/pages/category/category.component';
import { NewCategoryComponent } from './category/components/new-category/new-category.component';
import { CategoryDetailsComponent } from './category/components/category-details/category-details.component';

const routes: Routes = [
    {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'category/new-category',
        component: NewCategoryComponent,
      },
      {
        path: 'category-details/:id',
        component: CategoryDetailsComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
