import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogViewModel } from 'app/shared/models/viewmodels/blog.model';
import { BlogService } from 'app/shared/services/blog.service';
import { AlertsService } from "app/shared/services/alerts.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  blogpages: number = 4;
  blog: BlogViewModel = {} as BlogViewModel;

  constructor(
  private activatedRoute: ActivatedRoute,
  private blogService: BlogService,
  private alerts: AlertsService
  ) {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.blogService.fn_ObtenerBlog(id).subscribe((res) => {
        if (res.status == 200) {
          this.blog = res.body;
        }
      }, (err) => {
        this.alerts.errorAlertNavigate('No se pudo obtener la información del blog.', '/blog');
      });
    });
  }
}
