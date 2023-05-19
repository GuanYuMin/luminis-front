import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { UserService } from 'app/shared/services/user.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  menuopen: boolean = true
  menumobile: boolean = true
  login_response: any
  register_response: any
  logged_in: boolean = false
  public loading: boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
  private modalService: NgbModal,
  private router: Router,
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
       password: ['', [Validators.required, Validators.minLength(12)]]
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
    let token = localStorage.getItem("token") || ""
    if (token.length > 0) {
      this.logged_in = true;
    }
  }

  openLoginModal(logincontent: any) {
		this.modalService.open(logincontent)

  }

  openRegisterModal(registercontent: any) {
		this.modalService.open(registercontent)
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
