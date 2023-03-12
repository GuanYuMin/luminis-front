import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';

@Component({
  selector: 'app-landing-first-section',
  templateUrl: './landing-first-section.component.html',
  styleUrls: ['./landing-first-section.component.scss']
})
export class LandingFirstSectionComponent {

  public carrouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
}
