import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AlertsService} from "./shared/services/alerts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'luminis_client';

  constructor(private modalService: NgbModal,private alerts: AlertsService) {}

  testSucc(){
    this.alerts.successAlert('La compra fue exitosa');
  }

  testWarning(){
    this.alerts.warningAlert('Warning');
  }

  testError(){
    this.alerts.errorAlert('Error');
  }
}
