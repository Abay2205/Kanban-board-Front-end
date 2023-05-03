import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksComponent} from "./features/task_features/tasks/tasks.component";
import {CreateTaskComponent} from "./features/task_features/create-task/create-task.component";
import {UpdateTaskComponent} from "./features/task_features/update-task/update-task.component";
import {ColumnComponent} from "./features/column_features/column/column.component";
import {CreateColumnComponent} from "./features/column_features/create-column/create-column.component";
import {UpdateColumnComponent} from "./features/column_features/update-column/update-column.component";
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./features/user_features/user/user.component";
import {CreateUserComponent} from "./features/user_features/create-user/create-user.component";
import {UpdateUserComponent} from "./features/user_features/update-user/update-user.component";
import {TaskDetailsComponent} from "./features/task_features/task-details/task-details.component";
import {CreateSubtaskComponent} from "./features/subtask_features/create-subtask/create-subtask.component";
import {UpdateSubtaskComponent} from "./features/subtask_features/update-subtask/update-subtask.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "tasks", component: TasksComponent},
  {path: "create-task/:id", component: CreateTaskComponent},
  {path: "create-subtask/:id", component: CreateSubtaskComponent},
  {path: "update-task/:id", component: UpdateTaskComponent},
  {path: "column", component: ColumnComponent},
  {path: "create-column", component: CreateColumnComponent},
  {path: "update-column/:id", component: UpdateColumnComponent},
  {path: '', redirectTo: "login", pathMatch: "full"},
  {path: "users", component: UserComponent},
  {path: "create-User", component: CreateUserComponent},
  {path: "update-User/:id", component: UpdateUserComponent},
  {path: "task-details/:id", component: TaskDetailsComponent},
  {path: "update-subtask/:id", component: UpdateSubtaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
