import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/shared/services/user.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-landing-third-section',
  templateUrl: './landing-third-section.component.html',
  styleUrls: ['./landing-third-section.component.scss']
})
export class LandingThirdSectionComponent implements OnInit {
  logged_in: boolean = false;
  register_response: any;
  public loading: boolean = false;
  registerForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig,
    private fb: FormBuilder
    ) {
        this.toastaConfig.theme = 'bootstrap';
        this.toastaConfig.position = 'top-right';
        this.createForm();
    }

    createForm() {
      this.registerForm = this.fb.group({
         nombres: ['', [Validators.required, Validators.minLength(2)]],
         apellidos: ['', [Validators.required, Validators.minLength(2)]],
         nombre_usuario: ['', [Validators.required, Validators.minLength(2)]],
         fecha_nacimiento: ['', [Validators.required]],
         telefono: ['', [Validators.required, Validators.minLength(10)]],
         email_registro: ['', [Validators.required, Validators.email]],
         password_registro: ['', [Validators.required, Validators.minLength(12)]],
         password_registro2: ['', [Validators.required, Validators.minLength(12), this.ComparePassword('password_registro')]]
      });
    }

    ComparePassword(field_name): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          const input = control.value;
          const isSame = control.root.value[field_name] == input;
          return !isSame ? {'isSame': {isSame}}: null;
        };
    }

  ngOnInit(): void {
    let token = localStorage.getItem("token") || ""
    if (token.length > 0) {
      this.logged_in = true;
    }
  }

  openRegisterModal(registercontent: any) {
    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
    };
    this.modalService.open(registercontent, ngbModalOptions);
  }

  doRegister(nombres: string, apellidos: string, nombre_usuario: string, fecha_nacimiento: string, telefono: string, email: string, password: string, password2: string) {
    var n = nombres.split(" ");
    var mn = "";
    if (n.length > 1) {
      for (var x = 1; x < n.length; x++) {
        mn = mn + " " + n[x];
      }
    }
    this.loading = true;
    this.userService.fn_CreateUser({
        email: email,
        password: password,
        username: nombre_usuario,
        name: n[0],
        midlename: mn.trim(),
        lastname: apellidos,
        birthdate: fecha_nacimiento.split("-")[2] + "/" + fecha_nacimiento.split("-")[1] + "/" + fecha_nacimiento.split("-")[0],
        phone: telefono,
        role_id: 2,
        photo_id: 1
    }).subscribe((res) => {
      this.loading = false;
      if (res.status == 200) {
        this.modalService.dismissAll();
        this.showSuccess("Registro", res.message);
      } else {
        this.showError("Registro", "Ha ocurrido un error");
      }
    }, (err) => {
      if (err.error.message) {
        this.showError("Registro", err.error.message);
      } else {
        this.showError("Registro", err.message);
      }
      this.loading = false;
    });
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

