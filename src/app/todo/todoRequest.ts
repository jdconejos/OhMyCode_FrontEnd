//interfaz utilizada para enviar solicitudes al servidor

export interface TodoRequest {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
