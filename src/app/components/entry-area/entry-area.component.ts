import { Component, OnInit, Input } from '@angular/core';
import { FinancesEntry } from 'src/app/data/finances-entry';

@Component({
  selector: 'app-entry-area',
  templateUrl: './entry-area.component.html',
  styleUrls: ['./entry-area.component.scss'],
})
export class EntryAreaComponent implements OnInit {
  @Input() entries:FinancesEntry[] = [];

  constructor() { }

  ngOnInit() {}

}
