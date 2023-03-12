import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingFirstSectionComponent } from './landing-first-section.component';

describe('LandingFirstSectionComponent', () => {
  let component: LandingFirstSectionComponent;
  let fixture: ComponentFixture<LandingFirstSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingFirstSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingFirstSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
