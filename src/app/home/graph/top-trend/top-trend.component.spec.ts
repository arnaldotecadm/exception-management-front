import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TopTrendComponent } from './top-trend.component';

describe('TopTrendExceptionComponent', () => {
  let component: TopTrendComponent;
  let fixture: ComponentFixture<TopTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopTrendComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
