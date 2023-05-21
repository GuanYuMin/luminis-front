import { Component, OnInit } from '@angular/core';
import { MembresiaService } from 'app/shared/services/membresia.service';

interface Product {
  img: string,
  name: string,
  description: string,
  price: string,
}

interface Membresia {
  name: string,
  description: string,
  active: boolean,
  cost: number,
  membership_id: number,
  membership_url: string
}

@Component({
  selector: 'app-landing-products-section',
  templateUrl: './landing-products-section.component.html',
  styleUrls: ['./landing-products-section.component.scss']
})
export class LandingProductsSectionComponent {
  membresias: Membresia[];

  constructor(
  private membresiaService: MembresiaService
  ) { }

  ngOnInit(): void {
    this.loadMembresias();
  }

  loadMembresias() {
    this.membresiaService.fn_ObtenerLista().subscribe((res) => {
      if (res.status == 200) {
        this.membresias = res.body;
      }
    }, (err) => {

    });
  }
}
