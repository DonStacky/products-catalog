import { NgFor, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

interface ListItemContext<T> {
  $implicit: T;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgTemplateOutlet, NgStyle],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent<T> {
  @Input() items: T[] = [];
  @Input() itemTemplate!: TemplateRef<ListItemContext<T>>;
  @Input() width: string = 'auto';
}
