import { Injectable } from '@angular/core';
import { FinancesEntry } from '../data/finances-entry';

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private static MAX_NUM_ENTRIES:number = 50;
  private static allIncomeData:FinancesEntry[] = [];
  private static allExpenseData:FinancesEntry[] = [];

  constructor() { }
  
  public static getMaxNumEntries():number
  {
    return this.MAX_NUM_ENTRIES;
  }

  public static getNumIncomeEntries():number
  {
    return this.allIncomeData.length;
  }

  public static getNumExpenseEntries():number
  {
    return this.allExpenseData.length;
  }

  public static addEntry(entry:FinancesEntry):boolean
  {
    switch(entry.getType())
    {
      case FinancesEntry.EntryType.INCOME_ENTRY:
        if(FinancesService.getNumIncomeEntries() == FinancesService.MAX_NUM_ENTRIES) {return false;}
        this.allIncomeData.unshift(entry);
        return true;
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        if(FinancesService.getNumExpenseEntries() == FinancesService.MAX_NUM_ENTRIES) {return false;}
        this.allExpenseData.unshift(entry);
        return true;
      default:
        return false;
    }
  }

  public static removeEntry(index:number, type:FinancesEntry.EntryType):void
  {
    switch(type)
    {
      case FinancesEntry.EntryType.INCOME_ENTRY:
        FinancesService.allIncomeData = FinancesService.allIncomeData.filter((value, i, arr) => {
          return i != index;
        });
        break;
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        FinancesService.allExpenseData = FinancesService.allExpenseData.filter((value, i, arr) => {
          return i != index;
        });
        break;
      default:
        return;
    }
  }

  public static addDefaultIncomeEntry():boolean
  {
    return FinancesService.addEntry(
      new FinancesEntry(`Income #${FinancesService.allIncomeData.length}`,
                        0,
                        FinancesEntry.EntryType.INCOME_ENTRY, 
                        FinancesEntry.EntryFactor.Once));
  }

  public static addDefaultExpenseEntry():boolean
  {
    return FinancesService.addEntry(
      new FinancesEntry(`Expense #${FinancesService.allExpenseData.length}`, 
                        0, 
                        FinancesEntry.EntryType.EXPENSE_ENTRY, 
                        FinancesEntry.EntryFactor.Once));
  }
}
