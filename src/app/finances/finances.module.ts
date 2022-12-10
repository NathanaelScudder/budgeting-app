import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancesPage } from './finances.page';

import { FinancesPageRoutingModule } from './finances-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FinancesPageRoutingModule
  ],
  declarations: [FinancesPage]
})
export class FinancesPageModule {}
