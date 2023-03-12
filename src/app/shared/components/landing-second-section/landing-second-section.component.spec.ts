import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSecondSectionComponent } from './landing-second-section.component';

describe('LandingSecondSectionComponent', () => {
  let component: LandingSecondSectionComponent;
  let fixture: ComponentFixture<LandingSecondSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingSecondSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingSecondSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
