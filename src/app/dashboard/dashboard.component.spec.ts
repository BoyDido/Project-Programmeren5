import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { USERS } from '../mock-users';
import { UserSearchComponent } from '../user-search/user-search.component';
import {BackendAppService} from '../backend-app.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let backendAppService;
  let getUsersSpy;

  beforeEach(waitForAsync(() => {
    backendAppService = jasmine.createSpyObj('BackendAppService', ['getUsers']);
    getUsersSpy = backendAppService.getUsers.and.returnValue(of(USERS));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, UserSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: BackendAppService, useValue: backendAppService}]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Users" as headline', () => {
    expect(fixture.nativeElement.querySelector('h3').textContent).toEqual('Top Users');
  });

  it('should call backendAppService', waitForAsync(() => {
       expect(getUsersSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
