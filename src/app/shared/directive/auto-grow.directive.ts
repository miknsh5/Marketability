import {Directive, ElementRef, HostListener} from "@angular/core";

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
        nativeElement.style.overflow = 'hidden';
        nativeElement.style.height = 'auto';
        nativeElement.style.height = nativeElement.scrollHeight + "px";
    }
}