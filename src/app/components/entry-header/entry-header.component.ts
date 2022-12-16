import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FinancesEntry } from 'src/app/data/finances-entry';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-entry-header',
  templateUrl: './entry-header.component.html',
  styleUrls: ['./entry-header.component.scss'],
})
export class EntryHeaderComponent implements OnInit {
  @Input() type:FinancesEntry.EntryType = FinancesEntry.EntryType.INCOME_ENTRY;

  inputModalIsOpen:boolean = false;

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  get headerLabel():string
  {
    switch(this.type)
    {
      case FinancesEntry.EntryType.INCOME_ENTRY:
        return "Income Entries";
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        return "Expense Entries";
      default:
        return "Unknown";
    }
  }

  get entryLimitString():string
  {
    let numEntries:number = 0;

    switch(this.type)
    {
      case FinancesEntry.EntryType.INCOME_ENTRY:
        numEntries = FinancesService.getNumIncomeEntries();
        break;
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        numEntries = FinancesService.getNumExpenseEntries();
        break;
      default:
        numEntries = 0;
    }

    return `${numEntries}/${FinancesService.getMaxNumEntries()}`;
  }

  addNewEntry():void
  {
    switch(this.type)
    {
      case FinancesEntry.EntryType.INCOME_ENTRY:
        //var hadEntrySpace:boolean = FinancesService.addDefaultIncomeEntry(); 
        if(!FinancesService.canAddIncomeEntry()) 
        {
          this.presentToast("Cannot exceed income entry limit!", 1500, "middle");
          return;
        } 
        break;
      case FinancesEntry.EntryType.EXPENSE_ENTRY:
        //var hadEntrySpace:boolean = FinancesService.addDefaultExpenseEntry(); 
        if(!FinancesService.canAddExpenseEntry()) 
        {
          this.presentToast("Cannot exceed expense entry limit!", 1500, "middle");
          return;
        } 
        break;
      default:
        return;
    }

    this.inputModalIsOpen = true;
  }

  newEntrySubmitted(entry: FinancesEntry)
  {
    FinancesService.addEntry(entry);
  }

  // Adapted from https://ionicframework.com/docs/api/toast
  async presentToast(message:string, duration:number, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position
    });

    await toast.present();
  }
}
