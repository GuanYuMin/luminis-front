import { Component } from '@angular/core';

interface Product { 
  img: string,
  name: string,
  description: string,
  price: string,
}

@Component({
  selector: 'app-about-formacion-section',
  templateUrl: './about-formacion-section.component.html',
  styleUrls: ['./about-formacion-section.component.scss']
})
export class AboutFormacionSectionComponent {
  products: Product[] = [
    {
      img: 'bg.webp',
      name: 'Nombre de producto',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
      price: '500 MXN',
    },
    {
      img: 'bg.webp',
      name: 'Nombre de producto',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
      price: '500 MXN',
    },
    {
      img: 'bg.webp',
      name: 'Nombre de producto',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
      price: '500 MXN',
    }
  ]

}
