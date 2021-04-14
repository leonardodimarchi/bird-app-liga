import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  { path: '',
   component: MainPage,
   children: [
     
    { path: '', redirectTo: 'categories', pathMatch: 'full'},
    { path: 'categories', loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule) },
    { path: 'categories/:categoryId', loadChildren: () => import('./category-comments/category-comments.module').then( m => m.CategoryCommentsPageModule) },
    { path: 'all-comments', loadChildren: () => import('./all-comments/all-comments.module').then( m => m.AllCommentsPageModule) },
    { path: 'my-comments', loadChildren: () => import('./my-comments/my-comments.module').then( m => m.MyCommentsPageModule) },
    
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
