import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePageContentAreaComponent } from '../components/home-page-content-area/home-page-content-area.component';
import { EulaModalComponent } from '../components/eula-modal/eula-modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, HomePageContentAreaComponent, EulaModalComponent]
})
export class HomePageModule {}
