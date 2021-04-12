import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllCommentsPageRoutingModule } from './all-comments-routing.module';

import { AllCommentsPage } from './all-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllCommentsPageRoutingModule
  ],
  declarations: [AllCommentsPage]
})
export class AllCommentsPageModule {}
