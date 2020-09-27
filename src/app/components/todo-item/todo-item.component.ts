import { TodoService } from './../../services/todo.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // set dyamic classes
  setClasses() {
    const classes = {
      todo: true,
      'is-complete': this.todo.completed,
    };
    return classes;
  }

  onToggle(todo: Todo): void {
    console.log('toogle', todo);
    todo.completed = !todo.completed;

    // toggle on server
    this.todoService.toggleCompleted(todo).subscribe((t) => console.log(t));
  }

  onDelete(todo): void {
    console.log('delete');
    this.deleteTodo.emit(todo);
  }
}
