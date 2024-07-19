import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

const MIN_DELAY = 200;
const MAX_DELAY = 300;
@Injectable({
  providedIn: 'root'
})
export class AppService {
  menuOptions = ['Photos', 'Favorites'];
  activeItem = 'Photos';
  photosIds$ = new BehaviorSubject<number[]>([]);
  favoriteIds$ = new BehaviorSubject<number[]>([]);
  loading = false;
  constructor(private router: Router) {
    this.photosIds$.next(Array.from({length: 12}, () => Math.floor(Math.random() * 1000) + 1));
    this.router.navigate(['']);
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteIds') || '[]');
    if(favoriteIds) {
      this.favoriteIds$.next(favoriteIds);
    }
  }

  activeItemChange(item: string) {
    this.activeItem = item;
    if(item === 'Favorites') {
      this.router.navigate(['/favorites']);
    }else{
      this.router.navigate(['']);
    }
  }

  addPhotoToFavorites(photoId: number) {
    this.favoriteIds$.next([...this.favoriteIds$.getValue(), photoId]);
    localStorage.setItem('favoriteIds', JSON.stringify(this.favoriteIds$.getValue()));
  }

  removePhotoFromFavorites(photoId: number) {
    this.favoriteIds$.next(this.favoriteIds$.getValue().filter(id => id !== photoId));
    localStorage.setItem('favoriteIds', JSON.stringify(this.favoriteIds$.getValue()));
    this.router.navigate(['/favorites']);
  }

  loadMorePhotos() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      const lastId = this.photosIds$.getValue().slice(-1)[0]; // get last id
      const newPhotosIds = Array.from({length: 9}, (_, i) => i + lastId + 1);
      this.photosIds$.next([...this.photosIds$.getValue(), ...newPhotosIds]);
    }, Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1) + MIN_DELAY));
  }

  onPhotoDetail(photoId: number) {
    this.router.navigate(['/photos', photoId]);
  }

  toogleDarkMode($event: boolean) {
    document.body.classList.toggle('dark-mode',$event);
  }
}
