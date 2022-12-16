import { Injectable } from '@angular/core';
import { FinancesEntry } from '../data/finances-entry';

import {List} from 'linked-list'

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private static MAX_NUM_ENTRIES:number = 999;
  private static allIncomeData:List = new List();
  private static allExpenseData:List = new List();

  constructor() { }
  
  public static getAllIncomeData():List
  {
    return FinancesService.allIncomeData;
  }

  public static getAllExpenseData():List
  {
    return FinancesService.allExpenseData;
  }

  public static getMaxNumEntries():number
  {
    return this.MAX_NUM_ENTRIES;
  }

  public static getNumIncomeEntries():number
  {
    return this.allIncomeData.size;
  }

  public static getNumExpenseEntries():number
  {
    return this.allExpenseData.size;
  }

  public static addEntry(entry:FinancesEntry):boolean
  {
    switch(entry.getType())
    {
      case FinancesEntry.EntryType.INCOME_ENTRY:
        if(FinancesService.getNumIncomeEntries() == FinancesService.MAX_NUM_ENTRIES) {return false;}
        this.allIncomeData.prepend(entry);
        return true;
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        if(FinancesService.getNumExpenseEntries() == FinancesService.MAX_NUM_ENTRIES) {return false;}
        this.allExpenseData.prepend(entry);
        return true;
      default:
        return false;
    }
  }

  public static removeEntry(entry:FinancesEntry):void
  {
    entry.detach();
  }

  public static buildDefaultIncomeEntry():FinancesEntry
  {
    return new FinancesEntry(`Income Entry`,
                              0,
                              FinancesEntry.EntryType.INCOME_ENTRY, 
                              FinancesEntry.EntryFactor.Once);
  }

  public static buildDefaultExpenseEntry():FinancesEntry
  {
    return new FinancesEntry(`Expense Entry`, 
                              0, 
                              FinancesEntry.EntryType.EXPENSE_ENTRY, 
                              FinancesEntry.EntryFactor.Once);
  }

  

  public static canAddIncomeEntry():boolean
  {
    return FinancesService.getNumIncomeEntries() < this.MAX_NUM_ENTRIES;
  }

  public static canAddExpenseEntry():boolean
  {
    return FinancesService.getNumExpenseEntries() < this.MAX_NUM_ENTRIES;
  }
}
