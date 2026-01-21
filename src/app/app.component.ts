import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../entities/task/model';
import { ListComponent } from '../shared/ui/list/list.component';
import { TaskItemComponent } from '../shared/ui/task-item/task-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, TaskItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'task-tracker';
  tasks: Task[] = [
    { id: '1', title: 'task 1', done: true },
    { id: '2', title: 'task 2', done: false },
    { id: '3', title: 'task 3', done: true },
  ];
  currentTasks: Task[] = [];
  completedTasks: Task[] = [];
  newTask?: string | null;

  constructor() {}

  ngOnInit(): void {
    this.currentTasks = this.tasks.filter((task) => !task.done);
    this.completedTasks = this.tasks.filter((task) => task.done);
  }

  onToggleDone(id: string) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );

    this.currentTasks = this.tasks.filter((task) => !task.done);
    this.completedTasks = this.tasks.filter((task) => task.done);
  }

  onDeleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    this.currentTasks = this.tasks.filter((task) => !task.done);
    this.completedTasks = this.tasks.filter((task) => task.done);
  }

  onInputChange(value: string) {
    this.newTask = value;
  }

  addTask() {
    if (this.newTask) {
      this.tasks.push({
        done: false,
        id: crypto.randomUUID(),
        title: this.newTask,
      });
    }

    this.currentTasks = this.tasks.filter((task) => !task.done);

    this.newTask = null;
  }
}
