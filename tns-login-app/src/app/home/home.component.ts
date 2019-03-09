import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
import { User } from '../User';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id,
})
export class HomeComponent implements OnInit {

  currentUser=JSON.parse(ApplicationSettings.getString("CurrentUser"));
  
  constructor(private router: RouterExtensions) { }
  ngOnInit() {
    if(!ApplicationSettings.getBoolean("authenticated",false))
    {
      ApplicationSettings.remove("CurrentUser");
      this.router.navigate(["/login"], {clearHistory: true});
    }
    console.log("Current User Is: "+this.currentUser.Name);    
  }
  public logout() {
    ApplicationSettings.remove("CurrentUser");
      ApplicationSettings.remove("authenticated");
      this.router.navigate(["/login"], { clearHistory: true });
  }

}
