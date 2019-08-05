import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class ConectionService {

  constructor(private http: Http) { }
  consultaResp() {
    let url = "http://localhost/p/conec.php";
    return this.http.get(url);
  }
}
