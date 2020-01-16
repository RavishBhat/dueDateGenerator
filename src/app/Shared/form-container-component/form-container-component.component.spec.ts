import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContainerComponentComponent } from './form-container-component.component';

describe('FormContainerComponentComponent', () => {
  let component: FormContainerComponentComponent;
  let fixture: ComponentFixture<FormContainerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormContainerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
