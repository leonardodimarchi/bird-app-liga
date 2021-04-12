/* #region  Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCommentsPageRoutingModule } from './my-comments-routing.module';

import { MyCommentsPage } from './my-comments.page';
import { CommentItemModule } from 'src/app/components/comment-item/comment-item.module';
/* #endregion */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCommentsPageRoutingModule,
    CommentItemModule
  ],
  declarations: [
    MyCommentsPage,
  ]
})
export class MyCommentsPageModule { }
