import { Component, OnInit } from '@angular/core';
import { Tab, Tabs, TabList, TabPanel, TabContent } from '@angular/aria/tabs';
import { AddTodo } from "../add-todo/add-todo";
import { TodoItem } from "../todo-item/todo-item";
import { Todo } from "../../Todo";
import { CommonModule } from '@angular/common';
import { TabItem } from "../../TabItem"
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sheet',
  imports: [FormsModule,CommonModule, TabList, Tab, Tabs, TabPanel, TabContent, AddTodo, TodoItem],
  templateUrl: './sheet.html',
  styleUrls: ['./sheet.css'],
  standalone: true
})
export class Sheet implements OnInit {
  tabs: TabItem[] = [];
  selectedTab = '';
  constructor() {
    const localTabs = localStorage.getItem("tabs");
    if (localTabs) {
      this.tabs = JSON.parse(localTabs);
      this.selectedTab = this.tabs[0]?.value || '';
    } else {
      this.tabs = [{ value: 'tab1', title: 'tab1', todos: [] }];
      this.selectedTab = 'tab1';
    }
  }
  ngOnInit(): void { }
  private sortTodos(tab: TabItem) {
  const activeTodos = tab.todos.filter(t => t.active);
  const completedTodos = tab.todos.filter(t => !t.active);
  tab.todos = [...activeTodos, ...completedTodos];
}
  getCurrentTab(): TabItem | undefined {
    return this.tabs.find(tab => tab.value === this.selectedTab);
  }

  addTodo(todo: Todo) {
    const currentTab = this.getCurrentTab();
    if (!currentTab) return;

    const isDuplicate = currentTab.todos.some(
      t => t.title.trim().toLowerCase() === todo.title.trim().toLowerCase()
    );

    if (isDuplicate) {
      alert("A todo with this title already exists in this tab!");
      return;
    }
    todo.sno = currentTab.todos.length > 0
    ? Math.max(...currentTab.todos.map(t => t.sno)) + 1
    : 1;
    currentTab.todos.unshift(todo);
    this.sortTodos(currentTab);
    this.saveTabs();
  }


  deleteTodo(todo: Todo) {
    const currentTab = this.getCurrentTab();
    if (!currentTab) return;

    const index = currentTab.todos.indexOf(todo);
    if (index > -1) currentTab.todos.splice(index, 1);
    this.saveTabs();
  }

  toggleTodo(todo: Todo) {
    const currentTab = this.getCurrentTab();
  if (!currentTab) return;

  // Toggle state
  todo.active = !todo.active;

  // Move completed to bottom
  this.sortTodos(currentTab);

  this.saveTabs();
  }

  addTab() {
    const newIndex = this.tabs.length + 1;
    const newValue = `tab${newIndex}`;
    this.tabs.push({ value: newValue, title: 'Tab ' + newIndex, todos: [] });
    this.selectedTab = newValue; // switch to the new tab
    this.saveTabs();
  }

  removeTab(tabToRemove: TabItem) {
    const index = this.tabs.indexOf(tabToRemove);
    if (index > -1) this.tabs.splice(index, 1);

    // If removed tab was selected, select first tab
    if (this.selectedTab === tabToRemove.value && this.tabs.length > 0) {
      this.selectedTab = this.tabs[0].value;
    }
    this.saveTabs();
  }
  saveTabs() {
    localStorage.setItem("tabs", JSON.stringify(this.tabs));
  }
}
