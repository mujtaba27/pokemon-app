import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { UserStateManagementService } from '../services/user-state-management.service';

@Directive({
  selector: '[appFavorites]',
  standalone: true,
})
export class FavoritesDirective implements OnInit, AfterViewChecked {
  @Input('appFavorites') siblingSelector: string = '';

  constructor(
    private el: ElementRef,
    private userManagement: UserStateManagementService,
    private renderer: Renderer2
  ) {}

  ngAfterViewChecked(): void {
    const buttonElement = this.el.nativeElement;

    const h3ElementText = this.el.nativeElement
      .closest('mat-card')
      .querySelector(this.siblingSelector).innerText;

    if (h3ElementText) {
      const isInArray = this.userManagement.isValueInArray(
        h3ElementText.trim().toLowerCase()
      );
      if (isInArray) {
        // Change button color
        this.renderer.setStyle(buttonElement, 'color', 'green');
        this.renderer.setProperty(
          buttonElement,
          'innerText',
          'UnMark as Favorite'
        );
      } else {
        // Reset to the default button state if not in array
        this.renderer.setStyle(buttonElement, 'color', 'red');
        this.renderer.setProperty(
          buttonElement,
          'innerText',
          'Mark as Favorite'
        );
      }
    }
  }

  ngOnInit(): void {
    // if (
    //   this.userManagement.isValueInArray(
    //     this.el.nativeElement.children[0].innerText
    //   )
    // ) {
    //   this.renderer.setAttribute(
    //     this.el.nativeElement.children[1].children[1],
    //     'disabled',
    //     'true'
    //   );
    //   this.renderer.setStyle(
    //     this.el.nativeElement.children[1].children[1],
    //     'backgroundColor',
    //     'green'
    //   );
    // } else {
    //   this.renderer.removeAttribute(
    //     this.el.nativeElement.children[1].children[1],
    //     'disabled'
    //   );
    //   this.renderer.setStyle(
    //     this.el.nativeElement.children[1].children[1],
    //     'backgroundColor',
    //     'red'
    //   );
    // }
  }
}
