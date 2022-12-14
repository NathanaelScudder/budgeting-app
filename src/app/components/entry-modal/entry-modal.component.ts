import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FinancesEntry } from 'src/app/data/finances-entry';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { SelectChangeEventDetail } from '@ionic/core';
import { FinancesService } from 'src/app/services/finances.service';

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss'],
})
export class EntryModalComponent implements OnInit {
  @Input() triggerButtonID!:string;
  @Input() thisEntry!:FinancesEntry;
  @Input() isEditing!:boolean;
  @Input() entryType!:FinancesEntry.EntryType;
  @ViewChild(IonModal) modal!: IonModal;

  entryName:string = "";
  frequency:FinancesEntry.EntryFactor = FinancesEntry.EntryFactor.Once;
  value:number = 0;

  constructor() { }

  ngOnInit() {}

  cancel() 
  {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() 
  {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) 
  {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      if(this.isEditing)
      {
        this.thisEntry.setLabel(this.entryName);
        this.thisEntry.setFactor(this.frequency);
        this.thisEntry.setValue(this.value);
      }
      else
      {
        switch(this.entryType)
        {
          case FinancesEntry.EntryType.INCOME_ENTRY:
            FinancesService.addEntry(new FinancesEntry(this.entryName, this.value, FinancesEntry.EntryType.INCOME_ENTRY, this.frequency));
            break;
          case FinancesEntry.EntryType.EXPENSE_ENTRY:
            FinancesService.addEntry(new FinancesEntry(this.entryName, this.value, FinancesEntry.EntryType.EXPENSE_ENTRY, this.frequency));
        }
      }
    }
  }

  setFrequency(event: Event)
  {
    const ev = event as CustomEvent<SelectChangeEventDetail>;

    this.frequency = ev.detail.value;
  }
}
