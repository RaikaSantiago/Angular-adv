import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgPipePipe } from './img-pipe.pipe';



@NgModule({
  declarations: [ ImgPipePipe],
  exports: [ ImgPipePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
