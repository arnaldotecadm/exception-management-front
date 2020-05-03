import { Routes } from '@angular/router';
import { ExceptionComponent } from '../../exceptions/exception-components/exception/exception.component';
import { DashboardComponent } from '../../home/dashboard/dashboard.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'excecoes', component: ExceptionComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'notifications', component: NotificationsComponent },
];
