import { Component, OnInit, Input } from '@angular/core';
import { FinancesEntry } from 'src/app/data/finances-entry';

import {List} from 'linked-list'

@Component({
  selector: 'app-entry-area',
  templateUrl: './entry-area.component.html',
  styleUrls: ['./entry-area.component.scss'],
})
export class EntryAreaComponent implements OnInit {
  @Input() entries:List = new List();

  constructor() { }

  ngOnInit() {}

  get entryArray():FinancesEntry[]
  {
    return this.entries.toArray() as FinancesEntry[];
  }

}
