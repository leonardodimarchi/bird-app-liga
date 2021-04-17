import { IonicModule } from '@ionic/angular';
/* #region  Imports */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CommentItemComponent } from './comment-item.component';
/* #endregion */

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CommentItemComponent
  ],
  declarations: [
    CommentItemComponent,
  ]
})
export class CommentItemModule { }