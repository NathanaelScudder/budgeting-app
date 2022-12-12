import { Component, OnInit } from '@angular/core';
import { CheckboxCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-eula-modal',
  templateUrl: './eula-modal.component.html',
  styleUrls: ['./eula-modal.component.scss'],
})
export class EulaModalComponent implements OnInit {
  canDismiss:boolean = false;
  presentingElement:any = null;
  isModalOpen:boolean = true;

  constructor() { }

  ngOnInit()
  {
    this.presentingElement = document.querySelector('.ion-page');
  }

  onTermsChanged(event: Event) 
  {
    const ev = event as CheckboxCustomEvent;
    this.canDismiss = ev.detail.checked;
  }

  setOpen(isOpen: boolean) 
  {
    this.isModalOpen = isOpen;
  }

}
