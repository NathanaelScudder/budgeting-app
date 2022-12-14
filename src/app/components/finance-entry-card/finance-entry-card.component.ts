import { Component, OnInit, Input } from '@angular/core';
import { FinancesService } from 'src/app/services/finances.service';
import { FinancesEntry } from 'src/app/data/finances-entry';

@Component({
  selector: 'app-finance-entry-card',
  templateUrl: './finance-entry-card.component.html',
  styleUrls: ['./finance-entry-card.component.scss'],
})
export class FinanceEntryCardComponent implements OnInit {
  @Input() entryData:FinancesEntry = new FinancesEntry(`PLACEHOLDER`,
                                                        0,
                                                        FinancesEntry.EntryType.INCOME_ENTRY, 
                                                        FinancesEntry.EntryFactor.Once);

  constructor(private financesService:FinancesService) { }

  ngOnInit() {}

  onEdit():void
  {
    console.log("onEdit");
  }

  onDelete():void
  {
    console.log("onDelete");
  }

}
