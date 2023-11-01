import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePlanComponent } from './price-plan.component';

describe('PricePlanComponent', () => {
  let component: PricePlanComponent;
  let fixture: ComponentFixture<PricePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
