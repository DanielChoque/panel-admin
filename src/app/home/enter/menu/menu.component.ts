import { Component, OnInit } from '@angular/core';
import {ConectionService} from '../../../service/conection.service'
import { PanelItem } from 'src/app/model/panel-item';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder,Validators  } from '@angular/forms';
import { Item } from 'src/app/model/item';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit { 
  //animal: string;
  //name: string;
  constructor(private servItemService:ConectionService,private formBuilder: FormBuilder,public sanitizer: DomSanitizer) {     
  }

  ngOnInit() {
    this.oneItem=new Item();
    this.consultaStar();    
      this.uploadItemForm = this.formBuilder.group({
      icon: ['', Validators.required],
      file: [''],
      pdf: [''],
      name:['', Validators.required],
      subname:[''],
      level:['', Validators.required],
      idfather:['', Validators.required],
      flag:[''],
      id:[''],
    });
  
    
  } 

  consultaStar(){
    this.servItemService.consultaResp().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        console.log("res:"+res);
        if(resp!=""){
          this.initialElemets=JSON.parse(resp);
          this.oneElement=this.initialElemets[0];
          this.consultaCatPrinci();          
        }
      },
      error=>console.log("error:"+error)
    )
  }

  consultaSubCat(id){
   // console.log("id:"+id);
    this.subElements = new Array<PanelItem>(); 
    this.initialElemets.forEach(element => {
      if(element.father_id==id){
        this.subElements.push(element);
      }      
    });
  }

  consultaCatPrinci(){
    this.princElement = new Array<PanelItem>(); 
    this.initialElemets.forEach(element => {
      if(element.father_id==0){
        this.princElement.push(element);
      }      
    });
    this.consultaItemStar();
  }

  consultaItemStar(){
    this.servItemService.consultaItem().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        //console.log("resp:"+(JSON.parse(resp)));
        if(resp!=""){
          if(resp=="ErrorBase"){
            alert("Error en la Base de Datos");
          }
          else{
            this.initialItem=JSON.parse(resp);
            //this.oneItem=this.initialItem[0];
            this.consultaItemPrinci();          
          }
        }
      },
      error=>console.log(error)
    )
  }

  consultaItemPrinci(){
    this.princItem = new Array<Item>(); 
    this.initialItem.forEach(element => {
      if(element.idfather==0){
        this.princItem.push(element);
      }      
    });
  }
  addItem(){
    console.log("add:");
    this.hiddenAdd=false
  }

  cancelAdd(){
    this.hiddenAdd=true
  }
  
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.uploadItemForm);
   this.servItemService.addItem(this.uploadItemForm).subscribe(res=>{     
      var resp=JSON.parse(JSON.stringify(res))._body;      
      if(resp!=""){
        console.log("save:" + resp);
        if(resp=="save"){
          this.hiddenProgresBar=true;
          this.hiddenPopRes=false;
          console.log("this.catIdfather:"+this.catIdfather);
          this.recarge1();
        }else{
          this.hiddenProgresBar=true;
          this.messagePost= resp+'\n ¿Desea Reintentar?';
        }
      }
      console.log("not save:" + resp);
    },
    error=>{
      console.log("error:"+error);
      this.hiddenProgresBar=true;
      this.messagePost='NO SE PUEDEN GUARDAR LOS ELEMENTOS \n ¿Desea Reintentar?';
    })
   // this.uploadItemForm.reset();   
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#files');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.readAsArrayBuffer(inputNode.files[0]);
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;        

      };    
    }
  }

  functionItem(func){
    if(func=="salirPop"){
      this.resetItems();
    }
    if(func=="addItem"){
      //this.hiddenPop=false;
      this.hiddenPopTypeCat=false;
      this.hiddenOverlay=false;
    }
    if(func=="save"){
      console.log(this.verificarCampos());
      if(this.verificarCampos()){
        //this.onSubmit();
        this.saveQuestion();
      }
      else{
        console.log("Faltan campos");
        alert("Faltan campos");
      }      
    }
    if(func=="edit"){
      console.log(this.verificarCampos());
      if(this.verificarCampos()){
        //this.onSubmit();
        this.saveQuestion();
      }
      else{
        console.log("Faltan campos");
        alert("Faltan campos");
      }      
    }

  }

  resetItems(){
    //this.catIdfather=0;
    this.idItem=0;
    this.hiddenPop=true;
    this.hiddenOverlay=true;
    this.hiddenAdd=true;
    this.hiddenPopSave=true;
    this.hiddenPopRes=true;
    this.hiddenPopDelete=true;
    this.hiddenEdit=true;
    this.hiddenPopTypeCat=true;
    this.imgURLIcon=undefined;
    this.imgURLFile=undefined;
    this.imgURLPdf=undefined;
    this.name="";
    this.subname="";
    this.messagePdf=undefined;
    this.messagePost="¿Guardar elementos?";
    this.uploadItemForm.get('icon').setValue("");
    this.uploadItemForm.get('file').setValue("");
    this.uploadItemForm.get('pdf').setValue("");
    this.uploadItemForm.get('name').setValue("");
    this.uploadItemForm.get('subname').setValue("");
    this.oneItem=new Item();
    this.recarge1();
  }

  verificarCampos(){
    if(
      this.uploadItemForm.get('name').value==""||
      //this.uploadItemForm.get('subname').value==""||
      this.imgURLIcon==undefined//||
      //this.imgURLFile==undefined||
      //this.messagePdf==undefined
      ){
      return false;
    }else{
      return true;
    }
  }

  setValues(){
    if(this.oneItem.id>0){
      this.uploadItemForm.get('idfather').setValue(this.oneItem.id);
    }else{
      this.uploadItemForm.get('idfather').setValue(0);
    }
    this.uploadItemForm.get('idfather').setValue(this.catIdfather);
    this.uploadItemForm.get('level').setValue(this.catLevel);
    this.uploadItemForm.get('flag').setValue(1);
  }

  selectIcon(event) { 
    /**verifiacamos si existen un elemento*/ 
    if (event.length > 0) {
      const file = event[0];      
      this.uploadItemForm.get('icon').setValue(file);
      /**Se carga el elemento (event) en el img***/
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURLIcon = reader.result; 
      }
    }else{
      this.uploadItemForm.get('icon').setValue("");
      this.imgURLIcon =undefined
    }
  }

  selectFile(event) { 
    /**verifiacamos si existen un elemento*/ 
    if (event.length > 0) {
      const file = event[0];      
      this.uploadItemForm.get('file').setValue(file);
      /**Se carga el elemento (event) en el img***/
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => {
        this.imgURLFile = reader.result;
      }
    }else{
      this.uploadItemForm.get('file').setValue("");
      this.imgURLFile =undefined
    }
  }

  selectPdf(event) { 
    /**verifiacamos si existen un elemento*/ 
    if (event.length > 0) {
      const file = event[0]; 
      this.messagePdf=event[0].name;     
      this.uploadItemForm.get('pdf').setValue(file);
      /**Se carga el elemento (event) en el img***/
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURLPdf = reader.result; 
        //reader.readAsDataURL (file); 
        //this.sanitizer.bypassSecurityTrustResourceUrl(reader);
      }
    }else{
      this.uploadItemForm.get('pdf').setValue("");
      this.imgURLPdf =undefined;
      this.messagePdf=undefined; 
    }
  }

  saveQuestion(){
    this.hiddenPopSave=false;
    //this.hiddenPop=true;    
  }

  save(res){
    if(res=="yes"){
      this.hiddenProgresBar=false;
      this.setValues();
      this.onSubmit();
    }
    if(res=="no"){
      this.hiddenPop=true;
      this.hiddenAdd=true;
      this.hiddenPopSave=true;
      this.hiddenOverlay=true;
      this.resetItems();
    }
  }

  exitReg(){
    //this.ngOnInit();
    this.resetItems();
  }

  funtionDeleteItem(id){
    this.idItem=id;
    this.hiddenPopDelete=false;
    this.hiddenOverlay=false;
  }

  funtionDelete(res){
    if(res=="yes"){
      console.log("delete id: "+this.idItem)
      this.deleteItem();
    }
    if(res=="no"){
      this.resetItems();
    }
  }

  deleteItem(){
    this.servItemService.delelteItem(this.idItem).subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        console.log("res:"+resp);
        if(resp!=""){
          if(resp=="delete-ok"){
            this.exitReg();
          }else{
            alert("ocurrio un error")
          }

        }
      },
      error=>console.log("error:"+error)
    )
  }

  selectItem(id){
    this.servItemService.selectOneItem(id).subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        if(resp!=""){
          this.initialItem=JSON.parse(resp);
          this.oneItem=this.initialItem[0];         
          this.setItemOne();
        }
      },
      error=>console.log("error:"+error)
    )
  }

  setItemOne(){
    console.log("one Item ID: "+this.oneItem.id);
    this.uploadItemForm.get('id').setValue(this.oneItem.id+"");
    this.uploadItemForm.get('name').setValue(this.oneItem.name);
    this.uploadItemForm.get('subname').setValue(this.oneItem.subname+"");
    //this.uploadItemForm.get('icon').setValue(this.oneItem.icon);
    //this.uploadItemForm.get('file').setValue(this.oneItem.file);
    //this.uploadItemForm.get('pdf').setValue(this.oneItem.pdf);
    this.uploadItemForm.get('level').setValue(this.oneItem.level+"");
    this.uploadItemForm.get('idfather').setValue(this.oneItem.idfather);
    this.uploadItemForm.get('flag').setValue(this.oneItem.flag);
    var type=this.oneItem.level;
    if(type==0){
      console.log(type)
      this.hiddenFileInput=true;
      this.hiddenPdfInput=true;
    }
    if(type==1){console.log(type)
      this.hiddenFileInput=true;
      this.hiddenPdfInput=false;    
    }
    if(type==2){console.log(type)
      this.hiddenFileInput=false;
      this.hiddenPdfInput=true;
    }
    if(this.oneItem.icon>0){
      this.imgURLIcon=this.urlBackEnd+"/archivos/"+this.oneItem.iconObj.name;
    }
    if(this.oneItem.file>0){
      this.uploadItemForm.get('file').setValue("");
      this.imgURLFile=this.urlBackEnd+"/archivos/"+this.oneItem.fileObj.name;
    }
    if(this.oneItem.pdf>0){
      this.messagePdf=this.oneItem.pdfObj.name;
      this.uploadItemForm.get('pdf').setValue("");
    }
  }

  funtionEditItem(id){
    console.log("id:"+id);
    this.selectItem(id);    
    this.hiddenEdit=false;
    this.hiddenOverlay=false;
  }

  editCat(id){
    console.log("edit CAt id:"+id);
  }

  deleteCat(id){
    console.log("delete CAt id:"+id);
  }

  consultaSubCatItem(id){
    console.log("id:"+id);
     this.subItem = new Array<Item>(); 
     this.subAuxItem=new Array<Item>();
     this.initialItem.forEach(element => {
      console.log("idfather:"+element.idfather);
       if(element.idfather==id){
         this.subItem.push(element);
         this.subAuxItem.push(element);
       }      
     });
   }

   homeListItem(){
     this.hiddenSubCat=true;
     this.titlePrinc="Lista de categorías :";
     this.catIdfather=0;
     this.recarge1();
     //this.ngOnInit();
   }

   callSubCat(id){
     this.catIdfather=id;
    this.oneItem=new Item();
    this.subAuxItem=new Array<Item>();
    this.subAuxItem=this.subItem;
    this.subItem=new Array<Item>();
    this.initialItem.forEach(element => {
      if(element.id==id){
        this.oneItem=element;
        this.titlePrinc=this.titlePrinc+element.name+"/"
      }      
      if(element.idfather==id){
        this.subItem.push(element);
      }  
    });
    this.hiddenSubCat=false;
  }

  consultaSubCatItemPrueba(id){
    
    this.subItem = new Array<Item>();
    if(this.subAuxItem.length>0){
      this.initialItem.forEach(element => {        
      if(element.idfather==id){
        this.catIdfather=id;
        this.subItem.push(element);
      }      
    });
    }else{
      this.initialItem.forEach(element => {
      if(element.idfather==id){
        this.subItem.push(element);
      }      
    });
    }     
  }
  saveEdit(res){
    if(res=="yes"){
      this.hiddenProgresBar=false;
      this.onSubmitEdit();
    }
    if(res=="no"){
      this.hiddenPop=true;
      this.hiddenAdd=true;
      this.hiddenPopSave=true;
      this.hiddenOverlay=true;
      this.resetItems();
    }
  }

  onSubmitEdit() {
    // TODO: Use EventEmitter with form value
    console.log(this.uploadItemForm);
   this.servItemService.editItem(this.uploadItemForm).subscribe(res=>{     
      var resp=JSON.parse(JSON.stringify(res))._body;      
      if(resp!=""){
        console.log("edit:  " + resp);
        if(resp=="edit"){
          this.hiddenProgresBar=true;
          this.hiddenPopRes=false; 
          this.resetItems();
        }else{
          this.hiddenProgresBar=true;
          this.messagePost= resp+'\n ¿Desea Reintentar?';
        }
      }
      console.log("not edit:" + resp);
    },
    error=>{
      console.log("error:"+error);
      this.hiddenProgresBar=true;
      this.messagePost='NO SE PUEDEN GUARDAR LOS ELEMENTOS \n ¿Desea Reintentar?';
    })
   // this.uploadItemForm.reset();   
  }
  typeCat(type){
    this.hiddenPopTypeCat=true;
    this.catLevel=type;
    if(type==0){
      console.log(type)
      this.hiddenFileInput=true;
      this.hiddenPdfInput=true;
    }
    if(type==1){console.log(type)
      this.hiddenFileInput=true;
      this.hiddenPdfInput=false;    
    }
    if(type==2){console.log(type)
      this.hiddenFileInput=false;
      this.hiddenPdfInput=true;
    }
    this.hiddenPop=false
  }
  recarge1(){
    this.oneItem=new Item();
    this.servItemService.consultaItem().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        //console.log("resp:"+(JSON.parse(resp)));
        if(resp!=""){
          console.log("homeListItem:")
          if(resp=="ErrorBase"){
            alert("Error en la Base de Datos");
          }
          else{
            this.initialItem=JSON.parse(resp);
            //this.oneItem=this.initialItem[0];
            if(this.catIdfather==0){
              this.consultaItemPrinci();  
            }
            if(this.catIdfather>0){
              this.consultaItemPrinci1();          
            }
            
          }
        }
      },
      error=>console.log(error)
    )
  }
  consultaItemPrinci1(){
    console.log("mil idfather: "+this.catIdfather);
    this.subAuxItem = new Array<Item>(); 
    this.initialItem.forEach(element => {
      if(element.idfather==this.catIdfather){
        this.subAuxItem.push(element);
      }      
    });
  }
  updateData(){       
        this.servItemService.updateData().subscribe(res=>{     
           var resp=JSON.parse(JSON.stringify(res))._body;      
           if(resp!=""){
             console.log("updateData:  " + resp);
             if(resp=="ok"){
               this.hiddenProgresBar=true;
               this.hiddenPopRes=false; 
               //this.resetItems();
             }else{
               this.hiddenProgresBar=true;
               this.messagePost= resp+'\n ¿Desea Reintentar?';
             }
           }
           console.log("not edit:" + resp);
         },
         error=>{
           console.log("error:"+error);
           this.hiddenProgresBar=true;
           this.messagePost='NO SE PUEDEN GUARDAR LOS ELEMENTOS \n ¿Desea Reintentar?';
         }) 
  }

  initialElemets: Array<PanelItem> =new Array<PanelItem>();
  initialItem: Array<Item> =new Array<Item>();
  oneElement:PanelItem=new PanelItem();
  oneItem:Item=new Item();
  subElements: PanelItem[];
  subItem:Item[];
  subAuxItem:Array<Item> =new Array<Item>();
  princElement:PanelItem[];
  princItem:Item[];
  hiddenAdd:boolean=true;
  hiddenPop:boolean=true;
  hiddenOverlay:boolean=true;
  hiddenPopSave:boolean=true;
  hiddenPopRes:boolean=true;
  hiddenProgresBar:boolean=true;
  hiddenPopDelete:boolean=true;
  hiddenEdit:boolean=true;
  hiddenSubCat:boolean=true;
  hiddenPopTypeCat:boolean=true;
  hiddenFileInput:boolean=true;
  hiddenPdfInput:boolean=true;
  
  
  uploadItemForm:FormGroup;
  
  value = '';
  srcResult  
  public imagePath;
  imgURL: any;
  imgURLIcon: any;
  imgURLFile: any;
  imgURLPdf: any;
  public messageIcon: string;
  public messageFile: string;
  public messagePdf: string;
  public messagePost="¿Guardar elementos?";
  public messageEdit="¿Editar elementos?";
  titlePrinc="Lista de categorías :";
  name=""; 
  subname="";
  level=0;
  nivel=0;
  idItem=0;
  catLevel=0;
  catIdfather=0;
  


  panelOpenState = false;
  urlBackEnd=this.servItemService.NetWorkUrl;
}
