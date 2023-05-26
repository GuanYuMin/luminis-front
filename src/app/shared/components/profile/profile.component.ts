import { Component } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { PhotoService } from 'app/shared/services/photo.service';
import { PerfilViewModel } from 'app/shared/models/viewmodels/perfil.model';
import { PhotoViewModel } from 'app/shared/models/viewmodels/photo.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  logout_response: any;
  updatePasswordForm: FormGroup;
  updateDataForm: FormGroup;
  public loading: boolean = false;
  profile: PerfilViewModel = {} as PerfilViewModel;
  photo: PhotoViewModel = {} as PhotoViewModel;
  avatars: PhotoViewModel[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig,
    private userService: UserService,
    private photoService: PhotoService,
    private datePipe: DatePipe
  ) {
    this.toastaConfig.theme = 'bootstrap';
    this.toastaConfig.position = 'top-right';
    this.createForms();
    this.getUserData();
  }

  createForms() {
    this.updatePasswordForm = this.fb.group({
       password: ['', [Validators.required, Validators.minLength(12)]],
       password2: ['', [Validators.required, Validators.minLength(12), this.ComparePassword('password')]]
    });

    this.updateDataForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      fecha_nacimiento: ['', [Validators.required]]
       /*nombre_usuario: ['', [Validators.required, Validators.minLength(2)]],*/


    });
  }

  ComparePassword(field_name): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value;
        const isSame = control.root.value[field_name] == input;
        return !isSame ? {'isSame': {isSame}}: null;
      };
  }

  getUserData() {
    //this.loading = true;
    this.userService.fn_GetUser(
       localStorage.getItem("user_id")
    ).subscribe((res) => {
      this.profile = res.body;
      this.getUserPhoto();
    }, (err) => {
      if (err.error.message) {
        this.showError("Perfil", err.error.message);
      } else {
        this.showError("Perfil", err.message);
      }
      //this.loading = false;
    });
  }

  getUserPhoto() {
    //this.loading = true;
    this.photoService.fn_GetPhoto(
       String(this.profile.photo_id)
    ).subscribe((res) => {
      //this.loading = false;
      this.photo = res.body;
    }, (err) => {
      if (err.error.message) {
        this.showError("Perfil", err.error.message);
      } else {
        this.showError("Perfil", err.message);
      }
      //this.loading = false;
    });
  }

  openUpdatePhotoModal(updatephotocontent: any) {
    this.avatars = [];
    this.profile.photo_id = this.photo.id;
    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false,
          modalDialogClass: 'update-photo-modal'
    };
    this.modalService.open(updatephotocontent, ngbModalOptions);

    this.loading = true;
    this.photoService.fn_GetPhotos().subscribe((res) => {
      this.loading = false;
      this.avatars = res.body;
    }, (err) => {
      if (err.error.message) {
        this.showError("Cambiar avatar", err.error.message);
      } else {
        this.showError("Cambiar avatar", err.message);
      }
      this.loading = false;
    });
  }

  updateAvatar() {
    this.loading = true;
    this.userService.fn_UpdateUser(
       this.profile, localStorage.getItem("user_id")
    ).subscribe((res) => {
      this.loading = false;
      this.modalService.dismissAll();
      this.getUserData();
      this.showSuccess("Cambiar avatar", res.message);
    }, (err) => {
      if (err.error.message) {
        this.showError("Cambiar avatar", err.error.message);
      } else {
        this.showError("Cambiar avatar", err.message);
      }
      this.loading = false;
    });
  }

  /*public userProfile = {
    name: "Jhon Wick",
    birthDate: moment().subtract(18, 'years').toDate(),
    email: "jhonwick@luminis.mx",
    phone: "5512988827"
  }*/

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

  openUserInfoModal(userinfo: any) {
    this.loadData();
    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
    };
    this.modalService.open(userinfo, ngbModalOptions);
  }

  loadData() {
    this.updateDataForm.patchValue({ email: this.profile.email });
    let n = this.profile.name + ' ' + this.profile.midlename;
    this.updateDataForm.patchValue({ nombres: n.trim() });
    this.updateDataForm.patchValue({ apellidos: this.profile.lastname });
    this.updateDataForm.patchValue({ telefono: this.profile.phone });
    var d = new Date(this.profile.birthdate);
    d.setDate(d.getDate() + 1);
    const birthYear =  Number(this.datePipe.transform(d, 'yyyy'));
    const birthMonth =  Number(this.datePipe.transform(d, 'MM'));
    const birthDay =  Number(this.datePipe.transform(d, 'dd'));
    this.updateDataForm.get('fecha_nacimiento').setValue({
      year: birthYear,
      month: birthMonth,
      day: birthDay
    });
  }

  doUpdateData(email: string, nombres: string, apellidos: string, telefono: string, fecha_nacimiento: string) {
    this.loading = true;
    var n = nombres.split(" ");
    var mn = "";
    if (n.length > 1) {
      for (var x = 1; x < n.length; x++) {
        mn = mn + " " + n[x];
      }
    }
    this.userService.fn_UpdateUser(
       {
        email: email,
        password: this.profile.password,
        username: this.profile.username,
        name: n[0],
        midlename: mn.trim(),
        lastname: apellidos,
        birthdate: fecha_nacimiento,
        phone: telefono,
        role_id: this.profile.role_id,
        photo_id: this.profile.photo_id,
        is_activate: this.profile.is_activate
        }, localStorage.getItem("user_id")
    ).subscribe((res) => {
      this.loading = false;
      this.modalService.dismissAll();
      this.getUserData();
      this.showSuccess("Editar Información", res.message);
    }, (err) => {
      if (err.error.message) {
        this.showError("Editar Información", err.error.message);
      } else {
        this.showError("Editar Información", err.message);
      }
      this.loading = false;
    });
  }
}
