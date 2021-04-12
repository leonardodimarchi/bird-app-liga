import { Component } from '@angular/core';
import { FooterState } from 'src/app/models/enums/footer-state';
import { FooterService } from 'src/app/services/footer/footer.service';

// Classe inicial do projeto
@Component({
  selector: 'bird-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  constructor(
    private readonly footerService: FooterService,
  ) {
    this.footerService.getCurrentSelectedFooter$().subscribe(footerState=>{
      this.currentSelectedFooter = footerState;
    })
   }

   public currentSelectedFooter: FooterState = FooterState.CATEGORIES;

   public footerState: typeof FooterState = FooterState;

}
