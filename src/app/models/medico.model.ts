import { HospitalModel } from './hospital.model';
interface _MedicoUser{
    _id:string;

}

export class MedicosModel{

    constructor(
        public nombre:string,
        public _id?: string,
        public img?:string,
        public usuario?:_MedicoUser,
        public hospital?:HospitalModel
    ){

    }
}