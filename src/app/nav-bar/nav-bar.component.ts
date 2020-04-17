import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
   }
  switchLanguage(language: string){
    this.translate.use(language);
  }

  ngOnInit() {
  }

}