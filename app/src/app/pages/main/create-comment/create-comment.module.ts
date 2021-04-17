/* #region  Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
/* #endregion */

import { CreateCommentPageRoutingModule } from './create-comment-routing.module';

import { CreateCommentPage } from './create-comment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateCommentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateCommentPage
  ]
})
export class CreateCommentPageModule { }
