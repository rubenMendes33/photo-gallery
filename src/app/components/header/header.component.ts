import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() items: string[] = [];
  @Input() activeItem: string = "";
  @Output() activeItemChange$= new EventEmitter();
  @Output() toogleDarkMode$= new EventEmitter();
  isDarkMode: boolean = false;
  emitClickEvent(item: string) {
    this.activeItemChange$.emit(item);
  }

  toogleDarkMode(){
    this.isDarkMode = !this.isDarkMode;
    this.toogleDarkMode$.emit(this.isDarkMode);
  }
}
