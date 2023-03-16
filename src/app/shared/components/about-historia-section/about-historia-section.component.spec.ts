import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHistoriaSectionComponent } from './about-historia-section.component';

describe('AboutHistoriaSectionComponent', () => {
  let component: AboutHistoriaSectionComponent;
  let fixture: ComponentFixture<AboutHistoriaSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutHistoriaSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutHistoriaSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
