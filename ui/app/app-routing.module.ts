import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TaskListComponent} from "./components/main/task/task-list/task-list.component";
import { LoginComponent } from './components/main/auth/login/login.component';
import { TaskComponent } from './components/main/task/task.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthInterceptor } from './services/auth/auth-interceptor';


const routes: Routes = [
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      redirectTo: 'pending',
      pathMatch: 'prefix'
    }, {
      path: 'pending',
      component: TaskListComponent,
      data: {
        title: 'Tasks',
        state: 'pending'
      }
    }, {
      path: 'important',
      component: TaskListComponent,
      data: {
        title: 'Important',
        state: 'important'
      }
    }, {
      path: 'completed',
      component: TaskListComponent,
      data: {
        title: 'Completed',
        state: 'completed'
      }
    }, {
      path: 'scheduled',
      component: TaskListComponent,
      data: {
        title: 'Scheduled',
        state: 'scheduled'
      }
    }]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      state: 'login'
    }
  },
  {
    path: 'signup',
    component: LoginComponent,
    data: {
      title: 'Signup',
      state: 'signup'
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/task/pending'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
