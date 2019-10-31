import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HttpClient, } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  public NetWorkUrl="http://localhost/back-panel";
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
  //  'Content-Type' : 'multipart/form-data',
    //'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //'Access-Control-Allow-Credentials': true 
  });

  constructor(private http: Http,private httpClient: HttpClient) { }
 

  consultaItem() {    
    let url = this.NetWorkUrl + "/controller/a.php";
    return this.http.get(url);
  }
  addItem(uploadForm){
    const formData = new FormData();
    formData.append('icon', uploadForm.get('icon').value);
    formData.append('file', uploadForm.get('file').value);
    formData.append('pdf', uploadForm.get('pdf').value);

    formData.append('name',uploadForm.get('name').value);
    formData.append('subname',uploadForm.get('subname').value);

    formData.append('level',uploadForm.get('level').value);
    formData.append('idfather',uploadForm.get('idfather').value);
    formData.append('flag',uploadForm.get('flag').value);

    let url =this.NetWorkUrl + "/controller/item-update.php";
    return this.http.post(url, formData)
  }

  addImage(data){
    let url =this.NetWorkUrl + "/cargar.php";
    console.log("url:"+url);
    return this.http.post(url,data);
  }
  addImage2(uploadForm){
    const formData = new FormData();
    formData.append('icon', uploadForm.get('icon').value);
    formData.append('file', uploadForm.get('file').value);
    formData.append('pdf', uploadForm.get('pdf').value);
    formData.append('name',uploadForm.get('name').value);
    formData.append('subname',uploadForm.get('subname').value);

    formData.append('level',uploadForm.get('level').value);
    formData.append('idfather',uploadForm.get('idfather').value);
    formData.append('flag',uploadForm.get('flag').value);

    let url =this.NetWorkUrl + "/controller/item-update.php";
    return this.http.post(url, formData)
  }
  delelteItem(id){
    const formData = new FormData();
    formData.append('id', id);
    let url =this.NetWorkUrl + "/controller/item-delete.php";
    return this.http.post(url, formData)
  }
  selectOneItem(id){
    const formData = new FormData();
    formData.append('id', id);
    let url =this.NetWorkUrl + "/controller/item-view-one.php";
    return this.http.post(url, formData)
  }

  editItem(uploadForm){
    const formData = new FormData();
    formData.append('icon', uploadForm.get('icon').value);
    formData.append('file', uploadForm.get('file').value);
    formData.append('pdf', uploadForm.get('pdf').value);

    formData.append('name',uploadForm.get('name').value);
    formData.append('subname',uploadForm.get('subname').value);

    formData.append('level',uploadForm.get('level').value);
    formData.append('idfather',uploadForm.get('idfather').value);
    formData.append('id',uploadForm.get('id').value);
    formData.append('flag',uploadForm.get('flag').value);

    let url =this.NetWorkUrl + "/controller/item-edit.php";
    return this.http.post(url, formData);
  }
  login(uploadForm){
    const formData=new FormData();
    formData.append('func',uploadForm.get('func').value);
    formData.append('name',uploadForm.get('name').value);
    formData.append('password',uploadForm.get('password').value);
    let url = this.NetWorkUrl+"/controller/item-user.php";
    return this.http.post(url, formData);    
  }
  
  selectOneItemP(){
    const formData = new FormData();
    formData.append('cod_sim', 'Danielchoq');
    let url ="http://sac.impuestos.gob.bo/sinapp/ServBuscaAutomaticoAutenticacion.php";
    console.log("url: "+url);
  
    return this.http.post(url, formData)
  }
  consultaResp() {
    //let url = "https://daniel-berserk-hunter.000webhostapp.com/conec.php";
    //let url = "http://localhost/p/conec.php";
    //let url = "http://localhost/bac/conec.php";
    let url = "http://sac.impuestos.gob.bo/panel/conec.php";
     return this.http.get(url);
   }
   updateData() {
    let url = this.NetWorkUrl + "/controller/update-date.php";
     return this.http.get(url);
   }
}
