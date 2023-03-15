import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFormacionSectionComponent } from './about-formacion-section.component';

describe('AboutFormacionSectionComponent', () => {
  let component: AboutFormacionSectionComponent;
  let fixture: ComponentFixture<AboutFormacionSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutFormacionSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutFormacionSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
