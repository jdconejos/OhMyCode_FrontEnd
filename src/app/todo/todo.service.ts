import { Observable } from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Todo} from './todo';
import {TodoRequest} from './todoRequest';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = environment.backEndUrl;

  constructor(private http: HttpClient) {  }

  public getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}/todos`);
  }

  public getTodosByUser(username: String): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}/todos?username=${username}`);
  }

  public addTodo(todo : TodoRequest): Observable<Todo>{
    return this.http.post<Todo>(`${this.url}/todos`, todo);
  }

  public editTodo(todo : TodoRequest): Observable<Todo>{
    return this.http.put<Todo>(`${this.url}/todos/${todo.id}`, todo);
  }

  public deleteTodo(todoId : Number): Observable<void>{
    return this.http.delete<void>(`${this.url}/todos/${todoId}`);
  }
}
