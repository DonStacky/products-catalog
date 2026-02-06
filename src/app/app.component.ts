import { ChangeDetectionStrategy, Component, computed, ElementRef, Signal, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { debounceTime, fromEvent, Observable, Subscription } from 'rxjs';
import { Task } from '../entities/task/model';
import { FilterByPipe } from '../shared/pipes/filter-by.pipe';
import { ListComponent } from '../shared/ui/list/list.component';
import { TaskItemComponent } from '../shared/ui/task-item/task-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListComponent, TaskItemComponent, FilterByPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'task-tracker';
  tasks = signal<Task[]>([
    { id: '1', title: 'task 1', done: true },
    { id: '2', title: 'task 2', done: false },
    { id: '3', title: 'task 3', done: true },
  ]);
  currentTasks: Signal<Task[]> = computed(() => this.tasks().filter((task) => !task.done));
  completedTasks: Signal<Task[]> = computed(() => this.tasks().filter((task) => task.done));
  filteredTasks?: Signal<Task[]>;
  newTask = signal<string>('');
  searchTask$?: Observable<string>;
  searchSubscription?: Subscription;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    console.log(this.searchInput.nativeElement);

    this.searchTask$ = fromEvent<string>(
      this.searchInput.nativeElement,
      'input'
    );

    this.searchSubscription = this.searchTask$.pipe(debounceTime(300)).subscribe({
      next: (value: string) => {
        console.log(value);
        this.filteredTasks = computed(() => {
          console.log(value);
          return this.tasks().filter((task) => task.title.includes(value))
        });
      }
    });
  }

  onToggleDone(id: string) {
    const newTasks = this.tasks().map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    )

    this.tasks.set(newTasks);
  }

  onDeleteTask(id: string) {
    const newTasks = this.tasks().filter((task) => task.id !== id);

    this.tasks.set(newTasks);
  }

  onInputChange(value: string) {
    this.newTask.set(value);
  }

  addTask() {
    if (this.newTask()) {
      this.tasks.update((tasks) => [...tasks, {
        done: false,
        id: crypto.randomUUID(),
        title: this.newTask()
      }])
    }

    this.newTask.set('');
  }

  completeAllTasks() {
    const newTasks = this.tasks().map((task) => ({ ...task, done: true }));

    this.tasks.set(newTasks);
  };
}
