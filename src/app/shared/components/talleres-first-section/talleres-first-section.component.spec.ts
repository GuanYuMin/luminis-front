import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalleresFirstSectionComponent } from './talleres-first-section.component';

describe('TalleresFirstSectionComponent', () => {
  let component: TalleresFirstSectionComponent;
  let fixture: ComponentFixture<TalleresFirstSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalleresFirstSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalleresFirstSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
