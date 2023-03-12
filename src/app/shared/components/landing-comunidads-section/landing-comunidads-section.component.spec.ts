import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComunidadsSectionComponent } from './landing-comunidads-section.component';

describe('LandingComunidadsSectionComponent', () => {
  let component: LandingComunidadsSectionComponent;
  let fixture: ComponentFixture<LandingComunidadsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingComunidadsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingComunidadsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
