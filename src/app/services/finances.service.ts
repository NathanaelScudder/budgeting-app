import { Injectable } from '@angular/core';
import { FinancesEntry } from '../data/finances-entry';

import {List} from 'linked-list'

@Injectable({
  providedIn: 'root'
})
export class FinancesService {
  private static MAX_NUM_ENTRIES:number = 999;
  private static WORK_DAYS_IN_WEEK:number = 5;
  private static WORK_WEEKS_IN_MONTH:number = 4;

  private static allIncomeData:List = new List();
  private static allExpenseData:List = new List();

  private static totalIncomeValue:number = 0;
  private static totalExpenseValue:number = 0;

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
        FinancesService.addEntryValue(entry);
        return true;
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        if(FinancesService.getNumExpenseEntries() == FinancesService.MAX_NUM_ENTRIES) {return false;}
        this.allExpenseData.prepend(entry);
        FinancesService.addEntryValue(entry);
        return true;
      default:
        return false;
    }
  }

  public static removeEntry(entry:FinancesEntry):void
  {
    entry.detach();

    FinancesService.removeEntryValue(entry);
  }

  public static editEntry(oldEntryData:FinancesEntry, newEntryData:FinancesEntry):void
  {
    FinancesService.removeEntryValue(oldEntryData);
    oldEntryData.clone(newEntryData);
    FinancesService.addEntryValue(oldEntryData);
  }

  public static buildDefaultIncomeEntry():FinancesEntry
  {
    return new FinancesEntry(`Income Entry`,
                              1,
                              FinancesEntry.EntryType.INCOME_ENTRY, 
                              FinancesEntry.EntryFactor.Once);
  }

  public static buildDefaultExpenseEntry():FinancesEntry
  {
    return new FinancesEntry(`Expense Entry`, 
                              1, 
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

  public static getTotalIncomeValue():number
  {
    return FinancesService.totalIncomeValue;
  }

  public static getTotalExpenseValue():number
  {
    return FinancesService.totalExpenseValue;
  }

  public static getTotalIncomePercent():number
  {
    if((FinancesService.totalIncomeValue + FinancesService.totalExpenseValue) == 0)
    {
      return 0;
    }

    return FinancesService.totalIncomeValue / (FinancesService.totalIncomeValue + FinancesService.totalExpenseValue);
  }

  public static getTotalExpensePercent():number
  {
    if(FinancesService.totalIncomeValue == 0)
    {
      return 0;
    }

    return FinancesService.totalExpenseValue / FinancesService.totalIncomeValue;
  }

  private static addEntryValue(entry: FinancesEntry):void
  {
    let value:number = FinancesService.normalizeEntryValue(entry);
    FinancesService.applyEntryValue(entry.getType(), value);
  }

  private static removeEntryValue(entry: FinancesEntry):void
  {
    let value:number = -FinancesService.normalizeEntryValue(entry);
    FinancesService.applyEntryValue(entry.getType(), value);
  }

  private static applyEntryValue(type:FinancesEntry.EntryType, value:number):void
  {
    switch(type)
    {
      case FinancesEntry.EntryType.INCOME_ENTRY:
        FinancesService.totalIncomeValue += value;
        break;
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        FinancesService.totalExpenseValue += value;
    }

    console.log(`Income value: ${FinancesService.getTotalIncomeValue()}`);
    console.log(`Income percentage: ${FinancesService.getTotalIncomePercent()}`);
    console.log(`Expense value: ${FinancesService.getTotalExpenseValue()}`);
    console.log(`Expense percentage: ${FinancesService.getTotalExpensePercent()}`);
  }

  private static normalizeEntryValue(entry: FinancesEntry):number
  {
    switch(entry.getFactor())
    {
        case FinancesEntry.EntryFactor.Once:
        case FinancesEntry.EntryFactor.Monthly:
          return entry.getValue() / FinancesService.WORK_WEEKS_IN_MONTH;
        case FinancesEntry.EntryFactor.Daily:
          return entry.getValue() * FinancesService.WORK_DAYS_IN_WEEK;
        case FinancesEntry.EntryFactor.Weekly:
          return entry.getValue();
    }
  }

}
