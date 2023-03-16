import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalleresListSectionComponent } from './talleres-list-section.component';

describe('TalleresListSectionComponent', () => {
  let component: TalleresListSectionComponent;
  let fixture: ComponentFixture<TalleresListSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalleresListSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalleresListSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
