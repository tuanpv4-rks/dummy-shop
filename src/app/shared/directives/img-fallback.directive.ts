import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appImgFallback]',
})
export class ImgFallbackDirective {
  private el = inject(ElementRef);

  @HostListener('error')
  public handleImageError(): void {
    this.el.nativeElement.src = 'https://placehold.co/160';
  }
}
