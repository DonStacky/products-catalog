import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  standalone: true
})
export class FilterByPipe implements PipeTransform {

  transform<T>(items: T[], key: keyof T, value: unknown): T[] {
    return items.filter((item) => {
      return item[key] === value;
    });
  }

}
