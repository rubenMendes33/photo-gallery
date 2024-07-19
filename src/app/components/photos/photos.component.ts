import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of, Subject, take, takeUntil} from "rxjs";

const SCROLL_MARGIN = 5;
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotosComponent implements OnInit, OnDestroy{
  private readonly destroy$ = new Subject();

  photosIds$: Observable<number[]> = of([]);
  favoriteIds: number[] = [];
  showFavorites: boolean = false;

  constructor( private appService: AppService,
               private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.pipe(take(1), takeUntil(this.destroy$)).subscribe((data) => this.showFavorites = data['showFavorites']);
    this.photosIds$ = this.appService.photosIds$.asObservable().pipe(takeUntil(this.destroy$));
    this.appService.favoriteIds$.pipe(takeUntil(this.destroy$)).subscribe(favoriteIds => this.favoriteIds = favoriteIds);
  }

  addRemovePhotoToFavorites(photoId: number) {
    if(!this.favoriteIds.includes(photoId)) {
      this.appService.addPhotoToFavorites(photoId);
    }else{
      this.appService.removePhotoFromFavorites(photoId);
    }
  }

  loadMorePhotos() {
    this.appService.loadMorePhotos();
  }

  onScroll (event: any) {
    if ((event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - SCROLL_MARGIN) &&
      !this.showFavorites) {
      this.loadMorePhotos();
    }
  };

  onPhotoDetail(photoId: number) {
    this.appService.onPhotoDetail(photoId);
  }

  photoId(index: number, photoId: number) {
    return photoId;
  }

  favoriteId(index: number, photoId: number) {
    return photoId;
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
