import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImgPipePipe implements PipeTransform {

  transform(img:string, tipo:'usuarios'|'medicos'|'hospitales'): string {
    return 'Hola mundo'+img+tipo;
  }

}
