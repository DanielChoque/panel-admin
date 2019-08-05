import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../service/conection.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor( private servItemService:ConectionService) { }

  ngOnInit() {
  }
  consulta(){
    this.servItemService.consultaResp().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        if(resp!=""){
          console.log(JSON.stringify(resp));
        }
      },
      error=>console.log(error)
    )
  }
}
