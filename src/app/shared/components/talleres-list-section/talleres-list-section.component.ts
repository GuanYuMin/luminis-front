import { Component, OnInit } from '@angular/core';
import { CursoViewModel } from 'app/shared/models/viewmodels/cursos.model';
import { SlideViewModel } from 'app/shared/models/viewmodels/slide.model';
import { CursoService } from 'app/shared/services/curso.service';
import { VideoService } from 'app/shared/services/video.service';

@Component({
  selector: 'app-talleres-list-section',
  templateUrl: './talleres-list-section.component.html',
  styleUrls: ['./talleres-list-section.component.scss']
})
export class TalleresListSectionComponent implements OnInit {
  vmCurso: CursoViewModel[] = [];
  vmOrig: CursoViewModel[] = [];
  displayMessage = "LO MÁS NUEVO";
  sortOptions = ["LO MÁS NUEVO", "LO MÁS ANTIGUO"]
  value = '';
  slides: SlideViewModel[] = [];
  slide: SlideViewModel = {} as SlideViewModel;
  contador_slides: number = 0;

  constructor(
    private videoService: VideoService,
    private cursoService: CursoService
    ) { }

  ngOnInit(): void {
    this.fn_ObtenerCursos();
  }

  fn_GetVideoList(){
    debugger;
    this.videoService.fn_GetVideoList().subscribe((par_obj_respuesta:any)=>{
      debugger;
      console.log(par_obj_respuesta);
    }, error => {
      console.log(error);
    });
  }

  fn_ObtenerCursos(){
    this.cursoService.fn_ObtenerLista().subscribe((res:any) => {
      this.vmCurso = res.body;
      this.vmOrig = res.body;
      this.displayCursos();
    });
  }

  changeMessage(selectedItem: string, index: number) {
    this.displayMessage = selectedItem;
    switch (index) {
      case 0: {
        this.vmCurso.sort((a, b) => {
          return <any>new Date(b.update_timestamp) - <any>new Date(a.update_timestamp);
        });
        break;
      }
      case 1: {
        this.vmCurso.sort((b, a) => {
          return <any>new Date(b.update_timestamp) - <any>new Date(a.update_timestamp);
        });
        break;
      }
    }
  }

  onKey(event: any) {
    this.value = event.target.value;
    this.value = this.replaceChars(this.value.toLowerCase().trim());
    if (this.value.length === 0) {
      this.vmCurso = this.vmOrig;
    } else {
      this.vmCurso = this.vmOrig.filter(curso => this.replaceChars(curso.name.toLowerCase()).includes(this.value) || (curso.description != null && this.replaceChars(curso.description.toLowerCase()).includes(this.value)));
    }
    this.displayCursos();
  }

  replaceChars(origin: string) {
    return origin.replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u").replace("ñ","n");
  }

  displayCursos() {
    this.contador_slides = 0;
    this.slides = [];
    this.slide = {} as SlideViewModel;
    this.vmCurso.forEach( (element) => {
      if (element.active == true) {
        if (this.contador_slides == 0) {
          this.slide = {} as SlideViewModel;
          this.slide.cursos = [];
        }
        this.slide.cursos.push(element);
        this.contador_slides = this.contador_slides + 1;
        if (this.contador_slides == 3) {
          this.slides.push(this.slide);
          this.contador_slides = 0;
        }
      }
    });
    if (this.contador_slides > 0) {
      this.slides.push(this.slide);
    }
  }
}
