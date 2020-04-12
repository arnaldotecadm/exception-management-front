import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopExceptionComponent } from './top-exception.component';

describe('TopExceptionComponent', () => {
  let component: TopExceptionComponent;
  let fixture: ComponentFixture<TopExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
