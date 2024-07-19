import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailComponent } from './photo-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AppService} from "../services/app.service";
import {BehaviorSubject} from "rxjs";

describe('PhotoComponent', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;

  const appServiceMock ={
    removePhotoFromFavorites: () => null,
    favoriteIds$: new BehaviorSubject([1])
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PhotoDetailComponent],
      providers:[
        {provide: AppService, useFactory: () => appServiceMock},
      ]
    });
    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set photoId and buttonDisabled correctly in ngOnInit', () => {
    component.ngOnInit();
    expect(component.photoId).toBe(0);
    expect(component.buttonDisabled).toBe(true);
  });

  it('should call removePhotoFromFavorites when onRemoveClick is called', () => {
    spyOn(appServiceMock, 'removePhotoFromFavorites');
    component.onRemoveClick();
    expect(appServiceMock.removePhotoFromFavorites).toHaveBeenCalled();
  });
});
