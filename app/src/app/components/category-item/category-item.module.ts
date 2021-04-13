/* #region  Imports */
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CategoryItemComponent } from './category-item.component';
/* #endregion */

@NgModule({
    imports: [
        IonicModule
    ],
    exports: [
        CategoryItemComponent,
    ],
    declarations: [
        CategoryItemComponent
    ],
    providers: [],
})
export class CategoryItemModule { }
