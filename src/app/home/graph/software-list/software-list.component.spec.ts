import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSoftwareListComponent } from './software-list.component';

describe('AppListComponent', () => {
  let component: AppSoftwareListComponent;
  let fixture: ComponentFixture<AppSoftwareListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppSoftwareListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSoftwareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
