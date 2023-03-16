import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTituloblogSectionComponent } from './about-tituloblog-section.component';

describe('AboutTituloblogSectionComponent', () => {
  let component: AboutTituloblogSectionComponent;
  let fixture: ComponentFixture<AboutTituloblogSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTituloblogSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTituloblogSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
