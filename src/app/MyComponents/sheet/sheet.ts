import { Component , OnInit} from '@angular/core';
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';
import {AddTodo} from "../add-todo/add-todo";
import {TodoItem} from "../todo-item/todo-item";
import {Todo} from "../../Todo"; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet',
  imports: [CommonModule,TabList, Tab, Tabs, TabPanel, TabContent, AddTodo, TodoItem],
  templateUrl: './sheet.html',
  styleUrl: './sheet.css',
  standalone: true
})
export class Sheet implements OnInit
{
  todos: Todo[]=[];
  localItem:string | null;
  constructor(){
    this.localItem=localStorage.getItem("todos");
    if(this.localItem==null){
      this.todos=[];
    }
    else{      
      this.todos=JSON.parse(this.localItem);
    }

  }
  ngOnInit(): void{
  }
deleteTodo(todo:Todo){
  console.log(todo);
  const index = this.todos.indexOf(todo);
  this.todos.splice(index,1);

localStorage.setItem("todos",JSON.stringify(this.todos));

}addTodo(todo:Todo){
  console.log(todo);
  this.todos.push(todo);
  localStorage.setItem("todos",JSON.stringify(this.todos));
}

toggleTodo(todo: Todo) {
  todo.active = !todo.active;
  localStorage.setItem("todos", JSON.stringify(this.todos));
}}
