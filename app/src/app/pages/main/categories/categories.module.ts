/* #region  Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { CategoryItemModule } from 'src/app/components/category-item/category-item.module';
/* #endregion */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    CategoryItemModule,
  ],
  declarations: [
    CategoriesPage
  ]
})
export class CategoriesPageModule { }
