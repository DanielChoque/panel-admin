import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EnterComponent } from './enter/enter.component';
import { InfoComponent } from './enter/info/info.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path:"login",
  component: EnterComponent
},
/*{
  path:"menu",
  component: MenuComponent
}*/
{
  path:"info",
  component: InfoComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
