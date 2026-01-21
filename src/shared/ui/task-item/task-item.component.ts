import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../entities/task/model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() completed: boolean = false;

  @Output() toggleDone = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
}
