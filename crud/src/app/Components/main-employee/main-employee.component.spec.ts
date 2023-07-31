import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmployeeComponent } from './main-employee.component';

describe('MainEmployeeComponent', () => {
  let component: MainEmployeeComponent;
  let fixture: ComponentFixture<MainEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainEmployeeComponent]
    });
    fixture = TestBed.createComponent(MainEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
