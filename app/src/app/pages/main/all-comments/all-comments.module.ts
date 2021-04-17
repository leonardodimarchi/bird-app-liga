/* #region  Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCommentsPageRoutingModule } from './all-comments-routing.module';

import { AllCommentsPage } from './all-comments.page';
import { CommentItemModule } from 'src/app/components/comment-item/comment-item.module';
/* #endregion */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCommentsPageRoutingModule,
    CommentItemModule
  ],
  declarations: [AllCommentsPage]
})
export class AllCommentsPageModule { }
