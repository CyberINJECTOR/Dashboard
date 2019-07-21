import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalToolbarComponent } from './universal-toolbar.component';

describe('UniversalToolbarComponent', () => {
  let component: UniversalToolbarComponent;
  let fixture: ComponentFixture<UniversalToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
