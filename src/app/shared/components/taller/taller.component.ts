import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Taller } from '../../models/taller';
import * as moment from 'moment';
import { CursoService } from 'app/shared/services/curso.service';
import { CursoViewModel } from 'app/shared/models/viewmodels/cursos.model';
import { DomSanitizer } from '@angular/platform-browser';
import { IFrameService } from 'app/shared/services/iframe.service';
import { UserService } from 'app/shared/services/user.service';
import { PhotoService } from 'app/shared/services/photo.service';
import { PerfilViewModel } from 'app/shared/models/viewmodels/perfil.model';
import { PhotoViewModel } from 'app/shared/models/viewmodels/photo.model';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.scss']
})
export class TallerComponent implements OnInit {
  public loading: boolean = false;
  id: string = "";
  secondary: string = "";
  main_video: string = "";
  show_video: boolean = false;
  curso: CursoViewModel = {} as CursoViewModel;
  profile: PerfilViewModel = {} as PerfilViewModel;
  photo: PhotoViewModel = {} as PhotoViewModel;

  constructor(
  private activatedRoute: ActivatedRoute,
  private cursoService: CursoService,
  private router: Router,
  private sanitizer: DomSanitizer,
  public iframeService: IFrameService,
  private userService: UserService,
  private photoService: PhotoService
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

  updateSrc(url) {
      this.iframeService.changeSrc(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  loadCourse() {
    this.loading = true;
    this.cursoService.fn_ObtenerDetalle(this.id).subscribe((res) => {
      console.log(res);
      this.curso = res;
      if (this.curso) {
        this.secondary = "- " + this.curso.videos.length + " módulos, 60 minutos.";
        if (this.curso.videos.length > 0) {
          this.main_video = this.curso.videos[0].video_url;
          this.updateSrc(this.main_video);
          this.show_video = true;
        }
        this.getUserData();
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

  getUserData() {
    //this.loading = true;
    this.userService.fn_GetUser(
       localStorage.getItem("user_id")
    ).subscribe((res) => {
      this.profile = res.body;
      this.getUserPhoto();
    }, (err) => {
      if (err.error.message) {
        //this.showError("Perfil", err.error.message);
      } else {
        //this.showError("Perfil", err.message);
      }
      //this.loading = false;
    });
  }

  getUserPhoto() {
    this.photoService.fn_GetPhoto(
       String(this.profile.photo_id)
    ).subscribe((res) => {
      this.photo = res.body;
    }, (err) => {
      if (err.error.message) {
        //this.showError("Perfil", err.error.message);
      } else {
        //this.showError("Perfil", err.message);
      }
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
