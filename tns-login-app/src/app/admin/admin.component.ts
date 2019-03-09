import { User } from '../User';
import * as ApplicationSettings from 'application-settings';
import { RouterExtensions } from "nativescript-angular/router";
import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'ns-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  moduleId: module.id,
})
export class AdminComponent implements OnInit {
  public users: Array<User>;
  
  constructor(private router: RouterExtensions) {
    // let acc;
    
    // let userJson= JSON.parse(ApplicationSettings.getString("Accounts","[]"));
    // console.log(JSON.stringify(userJson));
    // for(var index=0;index<=userJson.length-1; index++){
    //   console.log(JSON.stringify(userJson[index]));
    // }
    // console.log("Users Array: "+this.users);
   }

  ngOnInit() {
    if(JSON.parse(ApplicationSettings.getString("CurrentUser")).Name!="Admin")
    {
      this.router.navigate(["/login"], {clearHistory: true});
    }
  }

  public logout() {
    ApplicationSettings.remove("CurrentUser");
      ApplicationSettings.remove("authenticated");
      this.router.navigate(["/login"], { clearHistory: true });
  }

  public showUsers(){
    this.router.navigate(["/user"], { clearHistory: false });
  }

}
