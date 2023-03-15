import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingTituloblogSectionComponent } from './landing-tituloblog-section.component';

describe('LandingTituloblogSectionComponent', () => {
  let component: LandingTituloblogSectionComponent;
  let fixture: ComponentFixture<LandingTituloblogSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingTituloblogSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingTituloblogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
