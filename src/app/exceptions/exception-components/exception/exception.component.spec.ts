import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExceptionComponent } from './exception.component';

describe('ExceprionComponent', () => {
  let component: ExceptionComponent;
  let fixture: ComponentFixture<ExceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
