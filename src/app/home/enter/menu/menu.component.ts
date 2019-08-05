import { Component, OnInit } from '@angular/core';
import {ConectionService} from '../../../service/conection.service'
import { PanelItem } from 'src/app/model/panel-item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private servItemService:ConectionService) {     
  }

  ngOnInit() {
    //this.consulta();
  }  
  consulta(){
    this.servItemService.consultaResp().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        if(resp!=""){
          this.initialElemets=JSON.parse(resp);
          this.oneElement=this.initialElemets[0];          
        }
      },
      error=>console.log(error)
    )
  }

  initialElemets: Array<PanelItem> =new Array<PanelItem>();
  oneElement:PanelItem=new PanelItem(); 
}
