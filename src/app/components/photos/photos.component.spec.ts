import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosComponent } from './photos.component';
import {AppService} from "../services/app.service";
import {ActivatedRoute, Data} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  const appServiceMock = {
    addPhotoToFavorites: (id: number) => null,
    loadMorePhotos: () => null,
    onPhotoDetail: (id: number) => null,
    photosIds$: new BehaviorSubject<number[]>([1,2,3,4,5,6,7,8,9]),
    favoriteIds$: new BehaviorSubject<number[]>([])
  }

  const router = {
    data: new Observable<Data>((observer) => {
      observer.next({ showFavorites: true });
      observer.complete();
    }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotosComponent],
      providers:[
        {provide: AppService, useFactory: () => appServiceMock},
        {provide: ActivatedRoute, useFactory: () => router},
      ]
    });
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add a photo-detail to favorites', () => {
    const spy = spyOn(appServiceMock, 'addPhotoToFavorites');
    component.addPhotoToFavorites(2);
    expect(spy).toHaveBeenCalledWith(2);
  });

  it('should load more photos', () => {
    const spy = spyOn(appServiceMock, 'loadMorePhotos');
    component.loadMorePhotos();
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to photo-detail detail', () => {
    const spy = spyOn(appServiceMock, 'onPhotoDetail');
    component.onPhotoDetail(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call loadMorePhotos on scroll', () => {
    const spy = spyOn(appServiceMock, 'loadMorePhotos');
    component.onScroll({target: {offsetHeight: 100, scrollTop: 100, scrollHeight: 200}});
    expect(spy).toHaveBeenCalled();
  });
});
