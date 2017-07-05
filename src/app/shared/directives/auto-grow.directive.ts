import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[mkbAutoGrow]',
})
export class AutoGrowDirective implements AfterViewInit {

  public timer;

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.adjust();
  }

  adjust(): void {
    const nativeElement = this.element.nativeElement as HTMLTextAreaElement;
    setTimeout(() => {
      $(nativeElement).trigger('autoresize');
    }, 1000);
  }

}
