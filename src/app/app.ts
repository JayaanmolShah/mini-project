import { Component} from '@angular/core';
import { Todos } from "./MyComponents/todos/todos";

@Component({
  selector: 'app-root',
  standalone: true,  
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [Todos]
})
export class App{
  title = 'banana bread';
  constructor(){}
}
   