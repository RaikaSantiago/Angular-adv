import { environment } from '../../environments/environment.prod';
const base_url = environment.base_url;

export  class Usuario {
    constructor (
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ){}
    
    get imagenUrl(){
        if (this.img === undefined) {
          return `${base_url}/upload/usuarios/no-img`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if(this.img){
          return `${base_url}/upload/usuarios/${this.img}`;
        }else{
          return `${base_url}/upload/usuarios/no-img`;
        }
    }
}

interface SubMenu {
  titulo: string, 
  url: string 
}

interface Menu {

    titulo: string,
    icon: string,
    submenu: SubMenu []

}

export class RegistroModel {

    constructor(
        public ok: boolean,
        public token: string,
        public usuario: Usuario,
        public menu: Menu []
    ){

    }
}