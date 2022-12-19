import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-content-area',
  templateUrl: './home-page-content-area.component.html',
  styleUrls: ['./home-page-content-area.component.scss'],
})
export class HomePageContentAreaComponent implements OnInit {
  public static MODE_INCOME:number = 0;
  public static MODE_EXPENDITURE:number = 1;
  public static MODE_POCKETED:number = 2;

  @Input() label:string;
  @Input() value:number;
  @Input() percentage:number;

  @Input() mode: 0 | 1 | 2;

  constructor() 
  {
    this.label = "N\\A";
    this.value = 0;
    this.percentage = 0.0;
    this.mode = 0;
  }

  get incomeMode():number
  {
    return HomePageContentAreaComponent.MODE_INCOME;
  }

  get expenditureMode():number
  {
    return HomePageContentAreaComponent.MODE_EXPENDITURE;
  }

  get pocketedMode():number
  {
    return HomePageContentAreaComponent.MODE_POCKETED;
  }

  ngOnInit() {}

}
