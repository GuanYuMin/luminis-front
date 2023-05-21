import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MembresiaService } from 'app/shared/services/membresia.service';
import { MembresiaViewModel } from 'app/shared/models/viewmodels/membresia.model'

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  confirmar = false;
  logged_in: boolean = false;
  descuento: number = 0;
  datos: MembresiaViewModel = {} as MembresiaViewModel;
  id: string = "";

  constructor(
    private membresiaService: MembresiaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
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
    this.membresiaService.fn_ObtenerDatos(this.id).subscribe((res) => {
      if (res.status == 200) {
        console.log(res);
        this.datos = res.body;
      } else {
        //
      }
    }, (err) => {
      this.router.navigate(['/home'])
    });
  }
}
