import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindActionComponent } from './find-action.component';

describe('FindActionComponent', () => {
  let component: FindActionComponent;
  let fixture: ComponentFixture<FindActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
