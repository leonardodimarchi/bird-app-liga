/* #region  Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
/* #endregion */

import { CreateCommentPageRoutingModule } from './create-comment-routing.module';

import { CreateCommentPage } from './create-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCommentPageRoutingModule
  ],
  declarations: [
    CreateCommentPage
  ]
})
export class CreateCommentPageModule { }
