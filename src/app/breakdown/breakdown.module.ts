import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreakdownPage } from './breakdown.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { BreakdownPageRoutingModule } from './breakdown-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    BreakdownPageRoutingModule
  ],
  declarations: [BreakdownPage]
})
export class BreakdownPageModule {}
