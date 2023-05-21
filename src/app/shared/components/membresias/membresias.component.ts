import { Component, OnInit } from '@angular/core';
import { MembresiaService } from 'app/shared/services/membresia.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Membresia {
  name: string,
  description: string,
  active: boolean,
  cost: number,
  membership_id: number
  contador: number
}

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.scss']
})
export class MembresiasComponent implements OnInit {
  membresias: Membresia[];
  htmlMembresias: SafeHtml;
  tempHtml: string = '';
  flag: boolean = true;
  contador: number = 1;

  constructor(
  private membresiaService: MembresiaService,
  private sanitizer: DomSanitizer
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
