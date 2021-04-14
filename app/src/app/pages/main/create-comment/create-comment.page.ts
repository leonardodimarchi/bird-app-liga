import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  /* #region  Private Properties */
  private readonly categoryId: number;
  /* #endregion */

}
