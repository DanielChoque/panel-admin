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
    this.consultaStar();
    
    this.uploadForm = this.formBuilder.group({
      profile: ['', Validators.required],
      profileIcon: [''],
      profileFile: [''],
      profilePdf: [''],
      profileName:['', Validators.required],
      profileSubName:['', Validators.required],
      level:['', Validators.required],
      idfather:['', Validators.required],
      flag:[''],
    });


    this.uploadItemForm = this.formBuilder.group({
      icon: ['', Validators.required],
      file: [''],
      pdf: [''],
      name:['', Validators.required],
      subname:[''],
      level:['', Validators.required],
      idfather:['', Validators.required],
      flag:[''],
    });
  
    
  }  
  consultaStar(){
    this.servItemService.consultaResp().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
       // console.log("respelem:"+resp);
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
        //console.log("resp:"+resp);
        if(resp!=""){
          this.initialItem=JSON.parse(resp);
          this.oneItem=this.initialItem[0];
          this.consultaItemPrinci();          
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
  saveCatPrinc(){
    console.log()
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.uploadItemForm);
   this.servItemService.addItem(this.uploadItemForm).subscribe(res=>{     
      var resp=JSON.parse(JSON.stringify(res))._body;      
      if(resp!=""){
        console.log("save:" + resp);
       this.hiddenProgresBar=true;
        this.hiddenPopRes=false;        
        //this.deleteItems();
        //location.reload();     
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

  preview(files,str) {
    //console.log("str:"+str);
    this.imgURL=undefined;
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }


  functionItem(func){
    if(func=="salirPop"){
      this.deleteItems();
    }
    if(func=="addItem"){
      this.hiddenPop=false;
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
    if(func=="clear"){
      console.log("borrar");
    }
  }
  deleteItems(){
    this.hiddenPop=true;
    this.hiddenOverlay=true;
      this.hiddenAdd=true;
      this.hiddenPopSave=true;
      this.hiddenPopRes=true;
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
    this.uploadItemForm.get('level').setValue(0);
    this.uploadItemForm.get('idfather').setValue(0);
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
      this.deleteItems();
    }
  }
  exitReg(){
    this.ngOnInit();
    this.deleteItems();
  }

  initialElemets: Array<PanelItem> =new Array<PanelItem>();
  initialItem: Array<Item> =new Array<Item>();
  oneElement:PanelItem=new PanelItem();
  oneItem:Item=new Item();
  subElements: PanelItem[];
  princElement:PanelItem[];
  princItem:Item[];
  hiddenAdd:boolean=true;
  hiddenPop:boolean=true;
  hiddenOverlay:boolean=true;
  hiddenPopSave:boolean=true;
  hiddenPopRes:boolean=true;
  hiddenProgresBar:boolean=true;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  uploadForm: FormGroup;
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
  name=""; 
  subname="";
  level=0;
  nivel=0;
}
