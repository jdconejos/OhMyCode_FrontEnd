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

  userIdBoxChange(userId: String): void {
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

    let newTodo = {} as Todo;
    newTodo.title = <string>this.createForm.value.title;
    // @ts-ignore
    newTodo.userId = this.createForm.value.userId;
    newTodo.completed = <boolean>this.createForm.value.completed;

    this.todoService.addTodo(newTodo).subscribe(
      (response: Todo) => {
        this.createFormText = "Todo created successfully"
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )

  }

}
