import { Component } from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public userProfile = {
    name: "Jhon Wick",
    birthDate: moment().subtract(18, 'years').toDate(),
    email: "jhonwick@luminis.mx",
    phone: "5512988827"
  }

  public membresias = [{
    name: 'Membresía Psicólogos',
    period: "anual",
    since: moment().subtract(3, 'months').toDate(),
    nextBill: moment().add(1, 'month').toDate(),
    id: 1
  }];

  public paymentsHistory = [
    {
      item: 'Membresía Psicólogos',
      date: moment().subtract(1, 'month').toDate(),
      ammount: 1000,
      id: 1
    },
    {
      item: 'Membresía Psicólogos',
      date: moment().subtract(2, 'month').toDate(),
      ammount: 1000,
      id: 2
    },
    {
      item: 'Membresía Psicólogos',
      date: moment().subtract(3, 'month').toDate(),
      ammount: 1000,
      id: 3
    }
  ];

  public preguntas = [
    {
      question: '¿Qué hacer si este wireframe está muy padre?',
      taller: 'Ansiedad',
      id: 1
    },
    {
      question: '¿Qué hago si estoy obsesionado con Luminis?',
      taller: 'Verano',
      id: 2
    }
  ]

  constructor(private modalService: NgbModal) {}

  openUserInfoModal(userinfo: any) {
		this.modalService.open(userinfo)
	}

}
