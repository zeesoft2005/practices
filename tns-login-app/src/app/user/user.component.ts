import { Component, OnInit } from '@angular/core';
import * as ApplicationSettings from 'application-settings';
import { User } from '../User';
import { GestureEventData } from "tns-core-modules/ui/gestures";
import * as Dialogs from 'tns-core-modules/ui/dialogs';
import { Location } from '@angular/common';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  moduleId: module.id,
})

export class UserComponent implements OnInit {

  public users: Array<User>;

  constructor(private location: Location, private router: RouterExtensions) {
    this.users=[];
    let accounts= JSON.parse(ApplicationSettings.getString("Accounts"));

    for(let i=0;i<=accounts.length-1;i++){
      this.users.push(accounts[i]);;
    }
    
   }

  ngOnInit() {
  }

  public onLongTap(event: GestureEventData)
  {
    Dialogs.action("Actions","Cancel",["Details","Edit","Delete"]).then(result=>{
      switch(result)
      {
        case "Details":
        {
          this.router.navigate(["/details"], {clearHistory: false});
          break;
        }
        case "Edit":
        {
          this.router.navigate(["/edit"], {clearHistory: false});
          break;
        }
        case "Delete":
        {
          let accounts= JSON.parse(ApplicationSettings.getString("Accounts"));
          for(let i=0;i<=accounts.length-1;i++){
            
          }
        }
      } 
    });
  }

  public goBack(){
    this.location.back();
  }

}
