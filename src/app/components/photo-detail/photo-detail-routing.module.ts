import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PhotoDetailComponent} from "./photo-detail.component";

const routes: Routes = [{ path: '', component: PhotoDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoDetailRoutingModule { }
