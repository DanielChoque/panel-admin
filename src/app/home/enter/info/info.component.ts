import { Component, OnInit } from '@angular/core';
import { ConectionService } from 'src/app/service/conection.service';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private servItemService:ConectionService) { }

  ngOnInit() {
    this.consul();
  }
  consul(){
    this.servItemService.consultaItem().subscribe(
      res=>{
        var respues=JSON.parse(JSON.stringify(res))._body;
        if(respues!=""){
          this.firstElemet=JSON.parse(respues);
          this.menuHome();
        }                    
      
      },
      error=>console.log(error)
    )
  }

  menuHome(){
    this.hiddenBackButton=false;      
    this.menuElements = new Array<Item>();
    this.panelItemUni =new Item();
    this.itemSub=new Item();
    document.getElementById("result").innerHTML="";
    this.hiddenMenu=false
    this.hiddenMenuAux=true
    this.hiddenPanelInfo=true;
    this.hiddenEmailSend=true;
    this.textSub="";
    this.firstElemet.forEach(element => {
      if(element.idfather==0){
        this.menuElements.push(element);
      }
    });       
  } 


  //panelItemList:Array<PanelItem>=new Array<PanelItem>();
  itemsReg:Object[]=[];
  textSub="";


  hiddenMenu:boolean=false;
  hiddenMenuAux:boolean=true;
  hiddenPanelInfo:boolean=true;
  hiddenEmailSend:boolean=true;
  panelItemUni:Item =new Item();
  itemSub:Item =new Item();
  //panelItemUniAux:PanelItem =new PanelItem();
  hiddenBackButton:boolean=false;
  pdfLink
  idfatEmail
  linkSendEmail="";
  emailModel;
  //tamImg=this.sanitizer.bypassSecurityTrustResourceUrl("100px");
//ss
//link=this.sanitizer.bypassSecurityTrustResourceUrl("assets/img/panel/ico_RAU.gif")//"assets/img/panel/ico_RAU.gif";
firstElemet: Array<Item> =new Array<Item>(); 
menuElements: Array<Item>;
//auxElements : Array<Item>;
//subElements : Array<PanelItem>;
}
