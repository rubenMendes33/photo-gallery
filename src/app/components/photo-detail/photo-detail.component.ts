import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailComponent implements OnInit, OnDestroy{
  private readonly destroy$ = new Subject();

  photoId = 0;
  buttonDisabled = false;
  constructor(private route: ActivatedRoute,
              private appService: AppService) {
  }
  ngOnInit() {
    this.photoId = Number(this.route.snapshot.paramMap.get('photoId'));
    this.appService.favoriteIds$.pipe(takeUntil(this.destroy$)).subscribe(favoriteIds => {
      this.buttonDisabled = !favoriteIds.includes(this.photoId);
    });
  }

  onRemoveClick() {
    this.appService.removePhotoFromFavorites(this.photoId)
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}

