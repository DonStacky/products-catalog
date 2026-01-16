import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from '../entities/task/model';
import { mutableUpdateTask, updateTask } from '../features/task/task';
import { ListComponent } from '../shared/ui/list/list.component';
import { TaskItemComponent } from '../shared/ui/task-item/task-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, TaskItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'task-tracker';
  tasks: Task[] = [
    { id: 1, title: 'task 1', done: true },
    { id: 2, title: 'task 2', done: false },
    { id: 3, title: 'task 3', done: true },
  ];
  constructor() {
    mutableUpdateTask(this.tasks, 2, { title: 'newTitle' });

    updateTask(this.tasks, 3, { title: 'updateTask' });
  }

  onToggleDone(id: number) {
    console.log('id', id);
  }

  onDeleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
