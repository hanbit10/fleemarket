import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegisterPageComponent } from './product-register-page.component';

describe('ProductRegisterPageComponent', () => {
  let component: ProductRegisterPageComponent;
  let fixture: ComponentFixture<ProductRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRegisterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
