import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMisionSectionComponent } from './about-mision-section.component';

describe('AboutMisionSectionComponent', () => {
  let component: AboutMisionSectionComponent;
  let fixture: ComponentFixture<AboutMisionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMisionSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMisionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
