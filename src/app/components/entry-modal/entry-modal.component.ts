import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FinancesEntry } from 'src/app/data/finances-entry';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss'],
})
export class EntryModalComponent implements OnInit {
  @Input() isOpen:boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() entryData!:FinancesEntry;
  @Input() modalHeader:string = "Entry";

  @Output() onEntrySubmit = new EventEmitter<FinancesEntry>();

  entryForm = this.fb.group({
    entryName: [''],
    entryValue: [''],
    frequency: [0],
  });

  constructor(private fb:FormBuilder) { }

  ngOnInit() 
  {
    this.refreshModal();
  }

  get financeFactors():(string | FinancesEntry.EntryFactor)[]
  {
    return Object.values(FinancesEntry.EntryFactor).slice(0, 4);
  }

  factorString(index:number):string
  {
    return FinancesEntry.EntryFactor[index];
  }

  cancel():void
  {
    this.refreshModal();

    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  confirm():void
  {
    var entryName = this.entryForm.get("entryName");
    var entryValue = this.entryForm.get("entryValue");
    var frequency = this.entryForm.get("frequency");

    if(entryName != null && entryValue != null && frequency != null)
    {
      var entryNameData = entryName.value;
      var entryValueData = entryValue.value;
      var frequencyData = frequency.value;

      if(entryNameData != null && entryValueData != null && frequencyData != null)
      {
        this.onEntrySubmit.emit(
          new FinancesEntry(entryNameData, 
                            parseFloat(entryValueData), 
                            this.entryData.getType(), 
                            frequencyData));
      }
    }

    this.cancel();
  }

  refreshModal():void
  {
    this.entryForm.get("entryName")?.setValue(`${this.entryData.getLabel()}`);
    this.entryForm.get("entryValue")?.setValue(`${this.entryData.getValue()}`);
    this.entryForm.get("frequency")?.setValue(this.entryData.getFactor());
  }
}
