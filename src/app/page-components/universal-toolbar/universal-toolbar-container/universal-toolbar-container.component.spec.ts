import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalToolbarContainerComponent } from './universal-toolbar-container.component';

describe('UniversalToolbarContainerComponent', () => {
  let component: UniversalToolbarContainerComponent;
  let fixture: ComponentFixture<UniversalToolbarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalToolbarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalToolbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
