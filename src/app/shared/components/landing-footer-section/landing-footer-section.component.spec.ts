import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFooterSectionComponent } from './landing-footer-section.component';

describe('LandingFooterSectionComponent', () => {
  let component: LandingFooterSectionComponent;
  let fixture: ComponentFixture<LandingFooterSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingFooterSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingFooterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
