import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgessComponent } from './progess/progess.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    ProgessComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports:[
    ProgessComponent,
    Grafica1Component,
    PagesComponent,
    DashboardComponent,
  ]
})
export class PagesModule { }
