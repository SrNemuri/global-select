import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[scroller]'
})
export class ScrollerDirective {
  constructor() {}

  @HostListener('scroll', ['$event']) scrolling(event: any) {
    const element = event.target;
    const arrow = element.querySelectorAll('.arrow-scroll')[0];
    if(arrow){
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        arrow.style.visibility = 'hidden';
      } else {
        arrow.style.visibility = 'visible';
      }
    }
  }
}

// element.addEventListener('scroll', function(event) {
//   var element = event.target;
//   if (element.scrollHeight - element.scrollTop === element.clientHeight) {
//     console.log('bottom');
//   }else{
//     console.log('not bottom')
//   }
// });
