import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'luminis_client';

  constructor(private modalService: NgbModal) {}

  openLoginModal(logincontent: any) {
		this.modalService.open(logincontent)
	}
  openRegisterModal(registercontent: any) {
		this.modalService.open(registercontent)
	}
  openRestorePasswordModal(restorepasswordcontent: any) {
		this.modalService.open(restorepasswordcontent)
	}
  openUpdatePasswordModal(updatepasswordcontent: any) {
		this.modalService.open(updatepasswordcontent)
	}
}
