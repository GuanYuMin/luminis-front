import { Component, OnInit } from '@angular/core';
import { CursoViewModel } from 'app/shared/models/viewmodels/cursos.model';
import { CursoService } from 'app/shared/services/curso.service';
import { VideoService } from 'app/shared/services/video.service';

@Component({
  selector: 'app-talleres-list-section',
  templateUrl: './talleres-list-section.component.html',
  styleUrls: ['./talleres-list-section.component.scss']
})
export class TalleresListSectionComponent implements OnInit {
  vmCurso: CursoViewModel[] = [];

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
      //debugger;
      this.vmCurso = res;
      //debugger;
    });
  }
}
