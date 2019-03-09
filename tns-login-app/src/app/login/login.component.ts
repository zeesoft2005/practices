import { Component, OnInit } from '@angular/core';
import {User} from '../User';
// import {SnackBar} from 'nativescript-snackbar';
import * as ApplicationSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {


  user =new User;
  constructor(private router: RouterExtensions) { 
    this.user.Email="";
    this.user.Password="";
  }


  ngOnInit() {
    if(ApplicationSettings.getBoolean("authenticated", false)) {
      if(JSON.parse(ApplicationSettings.getString("CurrentUser")).Name=="Admin")
        this.router.navigate(["/admin"], { clearHistory: true });
      else
      this.router.navigate(["/home"], { clearHistory: true });
    }
  }
  Login(){
    if(this.user.Email && this.user.Password)
    {
      let acc: any, NotFound: boolean=true;
      let accounts= JSON.parse(ApplicationSettings.getString("Accounts","[]"));
      for(var index=0;index<=accounts.length-1; index++){
        acc=accounts[index];
        if(this.user.Email==acc.Email && this.user.Password==acc.Password)
        {
          NotFound=false;
          ApplicationSettings.remove("CurrentUser");
          ApplicationSettings.setBoolean("authenticated",true);
          this.user.Id= acc.Id;
          this.user.Name=acc.Name;
          ApplicationSettings.setString("CurrentUser",JSON.stringify(this.user));
          if(this.user.Name=="Admin" && this.user.Password=="admin" && this.user.Email=="admin")
          {
            this.router.navigate(["/admin"],{clearHistory:true});
          }
          else{
          this.router.navigate(["/home"],{clearHistory:true});
          }
        }
      }
      if(NotFound){
        alert("Invalid Credentials!");
        // (new SnackBar()).simple("Invalid Credentials!");
      }
    }
    else{
      alert("All Fields Required!");
      // (new SnackBar()).simple("All Fields Required!");
    }
  }


}
