import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MembresiaService } from 'app/shared/services/membresia.service';
import { MembresiaViewModel } from 'app/shared/models/viewmodels/membresia.model';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PaymentService } from 'app/shared/services/payment.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  confirmar = false;
  public loading: boolean = false;
  logged_in: boolean = false;
  descuento: number = 0;
  datos: MembresiaViewModel = {} as MembresiaViewModel;
  id: string = "";
  paymentForm: FormGroup;
  name: string = "";
  card_number: string = "";
  month: string = "";
  year: string = "";
  cvv: string = "";
  folio: string = "";
  operation_date: string = "";
  amount: number = 0;
  type: string = "";

  constructor(
    private modalService: NgbModal,
    private membresiaService: MembresiaService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastaService: ToastaService,
    private toastaConfig: ToastaConfig,
    private fb: FormBuilder
    ) {
      this.toastaConfig.theme = 'bootstrap';
      this.toastaConfig.position = 'top-right';
      this.createForms();
      this.activatedRoute.params.subscribe(params => {
        this.id = params['id'];
        /*this.blogService.fn_ObtenerBlog(id).subscribe((res) => {
          if (res.status == 200) {
            this.blog = res.body;
            if (this.blog.author != null) {
              this.blog.author = 'POR ' + this.blog.author.toUpperCase();
            }
            this.formatDate(this.blog.registration_timestamp);
          }
        }, (err) => {
          this.alerts.errorAlertNavigate('No se pudo obtener la información del blog.', '/blog');
        });*/
      });
    }

    createForms() {
      this.paymentForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        card_number: ['', [Validators.required, Validators.minLength(15)]],
        month: ['', [Validators.required, Validators.minLength(2)]],
        year: ['', [Validators.required, Validators.minLength(2)]],
        cvv: ['', [Validators.required, Validators.minLength(3)]]
         /*email: ['', [Validators.required, Validators.email]],
         password: ['', [Validators.required, Validators.minLength(6)]]*/
      });

      /*this.recoverForm = this.fb.group({
         email_recover: ['', [Validators.required, Validators.email]]
      });

      this.registerForm = this.fb.group({
         nombres: ['', [Validators.required, Validators.minLength(2)]],
         apellidos: ['', [Validators.required, Validators.minLength(2)]],
         nombre_usuario: ['', [Validators.required, Validators.minLength(2)]],
         fecha_nacimiento: ['', [Validators.required]],
         telefono: ['', [Validators.required, Validators.minLength(10)]],
         email_registro: ['', [Validators.required, Validators.email]],
         password_registro: ['', [Validators.required, Validators.minLength(12)]],
         password_registro2: ['', [Validators.required, Validators.minLength(12), this.ComparePassword('password_registro')]]
      });*/
    }

  ngOnInit(): void {
    let token = localStorage.getItem("token") || ""
    let user_id = localStorage.getItem("user_id") || ""
    let email = localStorage.getItem("email") || ""
    if (token.length === 0 || user_id.length === 0 || email.length === 0) {
      this.router.navigate(['/home'])
    } else {
      this.loadMembresia();
    }
  }

  loadMembresia() {
    this.loading = true;
    this.membresiaService.fn_ObtenerDatos(this.id).subscribe((res) => {
      if (res.status == 200) {
        this.loading = false;
        console.log(res);
        this.datos = res.body;

      } else {
        //
        this.loading = false;
      }
    }, (err) => {
      this.loading = false;
      this.router.navigate(['/home'])
    });
  }

  openPaymentModal(paymentcontent: any) {
      let ngbModalOptions: NgbModalOptions = {
            size: 'lg',
            backdrop : 'static',
            keyboard : false
      };
  		this.modalService.open(paymentcontent, ngbModalOptions);
  }

  processPayment(name: string, card_number: string, month: string, year: string, cvv: string) {
    this.loading = true;
    this.paymentService.fn_ProcessPayment(
      {
        holder_name: name,
        card_number: card_number,
        expiration_year: year,
        expiration_month: month,
        cvv2: cvv
      }, this.id).subscribe((res) => {
      this.loading = false;
      //this.login_response = res;
      console.log(res);
      if (res.status == "active") {
        this.modalService.dismissAll();
        this.confirmar = true;
        this.folio = res.transaction.authorization;
        this.operation_date = res.transaction.operation_date;
        this.amount = res.transaction.amount;
        this.type = res.transaction.card.type;
      } else {
        this.showError("Proceso de compra", "Ha ocurrido un error");
      }
    }, (err) => {
      console.log(err);
      if (err.error.message) {
        this.showError("Proceso de compra", err.error.message);
      } else {
        this.showError("Proceso de compra", err.message);
      }
      this.loading = false;
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
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


