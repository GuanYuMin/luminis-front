import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { MembresiaService } from 'app/shared/services/membresia.service';
import { LoginService } from 'app/shared/services/login.service';
import { UserService } from 'app/shared/services/user.service';
import { Router } from '@angular/router';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MembresiaViewModel } from 'app/shared/models/viewmodels/membresia.model'

interface Product {
  img: string,
  name: string,
  description: string,
  price: string,
}

@Component({
  selector: 'app-landing-products-section',
  templateUrl: './landing-products-section.component.html',
  styleUrls: ['./landing-products-section.component.scss']
})
export class LandingProductsSectionComponent implements OnInit {
  @ViewChild('logincontent') logincontent : TemplateRef<any>;
  membresias: MembresiaViewModel[];
  logged_in: boolean = false;
  login_response: any;
  register_response: any;
  public loading: boolean = false;
  loginForm: FormGroup;
  recoverForm: FormGroup;
  registerForm: FormGroup;
  modalReference: NgbModalRef;

  constructor(
  private membresiaService: MembresiaService,
  private router: Router,
  private modalService: NgbModal,
  private loginService: LoginService,
  private userService: UserService,
  private toastaService: ToastaService,
  private toastaConfig: ToastaConfig,
  private fb: FormBuilder
  ) {
    this.toastaConfig.theme = 'bootstrap';
    this.toastaConfig.position = 'top-right';
    this.createForms();
  }

  createForms() {
    this.loginForm = this.fb.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.recoverForm = this.fb.group({
       email_recover: ['', [Validators.required, Validators.email]]
    });

    this.registerForm = this.fb.group({
       nombres: ['', [Validators.required, Validators.minLength(2)]],
       apellidos: ['', [Validators.required, Validators.minLength(2)]],
       nombre_usuario: ['', [Validators.required, Validators.minLength(2)]],
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
    this.loadMembresias();
  }

  loadMembresias() {
    this.membresiaService.fn_ObtenerLista().subscribe((res) => {
      if (res.status == 200) {
        this.membresias = res.body;
      }
    }, (err) => {

    });
  }

  doPurchase(id: number) {
    let token = localStorage.getItem("token") || ""
    let user_id = localStorage.getItem("user_id") || ""
    let email = localStorage.getItem("email") || ""
    if (token.length != 0 && user_id.length != 0 && email.length != 0) {
      this.router.navigate([`confirmacion/${id}`]);
    } else {
      this.openLoginModal(this.logincontent);
      //this.router.navigate(['/home'])
    }
  }

  openLoginModal(logincontent: any) {
    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
    };
    this.modalService.open(logincontent, ngbModalOptions);
  }

  openRegisterModal(registercontent: any) {
    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
    };
    this.modalService.open(registercontent, ngbModalOptions);
  }

  openRecoverModal(restorepasswordcontent: any) {
    let ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
    };
    this.modalReference = this.modalService.open(restorepasswordcontent, ngbModalOptions);
  }

  doLogin(email: string, password: string) {
    this.loading = true;
    this.loginService.fn_Login({
       email: email,
       password: password
    }).subscribe((res) => {
      this.loading = false;
      this.login_response = res;
      if (res.status == 200) {
        localStorage.setItem("token", res.body.token);
        localStorage.setItem("user_id", res.body.user_id);
        localStorage.setItem("email", res.body.email);
        this.modalService.dismissAll();
        this.router.navigate(['/perfil'])
              .then(() => {
                window.location.reload();
              });
      } else {
        this.showError("Inicio de sesión", "Ha ocurrido un error");
      }
    }, (err) => {
      if (err.error.message) {
        this.showError("Inicio de sesión", err.error.message);
      } else {
        this.showError("Inicio de sesión", err.message);
      }
      this.loading = false;
    });
  }

  doRecover(email: string) {
    this.loading = true;
    this.userService.fn_RecoverPassword(email).subscribe((res) => {
      this.loading = false;
      if (res.status == 200) {
        this.modalReference.close();
        this.showSuccess("Recuperación de contraseña", res.body.message);
      } else {
        this.showError("Recuperación de contraseña", "Ha ocurrido un error");
      }
    }, (err) => {
      if (err.error.message) {
        this.showError("Recuperación de contraseña", err.error.message);
      } else {
        this.showError("Recuperación de contraseña", err.message);
      }
      this.loading = false;
    });
  }

  doRegister(nombres: string, apellidos: string, nombre_usuario: string, telefono: string, email: string, password: string, password2: string) {
    this.loading = true;
    this.userService.fn_CreateUser({
        email: email,
        password: password,
        username: nombre_usuario,
        name: nombres,
        midlename: "",
        lastname: apellidos,
        birthdate: "1984-11-27T16:09:01.057Z",
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
      //this.toastaService.info(toastOptions);
      //this.toastaService.success(toastOptions);
      //this.toastaService.wait(toastOptions);
      //this.toastaService.warning(toastOptions);
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
