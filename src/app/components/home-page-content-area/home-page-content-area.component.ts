import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-content-area',
  templateUrl: './home-page-content-area.component.html',
  styleUrls: ['./home-page-content-area.component.scss'],
})
export class HomePageContentAreaComponent implements OnInit {
  @Input() label:string;
  @Input() value:string;
  @Input() percentage:number;

  progressType:string;

  constructor() 
  {
    this.label = "N\\A";
    this.value = "0.00";
    this.percentage = 0.0;
    this.progressType = "indeterminate";
  }

  ngOnInit() {}

}
