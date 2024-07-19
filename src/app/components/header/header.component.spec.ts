import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[MatButtonToggleModule],
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event after a button clicked', () => {
    const testItem = 'testItem';
    spyOn(component.activeItemChange$, 'emit');

    component.emitClickEvent(testItem);

    expect(component.activeItemChange$.emit).toHaveBeenCalledWith(testItem);
  });
});
