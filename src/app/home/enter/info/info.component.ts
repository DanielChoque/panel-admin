import { Component, OnInit } from '@angular/core';
import { ConectionService } from 'src/app/service/conection.service';
import { Item } from 'src/app/model/item';
import { PanelItem } from 'src/app/model/panel-item';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  panelItemList:Array<PanelItem>=new Array<PanelItem>();
  itemsReg:Object[]=[];
  textSub="";


  hiddenMenu:boolean=false;
  hiddenMenuAux:boolean=true;
  hiddenPanelInfo:boolean=true;
  hiddenEmailSend:boolean=true;
  panelItemUni:PanelItem =new PanelItem();
  itemSub:PanelItem =new PanelItem();
  panelItemUniAux:PanelItem =new PanelItem();
  hiddenBackButton:boolean=false;
  pdfLink
  idfatEmail
  linkSendEmail="";
  emailModel;
  tamImg=this.sanitizer.bypassSecurityTrustResourceUrl("100px");
ss
link=this.sanitizer.bypassSecurityTrustResourceUrl("assets/img/panel/ico_RAU.gif")//"assets/img/panel/ico_RAU.gif";
 

  constructor(private servItemService:ConectionService,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.consul();
  }
  firstElemet: Array<PanelItem> =new Array<PanelItem>(); 
  menuElements: Array<PanelItem>;
  auxElements : Array<PanelItem>;
  subElements : Array<PanelItem>;

  mostrar(){
    this.firstElemet.forEach(element => {
      console.log("nombre : "+JSON.stringify(element));
    });
  }
  consul(){
    this.servItemService.consultaResp().subscribe(
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
    this.menuElements = new Array<PanelItem>();
    this.panelItemUni =new PanelItem();
    this.itemSub=new PanelItem();
    document.getElementById("result").innerHTML="";
    this.hiddenMenu=false
    this.hiddenMenuAux=true
    this.hiddenPanelInfo=true;
    this.hiddenEmailSend=true;
    this.textSub="";
    this.firstElemet.forEach(element => {
      if(element.lavel==0){
        this.menuElements.push(element);
      }
    });       
  }     
  buttonBack(){
    var idFa=0;
    this.firstElemet.forEach(element => {
      if(this.itemSub.father_id==element.id_panel){
        idFa=element.id_panel;
      }
    });
    console.log("id f:"+idFa)
    if(idFa>0){
      this.subCat(idFa);
      this.panelItemUni =new PanelItem();
      this.hiddenEmailSend=true;
    }else{
      this.menuHome();        
    }      
  }

  subCat(fa){
    this.subElements = new Array<PanelItem>();      
    this.hiddenMenu=true;
    this.hiddenMenuAux=false;
    this.hiddenPanelInfo=true;      
    
    this.firstElemet.forEach(element => {
      if(element.father_id==fa){
        this.subElements.push(element);
      }
      if(element.id_panel==fa){
         this.itemSub=element;
      }            
    });
    if(this.subElements.length==0){
      this.auxElements = new Array<PanelItem>();
      this.firstElemet.forEach(element => {
        if(element.id_panel==fa){ 
          this.panelItemUni=element;                           
        }
      });                  
    }
    if(this.panelItemUni.url_pdf!=""){
      this.hiddenPanelInfo=false; 
      this.firstElemet.forEach(element => {
        if(element.id_panel==this.panelItemUni.father_id){
          this.textSub="("+element.name+")";    
        }
      });               
      this.pdfLink=this.sanitizer.bypassSecurityTrustResourceUrl(this.panelItemUni.url_pdf);
    }else{
      this.textSub=""
    }

  } 
  
  transform(url: string): SafeResourceUrl {
    if (!url) {
        url = '';
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
   sendEmail(idfat){
    this.hiddenBackButton=true;
    this.idfatEmail=idfat;
    this.itemSub=new PanelItem();
     var links
     this.firstElemet.forEach(element => {         
       if(element.id_panel==idfat){
        links=element.target;
       }
     });
     this.panelItemUni =new PanelItem();
     this.itemSub.name="Ingresa tu Correo Electrónico:";
     this.itemSub.url_image="assets/img/panel/emailBlack.png";
     this.panelItemUniAux.url_image="assets/img/panel/emailBlack.png";
     this.linkSendEmail=links;
     console.log("link : "+links);
     this.hiddenEmailSend=false;
   }
   onSubmit(){
     console.log("submit");
   }

   buttonSalir(){
    this.hiddenBackButton=false;      
    this.panelItemUniAux=new PanelItem();
    this.firstElemet.forEach(element => {
      if(element.id_panel==this.idfatEmail){
        this.panelItemUni=element;
      }
    });
    this.subCat(this.idfatEmail);
    this.hiddenEmailSend=true;
    this.emailModel="";
    document.getElementById("result").innerHTML="";
   }
   
}
