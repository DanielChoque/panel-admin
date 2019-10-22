import { Component, OnInit } from '@angular/core';
import { ConectionService } from 'src/app/service/conection.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder,Validators  } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  constructor(private servItemService:ConectionService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.uploadItemForm = this.formBuilder.group({
      func:[''],
      name:[''],
      password:['']
    });
  }
  init(){
    this.login();
  }
  
  login(){
    this.uploadItemForm.get('func').setValue("login");    
    this.servItemService.login(this.uploadItemForm).subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        if(resp!=""){
          console.log("a:"+resp)
          if(resp=="ok"){
            this.hiddenMenu=false;
            //this.router.navigate(['/menu']);  
          }
        }
      },
      error=>console.log("error:"+error)
    )
  }

  init2(){
    console.log("fgsdgfsd:")
    this.servItemService.selectOneItemP().subscribe(
      res=>{
        var resp=JSON.parse(JSON.stringify(res))._body;
        console.log("a:"+resp)
      },
      error=>console.log("error:"+error)
    )
  }

  uploadItemForm:FormGroup;
  hiddenMenu:boolean=true;
}
