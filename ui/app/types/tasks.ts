export interface Tasks {
  totalCount: number,
  tasks: List[]
}

export interface List {
  name: string,
  _id: any,
  index: string | number,
  important?: boolean,
  completed? : boolean,
  completedOn?: Date,
  createdOn?: Date,
  dueBy?: Date,
  description?: string,
  hideItem?: boolean
}

export interface DialogData {
  title: string,
  content?: any,
  confirmButton?: string,
  cancelButton?: string,
  taskItem?: List,
  isFieldDisabled?: boolean
}

export interface Sidebar {
  link: string,
  translateKey: any,
  iconName: string,
}

export interface GetTaskParam {
  state: string | "pending" | "completed" | "important" | "scheduled",
  pageSize?: any,
  page?: any
}

export interface AddTaskBody {
  name: string,
  description?: string,
  important?: boolean,
  dueBy?: Date
}