import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOrderComponent } from './form-order.component';

describe('FormOrderComponent', () => {
  let component: FormOrderComponent;
  let fixture: ComponentFixture<FormOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
