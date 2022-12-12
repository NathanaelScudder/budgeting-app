import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  predictedIncomeLabel:string = "Predicted Income";
  expendituresLabel:string = "Expenditures";
  pocketedSavingsLabel:string = "Pocketed Savings";

  

  constructor() {}

  

}
