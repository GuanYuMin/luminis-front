import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingThirdSectionComponent } from './landing-third-section.component';

describe('LandingThirdSectionComponent', () => {
  let component: LandingThirdSectionComponent;
  let fixture: ComponentFixture<LandingThirdSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingThirdSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingThirdSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
