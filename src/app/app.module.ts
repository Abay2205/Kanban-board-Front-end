import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasksComponent } from './features/task_features/tasks/tasks.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {RequestInterceptor} from "./models/request.interceptor";
import {SecurePipe} from "./models/secure.pipe";
import {TextFilterPipe} from "./models/text-filter.pipe";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateTaskComponent } from './features/task_features/update-task/update-task.component';
import { CreateTaskComponent } from './features/task_features/create-task/create-task.component';
import { ColumnComponent } from './features/column_features/column/column.component';
import { CreateColumnComponent } from './features/column_features/create-column/create-column.component';
import { UpdateColumnComponent } from './features/column_features/update-column/update-column.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './features/user_features/user/user.component';
import { CreateUserComponent } from './features/user_features/create-user/create-user.component';
import { UpdateUserComponent } from './features/user_features/update-user/update-user.component';
import { MychartComponent } from './features/mychart/mychart.component';
import { SubtaskComponent } from './features/subtask_features/subtask/subtask.component';
import { TaskDetailsComponent } from './features/task_features/task-details/task-details.component';
import { CreateSubtaskComponent } from './features/subtask_features/create-subtask/create-subtask.component';
import { UpdateSubtaskComponent } from './features/subtask_features/update-subtask/update-subtask.component';



@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    SecurePipe,
    TextFilterPipe,
    NavbarComponent,
    UpdateTaskComponent,
    CreateTaskComponent,
    ColumnComponent,
    CreateColumnComponent,
    UpdateColumnComponent,
    LoginComponent,
    UserComponent,
    CreateUserComponent,
    UpdateUserComponent,
    MychartComponent,
    SubtaskComponent,
    TaskDetailsComponent,
    CreateSubtaskComponent,
    UpdateSubtaskComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
