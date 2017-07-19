import { Directive, ElementRef, HostListener, AfterContentChecked } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[mkbAutoGrow]',
})
export class AutoGrowDirective implements AfterContentChecked {

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {

  }

  ngAfterContentChecked(): void {
    this.adjust();
  }

  adjust(): void {
    const nativeElement = this.element.nativeElement as HTMLTextAreaElement;
    setTimeout(() => { $(nativeElement).trigger('autoresize'); }, 0);
  }
}
