import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { MenuComponent } from './enter/menu/menu.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path:"login",
  component: EnterComponent
},
{
  path:"menu",
  component: MenuComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
