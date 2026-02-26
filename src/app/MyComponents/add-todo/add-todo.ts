import { Component ,EventEmitter,Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../Todo';
@Component({
  selector: 'app-add-todo',
  imports: [CommonModule,FormsModule],
  standalone: true,
  templateUrl: './add-todo.html',
  styleUrls: ['./add-todo.css'],
})
export class AddTodo {
  title!: string;
desc!:string;
@Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
constructor(){}
Onsubmit(form:any){
  if (form.invalid || !this.title?.trim()){
    alert("Please enter a title.");
    return;
  }
  const todo={
    sno: 1,
    title: this.title,
    desc: this.desc,
    active: true
  };
  this.todoAdd.emit(todo);
  form.resetForm();
}
}
