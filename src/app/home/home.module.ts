import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { MenuComponent } from './enter/menu/menu.component';
import { 
  MatExpansionModule, 
  MatButtonModule,
   
} from '@angular/material';
import { ConectionService } from '../service/conection.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [HomeComponent, EnterComponent, MenuComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,    
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [
    ConectionService,
  ]
})
export class HomeModule { }
