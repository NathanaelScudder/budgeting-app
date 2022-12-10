import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinancesPage } from './finances.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FinancesPageRoutingModule } from './finances-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FinancesPageRoutingModule
  ],
  declarations: [FinancesPage]
})
export class FinancesPageModule {}
