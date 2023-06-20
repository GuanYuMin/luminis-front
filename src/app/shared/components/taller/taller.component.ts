import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Taller } from '../../models/taller';
import * as moment from 'moment';
import { CursoService } from 'app/shared/services/curso.service';
import { CursoViewModel } from 'app/shared/models/viewmodels/cursos.model';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.scss']
})
export class TallerComponent implements OnInit {
  public loading: boolean = false;
  id: string = "";
  secondary: string = "";
  curso: CursoViewModel = {} as CursoViewModel;

  constructor(
  private activatedRoute: ActivatedRoute,
  private cursoService: CursoService,
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
      this.loadCourse();
    }
  }

  loadCourse() {
    this.loading = true;
    this.cursoService.fn_ObtenerDetalle(this.id).subscribe((res) => {
      console.log(res);
      this.curso = res;
      if (this.curso) {
        this.secondary = "- " + this.curso.videos.length + " módulos, 60 minutos.";
      }
      /*if (res.status == 200) {
        this.loading = false;
        console.log(res);
        //this.datos = res.body;

      } else {
        //
        this.loading = false;
      }*/
    }, (err) => {
      this.loading = false;
      this.router.navigate(['/home'])
    });
  }

  public taller: Taller = {
    name: 'Nombre del taller',
    descripcion: 'Descripción. Vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto. Lorem ipsum dolor sit amet. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper sus- cipit lobortis nisl ut aliquip ex ea commodo consequat.',
    autor: 'Luminis Admin',
    duracion: 60,
    tipo: 'Interactivo',
    video: 'https://www.youtube.com/embed/fQfZtg9Y_6k',
    temario: [
      {
        orden: 1, titulo: 'Lorem Ipsum dolor sit amet.',
        link: '', id: 1
      },
      {
        orden: 2, titulo: 'Suscipit lobortis nisl ut aliquip.',
        link: '', id: 2
      },
      {
        orden: 3, titulo: 'Ex ea commodo consequat.',
        link: '', id: 3
      },
      {
        orden: 4, titulo: 'Duis autem vel eum iriure dolor.',
        link: '', id: 4
      },
      {
        orden: 5, titulo: 'In hendrerit in vulputate.',
        link: '', id: 5
      },
      {
        orden: 6, titulo: 'Velit esse molestie consequat.',
        link: '', id: 6
      },
    ],
    aprendizajes: [
      {
        orden: 1,
        titulo: 'Nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        link: '',
        id: 1
      },
      {
        orden: 2,
        titulo: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation .',
        link: '',
        id: 2
      },
      {
        orden: 3,
        titulo: 'Ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
        link: '',
        id: 3
      },
    ],
    comentarios: [
      {
        userId: 1,
        creation_date: moment().subtract(1, 'week').toDate(),
        likes: [1,2,3,4], //usuarios que han dado like
        photo: 'https://i.pravatar.cc/200',
        comentario: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        id: 1,
      },
      {
        userId: 1,
        creation_date: moment().subtract(1, 'week').toDate(),
        likes: [1,2,3,4], //usuarios que han dado like
        photo: 'https://i.pravatar.cc/200',
        comentario: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        commentId: 1,
        id: 2
      },
      {
        userId: 1,
        creation_date: moment().subtract(1, 'week').toDate(),
        likes: [1,2,3,4], //usuarios que han dado like
        photo: 'https://i.pravatar.cc/200',
        comentario: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
        id: 3,
      },
    ]
  }
}
