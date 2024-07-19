import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PhotosComponent} from "./components/photos/photos.component";

const routes: Routes = [
  {
    path: 'xxx/:xxx',
    component: PhotosComponent
  },
  {
    path: '',
    component: PhotosComponent,
    pathMatch: 'full'
  }, {
    path: 'favorites',
    component: PhotosComponent,
    data: {showFavorites: true}
  },{
    path: 'photos/:photoId',
    loadChildren: () => import('./components/photo-detail/photo-detail.module').then(m => m.PhotoDetailModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

