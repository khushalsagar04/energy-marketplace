import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagePlanComponent } from './vendor-manage-plan.component';

describe('VendorManagePlanComponent', () => {
  let component: VendorManagePlanComponent;
  let fixture: ComponentFixture<VendorManagePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorManagePlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorManagePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
