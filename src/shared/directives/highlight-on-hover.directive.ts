import { Directive } from '@angular/core';

@Directive({
  selector: '[highlightOnHover]',
  standalone: true,
  host: {
    '[class.highlight-on-hover]': 'true',
  },
})
export class HighlightOnHoverDirective {

  constructor() { }

}
