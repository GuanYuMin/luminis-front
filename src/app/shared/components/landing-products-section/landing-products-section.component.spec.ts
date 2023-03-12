import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProductsSectionComponent } from './landing-products-section.component';

describe('LandingProductsSectionComponent', () => {
  let component: LandingProductsSectionComponent;
  let fixture: ComponentFixture<LandingProductsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingProductsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
