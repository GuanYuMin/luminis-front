import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-third-section',
  templateUrl: './landing-third-section.component.html',
  styleUrls: ['./landing-third-section.component.scss']
})
export class LandingThirdSectionComponent implements OnInit {
  logged_in: boolean = false;

  ngOnInit(): void {
      let token = localStorage.getItem("token") || ""
      if (token.length > 0) {
        this.logged_in = true;
      }
    }
}
