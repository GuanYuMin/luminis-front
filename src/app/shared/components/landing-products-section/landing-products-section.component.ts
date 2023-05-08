import { Component } from '@angular/core';

interface Product { 
  img: string,
  name: string,
  description: string,
  price: string,
}

@Component({
  selector: 'app-landing-products-section',
  templateUrl: './landing-products-section.component.html',
  styleUrls: ['./landing-products-section.component.scss']
})
export class LandingProductsSectionComponent {
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
    },
    {
      img: 'bg.webp',
      name: 'Nombre de producto',
      description: 'Descripción del producto. Lorem ipsum dolor sit amet. Consectetuer adipiscing elit, sed diam nonummy nibh. ',
      price: '500 MXN',
    },
  ]

}
