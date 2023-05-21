import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-talleres-first-section',
  templateUrl: './talleres-first-section.component.html',
  styleUrls: ['./talleres-first-section.component.scss']
})
export class TalleresFirstSectionComponent implements OnInit {
  logged_in: boolean = false;

  ngOnInit(): void {
    let token = localStorage.getItem("token") || ""
    if (token.length > 0) {
      this.logged_in = true;
    }
  }
}
