import { Component, OnInit } from '@angular/core';
import { MembresiaService } from 'app/shared/services/membresia.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Membresia {
  name: string,
  description: string,
  active: boolean,
  cost: number,
  membership_id: number
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
        this.membresias.forEach( (element) => {
          if (element.active == true) {
            if (this.flag == true) {
              this.tempHtml = this.tempHtml + '<div class="col px-3 py-3 background-sky-blue-mutted">';
            } else {
              this.tempHtml = this.tempHtml + '<div class="col px-3 py-3">';
            }
            this.flag = !this.flag;
            this.tempHtml = this.tempHtml + '<div class="w-100">';
            this.tempHtml = this.tempHtml + '<h4>' + element.name + '</h4>';
            this.tempHtml = this.tempHtml + '</div>';
            this.tempHtml = this.tempHtml + '<div class="w-100 mt-4">';
            this.tempHtml = this.tempHtml + element.description;
            this.tempHtml = this.tempHtml + '</div>';
            this.tempHtml = this.tempHtml + '<div class="w-100 mt-4">';
            this.tempHtml = this.tempHtml + '<strong>$' + element.cost + ' MXN</strong>';
            this.tempHtml = this.tempHtml + '</div>';
            //this.tempHtml = this.tempHtml + '<div class="w-100">';
            //this.tempHtml = this.tempHtml + '$1,000 MXN ANUAL';
            //this.tempHtml = this.tempHtml + '</div>';
            this.tempHtml = this.tempHtml + '<div class="w-100 mt-4 d-flex justify-content-center">';
            this.tempHtml = this.tempHtml + '<button class="background-blue rounded-pill p-2 text-white" style="border:none;">';
            this.tempHtml = this.tempHtml + 'ADQUIRIR';
            this.tempHtml = this.tempHtml + '</button>';
            this.tempHtml = this.tempHtml + '</div>';
            this.tempHtml = this.tempHtml + '</div>';
          }
        });
        this.htmlMembresias = this.sanitizer.bypassSecurityTrustHtml(this.tempHtml);
      }
    }, (err) => {

    });
  }
}
