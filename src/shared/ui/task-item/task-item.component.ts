import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../entities/task/model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;

  @Output() toggleDone = new EventEmitter<number>();
  @Output() deleteTask = new EventEmitter<number>();
}
