import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-content-area',
  templateUrl: './home-page-content-area.component.html',
  styleUrls: ['./home-page-content-area.component.scss'],
})
export class HomePageContentAreaComponent implements OnInit {
  private static MODE_INCOME:number = 0;
  private static MODE_EXPENDITURE:number = 1;
  private static MODE_POCKETED:number = 2;
  private static INDETERMINATE:string = "indeterminate";
  private static DETERMINATE:string = "determinate";

  @Input() label!:string;
  @Input() value!:number;
  @Input() percentage!:number;
  @Input() isIndeterminate:boolean = false;

  @Input() mode!: 0 | 1 | 2;

  constructor() {}

  ngOnInit() {}

  get type():string
  {
    return (this.isIndeterminate) ? HomePageContentAreaComponent.INDETERMINATE : HomePageContentAreaComponent.DETERMINATE;
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
}
