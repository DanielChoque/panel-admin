import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { HttpClient, } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConectionService {
  NetWorkUrl="http://localhost/back-panel";
  public headers = new Headers({
    'Access-Control-Allow-Origin': '*',
  //  'Content-Type' : 'multipart/form-data',
    //'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization',
    //'Access-Control-Allow-Credentials': true 
  });

  constructor(private http: Http,private httpClient: HttpClient) { }
  consultaResp() {    
    let url = this.NetWorkUrl + "/conec.php";
    return this.http.get(url);
  }
  addImage(data){
    let url =this.NetWorkUrl + "/cargar.php";
    console.log("url:"+url);
    return this.http.post(url,data);
    /*const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );*/
  }
  addImage2(uploadForm){
    const formData = new FormData();
    formData.append('icon', uploadForm.get('profileIcon').value);
    formData.append('file', uploadForm.get('profileFile').value);
    formData.append('pdf', uploadForm.get('profilePdf').value);
    let url =this.NetWorkUrl + "/controller/item-update.php";
    return this.http.post(url, formData)
  }  
}
