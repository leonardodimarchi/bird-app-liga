import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCategoryPage } from './create-category.page';

const routes: Routes = [
  {
    path: '',
    component: CreateCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCategoryPageRoutingModule {}
