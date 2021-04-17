/* #region  Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateCommentPage } from './create-comment.page';
/* #endregion */

const routes: Routes = [
  {
    path: '',
    component: CreateCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCommentPageRoutingModule { }
