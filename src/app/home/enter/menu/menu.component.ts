import { Component, OnInit } from '@angular/core';
import {ConectionService} from '../../../service/conection.service'
import { PanelItem } from 'src/app/model/panel-item';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder,Validators  } from '@angular/forms';
export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit { 
  animal: string;
  name: string;
  constructor(private servItemService:ConectionService,private formBuilder: FormBuilder) {     
  }

  ngOnInit() {
    this.consultaStar();
    this.uploadForm = this.formBuilder.group({
      profile: ['', Validators.required],
      profileIcon: [''],
      profileFile: [''],
      profilePdf: [''],
      firstName:['', Validators.required],
    });
  }  
  consultaStar(){
    this.servItemService.consultaResp().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        if(resp!=""){
          this.initialElemets=JSON.parse(resp);
          this.oneElement=this.initialElemets[0];
          this.consultaCatPrinci();          
        }
      },
      error=>console.log(error)
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
    console.warn(this.profileForm.value);
  }
  onFileSelect(event) {
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onFileSelectIcon(event) {   
    if (event.target.files.length > 0) {
      const file = event.target.files[0];      
      this.uploadForm.get('profileIcon').setValue(file);
    }
  }
  onFileSelectFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];      
      this.uploadForm.get('profileFile').setValue(file);
    }
  }
  onFileSelectPdf(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];      
      this.uploadForm.get('profilePdf').setValue(file);
    }
  }
  onSubmit1() {
    console.warn(this.uploadForm.get('firstName'));
   // this.uploadForm.get('profilePdf').setValue("");
   // this.uploadForm.get('profileIcon').setValue("");
   // this.uploadForm.get('profileFile').setValue("");
   // this.uploadForm.get('firstName').setValue("");
    //this.uploadForm.reset();
    if(
      this.uploadForm.get('profileIcon').value.name!=undefined&&
      this.uploadForm.get('profileFile').value.name!=undefined&&
      this.uploadForm.get('profilePdf').value.name!=undefined&&
      this.uploadForm.get('firstName').value!=""){
        alert("save");
      location.reload();
    }
    else{
      alert("faltan campos")
    }
    
    /*this.servItemService.addImage2(this.uploadForm).subscribe(res=>{
     
        var resp=JSON.parse(JSON.stringify(res))._body;
        if(resp!=""){
          console.log("res:" + resp);        
        }
      },
      error=>console.log(error));*/
  }

  initialElemets: Array<PanelItem> =new Array<PanelItem>();
  oneElement:PanelItem=new PanelItem();
  subElements: PanelItem[];
  princElement:PanelItem[];
  hiddenAdd:boolean=true;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });
  uploadForm: FormGroup;  
}
