import { Component, OnInit, Input } from '@angular/core';
import { FinancesService } from 'src/app/services/finances.service';
import { FinancesEntry } from 'src/app/data/finances-entry';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-finance-entry-card',
  templateUrl: './finance-entry-card.component.html',
  styleUrls: ['./finance-entry-card.component.scss'],
})
export class FinanceEntryCardComponent implements OnInit {
  @Input() entryData!:FinancesEntry;

  editModalIsOpen:boolean = false;

  constructor(private alertController:AlertController) { }

  ngOnInit() {}

  presentEditModal()
  {
    this.editModalIsOpen = true;
  }

  onEdit(newEntryData:FinancesEntry):void
  {
    FinancesService.editEntry(this.entryData, newEntryData);
  }

  // Adapted from https://ionicframework.com/docs/api/alert
  async presentEntryDeletionAlert() 
  {
    let entryString = this.entryData.toString();

    const alert = await this.alertController.create({
      header: 'Confirm Entry Deletion',
      subHeader: "This action cannot be undone!",
      message: entryString,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          role: 'confirm'
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

    if(role == 'confirm')
    {
      FinancesService.removeEntry(this.entryData);
    }
  }
}
