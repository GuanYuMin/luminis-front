import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Taller } from '../../models/taller';
import * as moment from 'moment';
import { CursoService } from 'app/shared/services/curso.service';
import { CursoViewModel } from 'app/shared/models/viewmodels/cursos.model';
import { DomSanitizer } from '@angular/platform-browser';
import { IFrameService } from 'app/shared/services/iframe.service';
import { CursoQuestionService } from 'app/shared/services/curso.question.service';
import { CursoAnswerService } from 'app/shared/services/curso.answer.service';
import { CursoQuestionViewModel } from 'app/shared/models/viewmodels/curso.question.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.component.html',
  styleUrls: ['./taller.component.scss']
})
export class TallerComponent implements OnInit {
  sendQuestionForm: FormGroup;
  respuestasVisibles: boolean = false;
  public loading: boolean = false;
  id: string = "";
  secondary: string = "";
  main_video: string = "";
  show_video: boolean = false;
  curso: CursoViewModel = {} as CursoViewModel;
  questions: CursoQuestionViewModel[] = [];
  fullname: string = "";
  user_photo: string = "";

  constructor(
  private activatedRoute: ActivatedRoute,
  private cursoService: CursoService,
  private cursoquestionService: CursoQuestionService,
  private cursoanswerService: CursoAnswerService,
  private router: Router,
  private sanitizer: DomSanitizer,
  public iframeService: IFrameService,
  private fb: FormBuilder,
  private toastaService: ToastaService,
  private toastaConfig: ToastaConfig
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.toastaConfig.theme = 'bootstrap';
      this.toastaConfig.position = 'top-right';
      this.createForm();
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

  createForm() {
    this.sendQuestionForm = this.fb.group({
       question_comment: ['', [Validators.minLength(10)]]
    });
  }

  mostrarRespuestas(i, id) {
    console.log(i);
    console.log(id);
    this.loading = true;
    this.cursoanswerService.fn_ObtenerRespuestasPregunta(id).subscribe((res) => {
      this.loading = false;
      console.log(res.body);
      this.questions[i].answers = res.body;
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
    });

  }

  updateSrc(url) {
    console.log(url);
      this.iframeService.changeSrc(this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  sendComment(comment: string) {
    this.loading = true;
    this.cursoquestionService.fn_CrearPregunta(
      {
        question: comment,
        active: 1,
        course_id: this.id
      }).subscribe((res) => {
      this.loading = false;
        this.showSuccess("Enviar comentario", res.message);
        this.sendQuestionForm.patchValue({ question_comment: '' });
        this.getQuestions();
    }, (err) => {
      if (err.error.message) {
        this.showError("Enviar comentario", err.error.message);
      } else {
        this.showError("Enviar comentario", err.message);
      }
      this.loading = false;
    });
  }

  loadCourse() {
    this.loading = true;
    this.cursoService.fn_ObtenerDetalle(this.id).subscribe((res) => {
      this.loading = false;
      console.log(res);
      this.curso = res;
      if (this.curso) {
        this.secondary = "- " + this.curso.videos.length + " módulos, 60 minutos.";
        if (this.curso.videos.length > 0) {
          this.main_video = this.curso.videos[0].video_url;
          this.updateSrc(this.main_video);
          this.show_video = true;
        }
        this.fullname = localStorage.getItem("fullname");
        this.user_photo = localStorage.getItem("user_photo");
        this.getQuestions();
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

  getQuestions() {
    this.cursoquestionService.fn_ObtenerPreguntasCurso(this.id).subscribe((res) => {
       this.questions = res.body;
       console.log(this.questions);
     }, (err) => {
       //this.loading = false;
       //this.router.navigate(['/home'])
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
