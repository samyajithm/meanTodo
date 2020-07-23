import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData, List} from "../../../../types/tasks";
import {ConfirmDialogComponent} from "../../../common/confirm-dialog/confirm-dialog.component";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  taskDetailsForm;
  item: any;
  minDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.taskDetailsForm = new FormGroup({
      name: new FormControl({value: '', disabled: this.data.isFieldDisabled}),
      description: new FormControl({value: '', disabled: this.data.isFieldDisabled}),
      createdOn: new FormControl({value: '', disabled: true}),
      completedOn: new FormControl({value: '', disabled: true}),
      dueBy: new FormControl({value: '', disabled: this.data.isFieldDisabled})
    });

    if (this.data && this.data.taskItem) {
      this.item = JSON.parse(JSON.stringify(this.data.taskItem))
      this.taskDetailsForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        createdOn: new Date(this.item.createdOn),
        completedOn: this.item.completedOn ? new Date(this.item.completedOn) : '',
        dueBy: this.item.dueBy ? new Date(this.item.dueBy) : ''
      });
    }
  }

  /*Function to update value of given key*/
  updateValue(key: string, value: any){
    if(this.item && !this.data.isFieldDisabled){
      this.item[key] = value;
    }
  }

  closeDialog(data: any) {
    if(data) {
      this.item.completed = this.item.tempCompleted;
      delete this.item.tempCompleted;
      data.taskItem = this.item;
      if (this.taskDetailsForm.value && !this.taskDetailsForm.untouched) {
        Object.keys(this.taskDetailsForm.value).forEach(key => {
          data.taskItem[key] = this.taskDetailsForm.value[key]
        })
      }
    }
    this.dialogRef.close(data);
  }

  checkOverDue(date) {
    if(date) {
      return new Date(date) < new Date();
    } else {
      false
    }
  }
}
