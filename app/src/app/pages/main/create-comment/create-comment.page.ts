/* #region  Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarItem } from 'src/app/models/interfaces/avatar-item';
/* #endregion */

@Component({
  selector: 'bird-create-comment',
  templateUrl: './create-comment.page.html',
  styleUrls: ['./create-comment.page.scss'],
})
export class CreateCommentPage implements OnInit {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {

    this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('categoryId')) || 0;

    if (this.categoryId == 0) {
      return void this.router.navigateByUrl('/main/categories');
    }

    console.log(this.categoryId);
  }

  ngOnInit() {
  }

  /* #region  public Properties */
  public readonly categoryId: number;
  /* #endregion */

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

}
