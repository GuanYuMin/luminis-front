import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/shared/services/blog.service';

interface Posts {
  image: string,
  title: string,
  author: string,
  sub_title: string,
}

@Component({
  selector: 'app-landing-entries-section',
  templateUrl: './landing-entries-section.component.html',
  styleUrls: ['./landing-entries-section.component.scss']
})
export class LandingEntriesSectionComponent implements OnInit {
  posts: Posts[];

  constructor(
  private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.blogService.fn_ObtenerLista().subscribe((res) => {
      if (res.status == 200) {
        this.posts = res.body.slice(0,5);
      }
    }, (err) => {

    });
  }
}
