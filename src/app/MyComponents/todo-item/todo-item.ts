import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Todo} from "../../Todo"; 
@Component({
  selector: 'app-todo-item',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.css'],
})
export class TodoItem {
@Input() todo!: Todo;
@Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
@Output() todoToggle: EventEmitter<Todo> = new EventEmitter();

onClick(todo:Todo){
  this.todoDelete.emit(todo);
  console.log("Delete Clicked");
}
onCheckboxClick(todo:Todo){
  this.todoToggle.emit(todo);
  console.log("Checkbox Clicked");}
}