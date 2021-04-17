/* #region  Imports */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ColorItem } from 'src/app/models/interfaces/color-item';
import { CreateCategoryPayload } from 'src/app/models/payloads/create-category.payload';
import { CategoryService } from 'src/app/services/category/category.service';
/* #endregion */

@Component({
  selector: 'bird-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly category: CategoryService,
    private readonly toast: ToastController,
    private readonly loading: LoadingController,
    private readonly router: Router,
  ) {

    //Forms
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      colorItemIndex: [0, Validators.required]
    })
  }

  /* #region  Public Properties */
  /**
  * Referenciando o formulario (Criação de categoria)
  */
  public formGroup: FormGroup;

  /**
  * Verificador de envio de formulario, para evitar repetições.
  */
  public isSendingForm: boolean;

  /**
   * lista para armazenar as cores disponiveis de categoria
   */
  public readonly listColors: ColorItem[] = [
    {
      color: '#FFC542',
    },
    {
      color: '#3DD598',
    },

    {
      color: '#FF575F',
    },

    {
      color: '#755FE2',
    },
  ]
  /* #endregion */

  /* #region  Public Methods */
  /**
   * Método que é executado quando o formulario é enviado
   */
  public async onSubmit(): Promise<void> {
    if (this.isSendingForm) {
      return;
    }

    this.isSendingForm = true;

    const { colorItemIndex, ...otherValues } = this.formGroup.getRawValue();

    const payload: CreateCategoryPayload = {
      ...otherValues,
      color: this.listColors[colorItemIndex].color
    }
    console.log(payload);

    const loading = await this.loading.create({
      cssClass: "bird-loading"
    });

    loading.present();
    const [isSuccess, result] = await this.category.createCategory(payload);
    loading.dismiss();

    await this.showMessage(result);

    this.isSendingForm = false;

    if (!isSuccess) {
      return;
    }

    await this.router.navigateByUrl("/main/categories/");
  }
  /* #endregion */

  /* #region Private Methods */
  /**
   * Exibe a mensagem de erro
   * 
   * @param message Mensagem
   */
  private async showMessage(message: string): Promise<void> {
    const toast = await this.toast.create({
      message,
      duration: 3_000,
      position: 'top',
    });

    await toast.present();
  }
  /* #endregion */

}
