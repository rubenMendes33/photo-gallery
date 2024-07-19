import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PhotoDetailComponent} from "./photo-detail.component";
import {PhotoDetailRoutingModule} from "./photo-detail-routing.module";



@NgModule({
  declarations: [PhotoDetailComponent],
  imports: [
    CommonModule,
    PhotoDetailRoutingModule
  ]
})
export class PhotoDetailModule { }
