import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { MenuComponent } from './enter/menu/menu.component';
import { 
  MatExpansionModule, 
  MatButtonModule 
} from '@angular/material';
import { ConectionService } from '../service/conection.service';

@NgModule({
  declarations: [HomeComponent, EnterComponent, MenuComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,    
    MatExpansionModule,
    MatButtonModule
  ],
  providers: [
    ConectionService,
  ]
})
export class HomeModule { }
