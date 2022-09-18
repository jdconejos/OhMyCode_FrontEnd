import {Component, OnInit} from '@angular/core';
import {Todo} from "./todo/todo";
import {TodoService} from "./todo/todo.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {TodoRequest} from "./todo/todoRequest";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'OhMyCode_FrontEnd';

  public todoList: Todo[] = [];
  public formText = "";
  public selectedElementId = 1;
  public selectedRowIndex = 1;
  public requestType = "post";
  public loggedUser = ''

  createForm = new FormGroup({
    userId: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    title: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(1)])),
    completed: new FormControl(false)
  });

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private todoService: TodoService, private cookie: CookieService) {}

  ngOnInit() {
    this.getAllTodos();
  }

  public resetText(): void{
    this.formText = "";
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

  public userIdBoxChange(userName: String): void {
    if (userName == '') return this.getAllTodos();

    this.todoService.getTodosByUser(userName).subscribe(
      (response: Todo[]) => {
        this.selectedElementId = 1;
        this.selectedRowIndex = 1;

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
      let newTodo = {} as TodoRequest;
      newTodo.title = <string>this.createForm.value.title;
      // @ts-ignore
      newTodo.userId = this.createForm.value.userId;
      newTodo.completed = <boolean>this.createForm.value.completed;

      this.todoService.addTodo(newTodo).subscribe(
        (response: Todo) => {
          this.formText = "Todo created successfully"
          this.createForm.reset();
          console.log(response)

          //updating local copy
          this.todoList.push(response);

        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }
    if(this.requestType == 'put') {

      let newTodo = {} as TodoRequest;

      newTodo.id = this.selectedElementId;
      newTodo.title = <string>this.createForm.value.title;
      // @ts-ignore
      newTodo.userId = this.createForm.value.userId;
      newTodo.completed = <boolean>this.createForm.value.completed;

      this.todoService.editTodo(newTodo).subscribe(
        (response: Todo) => {
          this.formText = "Todo edited successfully"
          this.createForm.reset();

          //updating local copy
          this.todoList[this.selectedRowIndex].title = response.title;
          this.todoList[this.selectedRowIndex].user = response.user;
          this.todoList[this.selectedRowIndex].completed = response.completed;

          console.log(response)
        },
        (error: HttpErrorResponse) => {
          this.formText = "Unauthorized to edit this TODO"
        }
      )
    }
    return;
  }

  loginSubmit() {

    const correctMssg = "Logged in successfully"
    const wrongMssg = "Wrong username/password"

    if (this.loginForm.invalid) {
      return;
    }

    if(this.loginForm.value.password != 'admin') {
      this.formText = wrongMssg;
      return;
    }

    if(this.loginForm.value.username == 'user1') {
      this.cookie.set('token', '1', 1);
      this.formText = correctMssg;
      return;
    }

    if(this.loginForm.value.username == 'user2') {
      this.cookie.set('token', '2', 1);
      this.formText = correctMssg;
      return;
    }

    if(this.loginForm.value.username == 'user3') {
      this.cookie.set('token', '3', 1);
      this.formText = correctMssg;
      return;
    }

    this.formText = wrongMssg;
  }

  editClick(elemId: number, elemIndex: number) {
    this.resetText();
    this.setRequestType('put');
    this.selectElement(elemId, elemIndex);

    //initializing the dialog
    this.createForm.value.title = this.todoList[this.selectedRowIndex].title;
    this.createForm.value.userId = String(this.todoList[this.selectedRowIndex].user.id);
    this.createForm.value.completed = this.todoList[this.selectedRowIndex].completed;

  }
}
