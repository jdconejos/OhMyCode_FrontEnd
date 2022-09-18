//interfaz que indica la informacion de un TODO

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: {
    id: number;
    name: string;
    username: string;
    address: {
      street: string;
      city: string;
      zipcode: string;
      country: string;
    }
  }
}
