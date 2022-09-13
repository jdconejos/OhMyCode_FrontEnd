import { Observable } from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Todo} from './todo';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {  }

  public getAllTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}/todos`);
  }

  public getTodosByUser(userId: Number): Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.url}/todos?userId=${userId}`);
  }

  public addTodo(todo : Todo): Observable<Todo>{
    return this.http.post<Todo>(`${this.url}/todos`, todo);
  }

  public editTodo(todo : Todo): Observable<Todo>{
    return this.http.put<Todo>(`${this.url}/todos/${todo.id}`, todo);
  }

  public deleteTodo(todoId : Number): Observable<void>{
    return this.http.delete<void>(`${this.url}/todos/${todoId}`);
  }
}
