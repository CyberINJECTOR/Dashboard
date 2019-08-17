import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPopupTaskComponent } from './edit-popup-task.component';

describe('EditPopupTaskComponent', () => {
  let component: EditPopupTaskComponent;
  let fixture: ComponentFixture<EditPopupTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPopupTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPopupTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
