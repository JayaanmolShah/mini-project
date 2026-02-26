import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Sheet} from "../sheet/sheet";

@Component({
  selector: 'app-todos',
  imports: [CommonModule,Sheet],
  standalone: true,
  templateUrl: './todos.html',
  styleUrls: ['./todos.css'],
})
export class Todos implements OnInit{
  ngOnInit(): void{
  }
}
