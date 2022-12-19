import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FinancesEntry } from 'src/app/data/finances-entry';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry-modal',
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss'],
})
export class EntryModalComponent implements OnInit {
  ENTRY_NAME_MAX_LENGTH:number = 20;
  VALUE_DIGIT_LIMIT:number = 12;
  VALUE_DECIMAL_LIMIT:number = 2;
  
  @Input() isOpen:boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  @Input() entryData!:FinancesEntry;
  @Input() modalHeader:string = "Entry";

  @Output() onEntrySubmit = new EventEmitter<FinancesEntry>();

  entryForm!:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit() 
  {
    this.entryForm = new FormGroup({
      entryName: new FormControl(this.entryData.getLabel(), [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(this.ENTRY_NAME_MAX_LENGTH)
      ]),

      entryValue: new FormControl(this.entryData.getValue(), [
        Validators.required,
        this.validateValueInput()
      ]),

      frequency: new FormControl(this.entryData.getFactor(), [
        Validators.required
      ])
    });

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

  validateValueInput(): ValidatorFn
  {
    return (control: AbstractControl<number>): ValidationErrors | null => {
      const inputValueString:string = control.value.toString();
      let inputValueParts:string[] = inputValueString.split(".");
      let rawInputValue:number = control.value;

      return (isNaN(rawInputValue) || (inputValueString.charAt(0) == '0') ||
             (inputValueParts.length == 2 && inputValueParts[1].length > this.VALUE_DECIMAL_LIMIT) ||
             (rawInputValue > Math.pow(10, this.VALUE_DIGIT_LIMIT) || rawInputValue < 1))
        ? {forbiddenValue: {value: control.value}} : null;
    };
  }
}
