import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCommentsPage } from './my-comments.page';

const routes: Routes = [
  {
    path: '',
    component: MyCommentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCommentsPageRoutingModule {}
