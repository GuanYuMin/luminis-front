import { Component, OnInit } from '@angular/core';
import { CursoService } from 'app/shared/services/curso.service';

interface Course {
  course_id: number,
  name: string,
  image: string,
  description: string,
  product: string,
  active: boolean,
  price: number
}

@Component({
  selector: 'app-about-formacion-section',
  templateUrl: './about-formacion-section.component.html',
  styleUrls: ['./about-formacion-section.component.scss']
})
export class AboutFormacionSectionComponent implements OnInit {
  courses: Course[];

  constructor(
  private cursoService: CursoService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.cursoService.fn_ObtenerLista().subscribe((res) => {
      if (res.status == 200) {
        this.courses = res.body.slice(0,3);
      }
    }, (err) => {

    });
  }
}
