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
  formattedDate: string = "";

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
          if (this.blog.author != null) {
            this.blog.author = 'POR ' + this.blog.author.toUpperCase();
          }
          this.formatDate(this.blog.registration_timestamp);
        }
      }, (err) => {
        this.alerts.errorAlertNavigate('No se pudo obtener la información del blog.', '/blog');
      });
    });
  }

  formatDate(date: string) {
        let optionsD: Intl.DateTimeFormatOptions = {
            day: "numeric"
        };

        let optionsM: Intl.DateTimeFormatOptions = {
            month: "long"
        };

        let optionsY: Intl.DateTimeFormatOptions = {
            year: "numeric"
        };
        let day = new Date(date).toLocaleDateString("es-ES", optionsD);
        let month = new Date(date).toLocaleDateString("es-ES", optionsM).toUpperCase();
        let year = new Date(date).toLocaleDateString("es-ES", optionsY);
        this.formattedDate = month + " " + day + ", " + year;
    }
}
