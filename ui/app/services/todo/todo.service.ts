import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { GetTaskParam, AddTaskBody } from '../../types/tasks';

/*
*   Service to handle all the CRUD operations of tasks
*/

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  serverUrl = environment.server ? environment.server : '';
  taskUrl = this.serverUrl + '/tasks/'

  constructor(private http: HttpClient) { }

  /* Service to fetch the task*/
  getTaskList(param: GetTaskParam) {
    return this.http.get(this.taskUrl, {
      params: <any>param
    });
  }

  /*Service to fetch task by id*/
  getTaskById(id: any) {
    const url = this.taskUrl + id;
    return this.http.get(url);
  }

  /*Service to create new task*/
  addTask(obj: AddTaskBody) {
    return this.http.post(this.taskUrl, obj);
  }

  /*Service to update task*/
  updateTask(id: any, obj: any) {
    const url = this.taskUrl + id;
    return this.http.patch(url, obj);
  }

  /*Service to delete task*/
  deleteTask(id: any) {
    const url = this.taskUrl + id;
    return this.http.delete(url);
  }

  /*Service to store into local storage*/
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /*Service to fetch items from local storage*/
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

}
