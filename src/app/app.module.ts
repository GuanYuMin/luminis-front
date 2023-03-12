import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './shared/components/top-menu/top-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingFirstSectionComponent } from './shared/components/landing-first-section/landing-first-section.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingSecondSectionComponent } from './shared/components/landing-second-section/landing-second-section.component';
import { FeatherModule } from 'angular-feather';
import { ArrowRight } from 'angular-feather/icons';
import { LandingThirdSectionComponent } from './shared/components/landing-third-section/landing-third-section.component';
import { LandingProductsSectionComponent } from './shared/components/landing-products-section/landing-products-section.component';
import { LandingComunidadsSectionComponent } from './shared/components/landing-comunidads-section/landing-comunidads-section.component';

const icons = {
  ArrowRight
};
@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LandingFirstSectionComponent,
    LandingSecondSectionComponent,
    LandingThirdSectionComponent,
    LandingProductsSectionComponent,
    LandingComunidadsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CarouselModule,
    BrowserAnimationsModule,
    FeatherModule.pick(icons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
