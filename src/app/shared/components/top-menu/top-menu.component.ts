import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  menuopen: boolean = true
  menumobile: boolean = true 

  constructor(private modalService: NgbModal) {}
  
  openLoginModal(logincontent: any) {
		this.modalService.open(logincontent)
	
  }
  
  openRegisterModal(registercontent: any) {
		this.modalService.open(registercontent)
	}
}
