import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingEntriesSectionComponent } from './landing-entries-section.component';

describe('LandingEntriesSectionComponent', () => {
  let component: LandingEntriesSectionComponent;
  let fixture: ComponentFixture<LandingEntriesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingEntriesSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingEntriesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
