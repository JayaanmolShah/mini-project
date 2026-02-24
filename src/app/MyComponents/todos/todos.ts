import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Todo} from "../../Todo"; 
import {TodoItem} from "../todo-item/todo-item";  
import {AddTodo} from "../add-todo/add-todo";
import { Sheet } from "../sheet/sheet"; 
@Component({
  selector: 'app-todos',
  imports: [CommonModule, TodoItem, AddTodo, Sheet],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit{
  // todos: Todo[]=[];
  // localItem:string | null;
  // constructor(){
  //   this.localItem=localStorage.getItem("todos");
  //   if(this.localItem==null){
  //     this.todos=[];
  //   }
  //   else{      
  //     this.todos=JSON.parse(this.localItem);
  //   }

  // }
  ngOnInit(): void{
  }
// deleteTodo(todo:Todo){
//   console.log(todo);
//   const index = this.todos.indexOf(todo);
//   this.todos.splice(index,1);

// localStorage.setItem("todos",JSON.stringify(this.todos));

// }

//   addTodo(todo:Todo){
//   console.log(todo);
//   this.todos.push(todo);
//   localStorage.setItem("todos",JSON.stringify(this.todos));
// }

// toggleTodo(todo: Todo) {
//   todo.active = !todo.active;
//   localStorage.setItem("todos", JSON.stringify(this.todos));
// }
}
