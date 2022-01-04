import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { HospitalModel } from '../../models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: any[] = []
  public hospital: HospitalModel[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({termino}) => this.busquedaGlobal(termino));
    
  }


  busquedaGlobal(termino:string){
    this.busquedaService.busquedaGlobal(termino).subscribe((resp:any) => {
        console.log("RESPUESTA", resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospital = resp.hospital;
    })
  }

}
