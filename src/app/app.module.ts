import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginComponent } from './compoment/login/login.component';
import { HeroesComponent } from './heroes/heroes.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
  MatExpansionModule, 
  MatButtonModule 
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ConectionService } from './service/conection.service';
import {HttpModule} from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    HeroesComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonModule,
    HttpClientModule,HttpModule,
  ],
  providers: [
    ConectionService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
