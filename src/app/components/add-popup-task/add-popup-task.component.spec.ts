import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopupTaskComponent } from './add-popup-task.component';

describe('AddPopupTaskComponent', () => {
  let component: AddPopupTaskComponent;
  let fixture: ComponentFixture<AddPopupTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPopupTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPopupTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
