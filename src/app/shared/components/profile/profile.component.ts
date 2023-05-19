import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  logout_response: any;
  updatePasswordForm: FormGroup;
  public loading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig
  ) {
    this.toastaConfig.theme = 'bootstrap';
    this.toastaConfig.position = 'top-right';
    this.createForms();
  }

  createForms() {
    this.updatePasswordForm = this.fb.group({
       password: ['', [Validators.required, Validators.minLength(12)]],
       password2: ['', [Validators.required, Validators.minLength(12), this.ComparePassword('password')]]
    });
  }

  ComparePassword(field_name): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value;
        const isSame = control.root.value[field_name] == input;
        return !isSame ? {'isSame': {isSame}}: null;
      };
  }

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

  doLogout() {
    /*this.loginService.fn_Logout({
    }).subscribe((res) => {
      this.login_response = res;
      if (res.status == 200) {
        localStorage.setItem("token", res.body.token);
        this.modalService.dismissAll();
        this.router.navigate(['perfil']);
      } else {
        console.log('error');
      }
    });*/
    localStorage.clear();
    this.router.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });
  }

  openUpdatePasswordModal(updatepasswordcontent: any) {
    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
    };
    this.modalService.open(updatepasswordcontent, ngbModalOptions);
  }

  doUpdatePassword(password: string) {
    this.modalService.dismissAll();
    this.showSuccess("Actualizar contraseña", "Contraseña actualizada.");
  }

  showError(title: string, message: string) {
      var toastOptions:ToastOptions = {
          title: title,
          msg: message,
          showClose: true,
          timeout: 5000,
          theme: 'bootstrap'
      };
      this.toastaService.error(toastOptions);
  }

  showSuccess(title: string, message: string) {
      var toastOptions:ToastOptions = {
          title: title,
          msg: message,
          showClose: true,
          timeout: 5000,
          theme: 'bootstrap'
      };
      this.toastaService.success(toastOptions);
  }
}
