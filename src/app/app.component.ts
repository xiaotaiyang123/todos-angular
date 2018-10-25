import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
const todos = []
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: {
    id: number,
    title: string,
    done: boolean
  }[] = JSON.parse(window.localStorage.getItem('todos' || '[]'))
  public visibility: string = 'all'

  ngOnInit() {
    // 初始化的时候手动调用一次
    this.hashchangeHandler()

    // 注意：这里要 bind this绑定
    window.onhashchange = this.hashchangeHandler.bind(this)
  }
  ngDoCheck() {
    window.localStorage.setItem('todos', JSON.stringify(this.todos))
  }
  get filterTodos() {
    if (this.visibility === 'all') {
      return this.todos
    } else if (this.visibility === 'active') {
      return this.todos.filter(t => !t.done)
    } else if (this.visibility === 'completed') {
      return this.todos.filter(t => t.done)
    }
  }
  hashchangeHandler() {
    // 当用户点击了锚点的时候，我们需要获取当前的锚点标识
    // 然后动态的将根组件中的 visibility 设置为当前点击的锚点标识
    const hash = window.location.hash.substr(1)

    switch (hash) {
      case '/':
        this.visibility = 'all'
        break;
      case '/active':
        this.visibility = 'active'
        break;
      case '/completed':
        this.visibility = 'completed'
        break;
    }
  }
  removeList(index) {
    this.todos.splice(index, 1)
  }
  get toggleAll() {
    return this.todos.every(t => t.done)
  }

  set toggleAll(val: boolean) {
    this.todos.forEach(t => t.done = val)
  }

  addList(e) {
    const val = e.target.value.trim()
    if (val.length === 0) {
      return
    }
    this.todos.push({
      id: todos.length,
      title: e.target.value,
      done: false
    })
    e.target.value = ""
  }
  get numbers() {
    return this.todos.filter(t => !t.done).length
  }
  cleaeComplate() {
    this.todos = this.todos.filter(t => !t.done)
  }
}
