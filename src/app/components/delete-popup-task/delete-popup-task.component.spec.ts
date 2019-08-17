import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePopupTaskComponent } from './delete-popup-task.component';

describe('DeletePopupTaskComponent', () => {
  let component: DeletePopupTaskComponent;
  let fixture: ComponentFixture<DeletePopupTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePopupTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePopupTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
