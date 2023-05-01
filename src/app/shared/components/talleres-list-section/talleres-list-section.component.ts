import { Component, OnInit } from '@angular/core';
import { VideoService } from 'app/shared/services/video.service';

@Component({
  selector: 'app-talleres-list-section',
  templateUrl: './talleres-list-section.component.html',
  styleUrls: ['./talleres-list-section.component.scss']
})
export class TalleresListSectionComponent implements OnInit {
  constructor(
    private videoService: VideoService) { }

  ngOnInit(): void {
    this.fn_GetVideoList();
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
}