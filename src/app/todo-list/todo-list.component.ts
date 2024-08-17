import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tarea {
  id: number;
  nombre: string;
  completada: boolean;
}
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./todo-list.component.html",
  styleUrl:"./todo-list.component.css"
})
export class TodoListComponent {
  nuevaTarea: string = '';
  tareas: Tarea[] = this.cargarTareas();

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      const nuevaTarea: Tarea = {
        id: Date.now(),
        nombre: this.nuevaTarea.trim(),
        completada: false
      };
      this.tareas.push(nuevaTarea);
      this.nuevaTarea = '';
      this.guardarTareas();
    }
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    this.guardarTareas();
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  cargarTareas(): Tarea[] {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }
}
