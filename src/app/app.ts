import { Component, OnInit } from '@angular/core';
import { Todos } from "./MyComponents/todos/todos";
import { AddTodo } from "./MyComponents/add-todo/add-todo";
import {Sheet} from "./MyComponents/sheet/sheet";
import { FormsModule } from '@angular/forms';
import {Tab, Tabs, TabList, TabPanel, TabContent} from '@angular/aria/tabs';

// import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,  
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Todos, FormsModule,AddTodo,Tab, Tabs, TabList, TabPanel, TabContent,Sheet]
})
export class App{
  title = 'banana bread';
  constructor(){}
}
   