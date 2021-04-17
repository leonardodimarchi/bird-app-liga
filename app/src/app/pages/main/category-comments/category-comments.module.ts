/* #region  Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryCommentsPageRoutingModule } from './category-comments-routing.module';

import { CategoryCommentsPage } from './category-comments.page';
import { CommentItemModule } from 'src/app/components/comment-item/comment-item.module';
/* #endregion */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryCommentsPageRoutingModule,
    CommentItemModule,
  ],
  declarations: [
    CategoryCommentsPage
  ]
})
export class CategoryCommentsPageModule { }
