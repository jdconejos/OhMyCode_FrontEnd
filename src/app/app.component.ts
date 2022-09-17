import {Component, OnInit} from '@angular/core';
import {Todo} from "./todo/todo";
import {TodoService} from "./todo/todo.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OhMyCode_FrontEnd';

  public todoList: Todo[] = [];
  public createFormText = "";
  public selectedElementId = 1;
  public selectedRowIndex = 1;
  public requestType = "post";

  createForm = new FormGroup({
    userId: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    title: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(1)])),
    completed: new FormControl(false)
  });

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getAllTodos();
  }

  public resetText(): void{
    this.createFormText = "";
  }

  public setRequestType(newType:string): void{
    this.requestType = newType;
  }

  public selectElement(elemId: number, rowIndex: number): void{
    this.selectedElementId = elemId;
    this.selectedRowIndex = rowIndex;
  }

  public getAllTodos(): void {
    this.todoService.getAllTodos().subscribe(
      (response: Todo[]) => {
        this.todoList = response;
        console.log(this.todoList)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public deleteTodo(): void {
    this.todoService.deleteTodo(this.selectedElementId).subscribe(
      () => {
        this.todoList.splice(this.selectedRowIndex, 1)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public userIdBoxChange(userId: String): void {
    if (userId == '') return this.getAllTodos();

    this.todoService.getTodosByUser(Number(userId)).subscribe(
      (response: Todo[]) => {
        this.todoList = response;
        console.log(this.todoList)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    if(this.requestType == 'post') {
      let newTodo = {} as Todo;
      newTodo.title = <string>this.createForm.value.title;
      // @ts-ignore
      newTodo.userId = this.createForm.value.userId;
      newTodo.completed = <boolean>this.createForm.value.completed;

      this.todoService.addTodo(newTodo).subscribe(
        (response: Todo) => {
          this.createFormText = "Todo created successfully"
          this.createForm.reset();
          console.log(response)
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
    if(this.requestType == 'put') {
      let newTodo = {} as Todo;

      newTodo.id = this.selectedElementId;
      newTodo.title = <string>this.createForm.value.title;
      // @ts-ignore
      newTodo.userId = this.createForm.value.userId;
      newTodo.completed = <boolean>this.createForm.value.completed;

      this.todoService.editTodo(newTodo).subscribe(
        (response: Todo) => {
          this.createFormText = "Todo edited successfully"
          this.createForm.reset();

          this.todoList[this.selectedRowIndex].title = newTodo.title;
          this.todoList[this.selectedRowIndex].userId = newTodo.userId;
          this.todoList[this.selectedRowIndex].completed = newTodo.completed;

          console.log(response)
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
    return;
  }

}
