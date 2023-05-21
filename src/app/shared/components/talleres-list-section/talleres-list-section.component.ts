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
  displayMessage = "LO MÁS NUEVO";
  sortOptions = ["LO MÁS NUEVO", "LO MÁS ANTIGUO"]

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
      this.vmCurso = res.body;
      //debugger;
    });
  }

  changeMessage(selectedItem: string, index: number){
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
}
