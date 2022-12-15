import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FinancesEntry } from 'src/app/data/finances-entry';
import { OverlayEventDetail } from '@ionic/core';
import { SelectChangeEventDetail } from '@ionic/core';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss'],
})
export class EntryModalComponent implements OnInit {
  @Input() isOpen:boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() thisEntry!:FinancesEntry;
  @Input() isEditing!:boolean;
  @Input() entryType!:FinancesEntry.EntryType;

  entryName:string = "";
  frequency:FinancesEntry.EntryFactor = FinancesEntry.EntryFactor.Once;
  value:string = "";

  constructor() { }

  ngOnInit() {}

  cancel() 
  {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  confirm() 
  {
    if(this.isEditing)
      {
        this.thisEntry.setLabel(this.entryName);
        this.thisEntry.setFactor(this.frequency);
        this.thisEntry.setValue(parseFloat(this.value));
      }
      else
      {
        switch(this.entryType)
        {
          case FinancesEntry.EntryType.INCOME_ENTRY:
            FinancesService.addEntry(new FinancesEntry(this.entryName, parseFloat(this.value), FinancesEntry.EntryType.INCOME_ENTRY, this.frequency));
            break;
          case FinancesEntry.EntryType.EXPENSE_ENTRY:
            FinancesService.addEntry(new FinancesEntry(this.entryName, parseFloat(this.value), FinancesEntry.EntryType.EXPENSE_ENTRY, this.frequency));
        }
      }

    this.cancel();
  }

  setFrequency(event: Event)
  {
    const ev = event as CustomEvent<SelectChangeEventDetail>;

    this.frequency = ev.detail.value;
  }
}
