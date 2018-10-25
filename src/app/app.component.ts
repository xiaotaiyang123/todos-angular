import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
const todos = [{
  id: 1,
  title: "记得回复静安寺",
  done: true
}, {
  id: 2,
  title: "蓝点似绯鲤",
  done: false
}, {
  id: 3,
  title: "发了四大皆空",
  done: true
}]
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
  }[] = todos

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
}
