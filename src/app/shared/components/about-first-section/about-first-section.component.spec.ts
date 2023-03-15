import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFirstSectionComponent } from './about-first-section.component';

describe('AboutFirstSectionComponent', () => {
  let component: AboutFirstSectionComponent;
  let fixture: ComponentFixture<AboutFirstSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutFirstSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutFirstSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
