import { Component, OnInit, Input } from '@angular/core';
import { BlogViewModel } from 'app/shared/models/viewmodels/blog.model';
import { BlogService } from 'app/shared/services/blog.service';
import { Router } from '@angular/router';
import { AlertsService } from "app/shared/services/alerts.service";

@Component({
  selector: 'app-landing-entries-section',
  templateUrl: './landing-entries-section.component.html',
  styleUrls: ['./landing-entries-section.component.scss']
})
export class LandingEntriesSectionComponent implements OnInit {
  posts: BlogViewModel[];
  @Input() blogsort: number;

  constructor(
  private blogService: BlogService,
  private router: Router,
  private alerts: AlertsService
  ) { }

  goTo(id: string) {
    this.router.navigate([`ver-blog/${id}`]);
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.fn_ObtenerLista().subscribe((res) => {
      if (res.status == 200) {
        this.posts = res.body.slice(0,this.blogsort);
      }
    }, (err) => {
      this.alerts.errorAlertNavigate('No se pudieron obtener los blogs.', '/home');
    });
  }
}
