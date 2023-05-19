import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/services/login.service';
import { UserService } from 'app/shared/services/user.service';

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

  constructor(
  private modalService: NgbModal,
  private router: Router,
  private loginService: LoginService,
  private userService: UserService
  ) { }

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
        console.log('error');
      }
    }, (err) => {
      console.log('error2');
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
	    console.log(res);
	    if (res.status == 200) {
	      this.modalService.dismissAll();
        console.log('ok');
      } else {
        console.log('error');
      }
    }, (err) => {
      console.log('error2');
      this.loading = false;
    });
	}
}
