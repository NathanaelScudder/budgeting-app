import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakdownPage } from './breakdown.page';

const routes: Routes = [
  {
    path: '',
    component: BreakdownPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreakdownPageRoutingModule {}
