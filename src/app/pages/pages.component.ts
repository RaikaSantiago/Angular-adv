import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
declare function customInit();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})

export class PagesComponent implements OnInit {

  constructor(private sidebarService: SidebarService ) { 
    
  }

  ngOnInit(): void {
    customInit();
    this.sidebarService.cargarMenu();
  }

}
