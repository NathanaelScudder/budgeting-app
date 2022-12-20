import { Component } from '@angular/core';
import { FinancesService } from '../services/finances.service';

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

  get isIndeterminate():boolean
  {
    return (FinancesService.getNumIncomeEntries() == 0) && (FinancesService.getNumExpenseEntries() == 0);
  }

  get totalIncomeValue():number
  {
    return FinancesService.getTotalIncomeValue();
  }

  get incomePercent():number
  {
    return FinancesService.getTotalIncomePercent();
  }

  get totalExpenseValue():number
  {
    return FinancesService.getTotalExpenseValue();
    
  }

  get expensePercent():number
  {
    return FinancesService.getTotalExpensePercent();
    
  }

  get pocketedValue():number
  {
    return FinancesService.getTotalIncomeValue() - FinancesService.getTotalExpenseValue();
  }

  get pocketedPercent():number
  {
    return FinancesService.getTotalIncomePercent(); 
  }

}
