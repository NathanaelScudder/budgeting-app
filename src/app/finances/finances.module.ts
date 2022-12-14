import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancesPage } from './finances.page';

import { FinancesPageRoutingModule } from './finances-routing.module';
import { EntryHeaderComponent } from '../components/entry-header/entry-header.component';
import { EntryAreaComponent } from '../components/entry-area/entry-area.component';
import { FinanceEntryCardComponent } from '../components/finance-entry-card/finance-entry-card.component';
import { EntryModalComponent } from '../components/entry-modal/entry-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FinancesPageRoutingModule
  ],
  declarations: [
    FinancesPage,
    EntryAreaComponent, 
    EntryHeaderComponent, 
    FinanceEntryCardComponent,
    EntryModalComponent
  ]
})
export class FinancesPageModule {}
