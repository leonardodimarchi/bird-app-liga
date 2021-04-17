import { Component, Input, OnInit } from '@angular/core';
import { CategoryProxy } from 'src/app/models/proxies/category.proxy';

@Component({
  selector: 'bird-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  /* #region Inputs */
  @Input()
  public content: CategoryProxy;
  /* #endregion */
}
