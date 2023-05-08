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
import {
  ArrowRight,
  Search,
  ArrowDown,
  ArrowLeft,
  Smile,
  Heart
} from 'angular-feather/icons';
import { LandingThirdSectionComponent } from './shared/components/landing-third-section/landing-third-section.component';
import { LandingProductsSectionComponent } from './shared/components/landing-products-section/landing-products-section.component';
import { LandingComunidadsSectionComponent } from './shared/components/landing-comunidads-section/landing-comunidads-section.component';
import { LandingTituloblogSectionComponent } from './shared/components/landing-tituloblog-section/landing-tituloblog-section.component';
import { LandingEntriesSectionComponent } from './shared/components/landing-entries-section/landing-entries-section.component';
import { LandingFooterSectionComponent } from './shared/components/landing-footer-section/landing-footer-section.component';
import { AboutUsComponent } from './shared/components/about-us/about-us.component';
import { HomeComponent } from './shared/components/home/home.component';
import { AboutFirstSectionComponent } from './shared/components/about-first-section/about-first-section.component';
import { AboutMisionSectionComponent } from './shared/components/about-mision-section/about-mision-section.component';
import { AboutFormacionSectionComponent } from './shared/components/about-formacion-section/about-formacion-section.component';
import { AboutHistoriaSectionComponent } from './shared/components/about-historia-section/about-historia-section.component';
import { AboutTituloblogSectionComponent } from './shared/components/about-tituloblog-section/about-tituloblog-section.component';
import { TalleresComponent } from './shared/components/talleres/talleres.component';
import { TalleresFirstSectionComponent } from './shared/components/talleres-first-section/talleres-first-section.component';
import { TalleresListSectionComponent } from './shared/components/talleres-list-section/talleres-list-section.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { TallerComponent } from './shared/components/taller/taller.component';
import { MembresiasComponent } from './shared/components/membresias/membresias.component';


const icons = {
  ArrowRight,
  Search,
  ArrowDown,
  ArrowLeft,
  Smile,
  Heart
};
@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    LandingFirstSectionComponent,
    LandingSecondSectionComponent,
    LandingThirdSectionComponent,
    LandingProductsSectionComponent,
    LandingComunidadsSectionComponent,
    LandingTituloblogSectionComponent,
    LandingEntriesSectionComponent,
    LandingFooterSectionComponent,
    AboutUsComponent,
    HomeComponent,
    AboutFirstSectionComponent,
    AboutMisionSectionComponent,
    AboutFormacionSectionComponent,
    AboutHistoriaSectionComponent,
    AboutTituloblogSectionComponent,
    TalleresComponent,
    TalleresFirstSectionComponent,
    TalleresListSectionComponent,
    ProfileComponent,
    TallerComponent,
    MembresiasComponent
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
