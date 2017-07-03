import { Directive, ElementRef, HostListener } from "@angular/core";

declare var $: any;

@Directive({
  selector: '[autoGrow]',
})
export class AutoGrowDirective {

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
    let nativeElement = this.element.nativeElement as HTMLTextAreaElement;
    setTimeout(() => { $(nativeElement).trigger('autoresize'); }, 0);
  }
}