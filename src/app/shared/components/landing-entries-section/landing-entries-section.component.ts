import { Component } from '@angular/core';

interface Posts { 
  img: string,
  name: string,
  description: string,
}

@Component({
  selector: 'app-landing-entries-section',
  templateUrl: './landing-entries-section.component.html',
  styleUrls: ['./landing-entries-section.component.scss']
})
export class LandingEntriesSectionComponent {
  posts: Posts[] = [
    {
      img: 'bg.webp',
      name: ' NOMBRE AUTOR ',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
    },
    {
      img: 'bg.webp',
      name: ' NOMBRE AUTOR ',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
    },
    {
      img: 'bg.webp',
      name: ' NOMBRE AUTOR ',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
    },
    {
      img: 'bg.webp',
      name: ' NOMBRE AUTOR ',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
    },
  ]
}
