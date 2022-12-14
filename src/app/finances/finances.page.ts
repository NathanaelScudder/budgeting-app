import { Component } from '@angular/core';
import { FinancesEntry } from '../data/finances-entry';
import { FinancesService } from '../services/finances.service';

@Component({
  selector: 'app-finances',
  templateUrl: 'finances.page.html',
  styleUrls: ['finances.page.scss']
})
export class FinancesPage {

  constructor(private financesService:FinancesService) {}

  get incomeType():FinancesEntry.EntryType
  {
    return FinancesEntry.EntryType.INCOME_ENTRY;
  }

  get expenseType():FinancesEntry.EntryType
  {
    return FinancesEntry.EntryType.EXPENSE_ENTRY;
  }

  get allIncomeEntries():FinancesEntry[]
  {
    return FinancesService.allIncomeData;
  }

  get allExpenseEntries():FinancesEntry[]
  {
    return FinancesService.allExpenseData;
  }

}
