import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogData, List, Tasks, GetTaskParam, AddTaskBody} from "../../../types/tasks";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {FormControl} from "@angular/forms";
import {TodoService} from "../../../services/todo/todo.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../common/confirm-dialog/confirm-dialog.component";
import {TaskDetailsComponent} from "../task/task-details/task-details.component";
import { LoadingService } from 'ui/app/services/loading/loading.service';
import {finalize} from 'rxjs/internal/operators';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, DoCheck {

  title: string = 'Tasks';
  state: string = ''
  newTaskInput = new FormControl('');
  tasks: Tasks = {
    tasks: [],
    totalCount: 0
  };
  originalTask: List [];
  pageSize: any = 5;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage: any = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(public activatedRoute: ActivatedRoute,
              public todoService: TodoService,
              public dialog: MatDialog,
              public loadingService: LoadingService) {
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (this.activatedRoute.snapshot && this.activatedRoute.snapshot.firstChild && this.state != this.activatedRoute.snapshot.firstChild.data['state']) {
      this.title = this.activatedRoute.snapshot.firstChild.data['title'];
      this.state = this.activatedRoute.snapshot.firstChild.data['state'];
      this.tasks = {
        totalCount: 0,
        tasks: []
      }
      this.loadingService.startLoading();
      this.getTasks(this.state, this.pageSize, this.currentPage);
    }
  }

  getTasks(state: string, pageSize?: number , page?: number) {
      const params: GetTaskParam = {
        state: state
      }
      page += 1;
      if(pageSize && page) {
        params.pageSize = pageSize;
        params.page = page;
      }

      this.todoService.getTaskList(params)
      .pipe(finalize(() => {
        this.loadingService.stopLoading();
      }))
      .subscribe((result: Tasks) => {
        this.tasks.tasks = result.tasks;
        this.originalTask = JSON.parse(JSON.stringify(result.tasks));
        this.tasks.totalCount = result.totalCount;
      }, error => {
        this.tasks = {
          totalCount: 0,
          tasks: []
        }
        console.log(error);
      });
  }

  addNewTask() {
    if (this.newTaskInput.value && this.newTaskInput.value.trim() != '') {
      let item: AddTaskBody = {
        name: this.newTaskInput.value,
      }
      if (this.state == 'important') {
        item.important = true;
      } else if (this.state == 'scheduled') {
        item.dueBy = new Date();
      }
      this.loadingService.startLoading();
      this.todoService.addTask(item)
      .pipe(finalize(() => {
        this.loadingService.stopLoading();
      }))
      .subscribe((result: any) => {
        if(result && result.tasks){
          this.newTaskInput.patchValue('');
          const lastPage = Math.ceil((this.tasks.totalCount + 1) / this.pageSize) - 1;
          if(this.currentPage != lastPage) {
            this.gotoPage(lastPage);
          } else {
            this.gotoPage(this.currentPage)
          }  
        }
      }, error => {
          console.log(error);
      }) 
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks.tasks, event.previousIndex, event.currentIndex);
    this.updateIndex(this.tasks.tasks);
  }

  updateIndex(list: List[]) {
    if (list && list.length > 0) {
      list.forEach((item, index) => {
        item.index = index;
        let oIndex = this.originalTask.findIndex(task => task._id == item._id);
        if (oIndex >= 0) {
          if(this.originalTask[oIndex].index != item.index) {
            this.originalTask[oIndex].index = item.index
            const bodyObj = {};
            bodyObj['index'] = item.index;
            this.updateTask(item._id, bodyObj)          
          }
        }
      })
    }
  }

  deleteTask(item: List, state: string) {
    const data: DialogData = {
      title: 'Delete',
      content: `Are you sure you want to permanently delete <b>${item.name} </b>?`,
      confirmButton: 'Delete',
      cancelButton: 'Cancel'
    }
    this.openConfirmDialog(data, () => {
      this.loadingService.startLoading();
      this.todoService.deleteTask(item._id)
      .pipe(finalize(() => {
        this.loadingService.stopLoading();
      }))
      .subscribe(result => {
        const lastPage = Math.ceil((this.tasks.totalCount - 1) / this.pageSize) - 1;
        if(this.currentPage > lastPage) {
          this.gotoPage(lastPage);
        } else {
          this.gotoPage(this.currentPage)
        }  
      }, error => {
        console.log(error);
      })
    });
  }

  updateTask(id, body, succCallback?: Function, errCallback?: Function, finalCallback?: Function) {
    this.todoService.updateTask(id, body)
    .pipe(finalize(() => {
      if(finalCallback) {
        finalCallback()
      }
    }))
    .subscribe(result => {
      if(succCallback){
        succCallback(result);
      }
    }, error => {
      if(errCallback) {
        errCallback(error);
      }
    })
  }

  markAs(item: List, key: string, flag: boolean) {
    if(key == 'important' && item.completed) {
      return;
    }
    let bodyObj = {}
    bodyObj[key] = flag;
    this.updateTask(item._id, bodyObj, (result) => {
      if(this.state != 'pending' && this.state != 'scheduled') {
        const lastPage = Math.ceil((this.tasks.totalCount - 1) / this.pageSize) - 1;
        if(this.currentPage > lastPage) {
          this.gotoPage(lastPage);
        } else {
          this.gotoPage(this.currentPage)
        }  
      } else {
        this.gotoPage(this.currentPage)
      }
    }, (error) => {
        console.log(error);
    })
  }

  checkOverDue(date) {
    if(date) {
      return new Date(date) < new Date();
    } else {
      return false;
    }
  }

  openConfirmDialog(data, successCallback, errorCallback?) {
    let confirmDialog = this.dialog.open(ConfirmDialogComponent, <MatDialogConfig>{
      panelClass: 'confirm-dialog',
      disableClose: true,
      hasBackdrop: true,
      data: data
    })

    confirmDialog.afterClosed().subscribe(response => {
      if (response) {
        successCallback();
      }
    })
  }

  editTask(item: List) {
    let data: DialogData = {
      title: 'Task Details',
      cancelButton: 'Cancel',
      taskItem: item
    }

    if (this.state == 'completed') {
      data.isFieldDisabled = true;
    } else {
      data.isFieldDisabled = false;
      data.confirmButton = 'Update';
    }

    let editDialog = this.dialog.open(TaskDetailsComponent, <MatDialogConfig>{
      panelClass: 'details-dialog',
      hasBackdrop: true,
      data: data
    })

    editDialog.afterClosed().subscribe((response: DialogData) => {
      if (response) {
        this.loadingService.startLoading();
        this.updateTask(item._id, response.taskItem, (result) => {
          this.getTasks(this.state, this.pageSize, this.currentPage);
        }, (error) => {
          console.log(error);
        }, () => {
          this.loadingService.stopLoading();
        })
      }
    });
  }

  onPageChange(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.loadingService.startLoading();
    this.getTasks(this.state, this.pageSize, this.currentPage);
  }

  gotoPage(pageNum) {
    this.paginator.pageIndex = pageNum,
    this.paginator.page.next({      
         pageIndex: pageNum,
         pageSize: this.pageSize,
         length: this.tasks ? this.tasks.totalCount : this.pageSize
       });
  }
}
