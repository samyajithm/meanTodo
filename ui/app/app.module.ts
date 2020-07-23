import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarComponent} from './components/common/sidebar/sidebar.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TaskListComponent} from './components/main/task/task-list/task-list.component';
import {ConfirmDialogComponent} from './components/common/confirm-dialog/confirm-dialog.component';
import {LoadingComponent} from './components/common/loading/loading.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatGridListModule} from "@angular/material/grid-list";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef} from "@angular/material/dialog";
import { TaskDetailsComponent } from './components/main/task/task-details/task-details.component';
import { LoginComponent } from './components/main/auth/login/login.component';
import { TaskComponent } from './components/main/task/task.component';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { AuthService } from './services/auth/auth.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TaskListComponent,
    ConfirmDialogComponent,
    TaskDetailsComponent,
    LoadingComponent,
    LoginComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    DragDropModule,
    MatGridListModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      preventDuplicates: true,
      newestOnTop: true,
      timeOut: 100000,
      positionClass: 'toast-top-center',
      closeButton: true,
      extendedTimeOut: 0,
      maxOpened: 1
    })
  ],
  entryComponents: [
    ConfirmDialogComponent,
    TaskDetailsComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} },
    { provide: MatDialogRef, useValue: {} },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}
