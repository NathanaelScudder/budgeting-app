import { Component } from '@angular/core';
import { FinancesEntry } from '../data/finances-entry';

@Component({
  selector: 'app-finances',
  templateUrl: 'finances.page.html',
  styleUrls: ['finances.page.scss']
})
export class FinancesPage {

  constructor() {}

  get incomeType():FinancesEntry.EntryType
  {
    return FinancesEntry.EntryType.INCOME_ENTRY;
  }

  get expenseType():FinancesEntry.EntryType
  {
    return FinancesEntry.EntryType.EXPENSE_ENTRY;
  }

}
