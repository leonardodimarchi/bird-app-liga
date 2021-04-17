/* #region  Imports */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CreateCommentPayload } from './../../../models/payloads/create-comment.payload';
import { AvatarItem } from 'src/app/models/interfaces/avatar-item';
import { CommentService } from 'src/app/services/comment/comment.service';
import { LoadingController, ToastController } from '@ionic/angular';
/* #endregion */

@Component({
  selector: 'bird-create-comment',
  templateUrl: './create-comment.page.html',
  styleUrls: ['./create-comment.page.scss'],
})
export class CreateCommentPage {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly comment: CommentService,
    private readonly toast: ToastController,
    private readonly loading: LoadingController,
  ) {

    this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('categoryId')) || 0;

    if (this.categoryId == 0) {
      return void this.router.navigateByUrl('/main/categories');
    }

    //Forms
    this.formGroup = this.formBuilder.group({
      personName: ['', Validators.required],
      personAvatarIndex: [0, Validators.required],
      categoryId: [this.categoryId, Validators.required],
      message: ['', Validators.required],
    })
  }

  /* #region  public Properties */

  /**
   * Id da categoria, pego através da URL
   */
  public readonly categoryId: number;

  /**
   * Referenciando o formulario (Criação de comentario)
   */
  public formGroup: FormGroup;

  /**
   * Verificador de envio de formulario, para evitar repetições.
   */
  public isSendingForm: boolean;

  /**
   * lista para armazenar os avatares disponiveis
   */
  public readonly listAvatars: AvatarItem[] = [
    {
      personEmoji: 'assets/images/avatar_1.png',
      personColor: '#FFC542',
    },
    {
      personEmoji: 'assets/images/avatar_2.png',
      personColor: '#3DD598',
    },

    {
      personEmoji: 'assets/images/avatar_3.png',
      personColor: '#FF575F',
    },

    {
      personEmoji: 'assets/images/avatar_4.png',
      personColor: '#755FE2',
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

    const { personAvatarIndex, ...otherValues } = this.formGroup.getRawValue();

    const payload: CreateCommentPayload = {
      ...otherValues,
      personEmoji: this.listAvatars[personAvatarIndex].personEmoji,
      personColor: this.listAvatars[personAvatarIndex].personColor,
    }

    const loading = await this.loading.create({
      cssClass: 'bird-loading'
    });

    loading.present();
    const [isSuccess, result] = await this.comment.createComment(payload);
    loading.dismiss();

    await this.showMessage(result);

    this.isSendingForm = false;

    if (!isSuccess) {
      return; 
    }

    await this.router.navigateByUrl(`/main/categories/${this.categoryId}`);
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
