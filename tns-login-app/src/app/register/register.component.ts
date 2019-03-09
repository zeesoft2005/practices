import { Component, OnInit } from '@angular/core';
import {User} from '../User';
// import {SnackBar} from 'nativescript-snackbar';
import * as ApplicationSettings from "tns-core-modules/application-settings";
import {Location} from '@angular/common';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  moduleId: module.id,
})
export class RegisterComponent implements OnInit {

  user=new User();
  constructor(private location: Location) {
    this.user.Email="";
    this.user.Password="";
    this.user.Name="";
   }

  ngOnInit() {
  }

  Register(){
    if(this.user.Name && this.user.Password && this.user.Email)
    {
        let ac: any, newUser: boolean=true;
        let acc=JSON.parse(ApplicationSettings.getString("Accounts",'[]'));
        for(var index=0;index<=acc.length-1; index++){
          ac=acc[index];
          if(this.user.Email==ac.Email)
          {
            newUser=false;
            alert("Email Already Registered!");
            this.location.back();
          }
        }
        if(newUser==true)
        {
          ApplicationSettings.remove("Accounts");
          acc= [...acc,this.user];
          console.log("Accounts: "+JSON.stringify(acc));
          ApplicationSettings.setString("Accounts", JSON.stringify(acc));
          alert("Account Created Successfully!");
          //alert(ApplicationSettings.getString("Accounts","Not Found"));
          this.location.back();
        }
    }
    else{
      alert("All Fields Are Required!");
      // (new SnackBar()).simple("All Fields Are Required!");
    }
  }

  public goBack(){
    this.location.back();
  }

}
