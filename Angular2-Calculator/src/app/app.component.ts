import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Calculator';
  // buttons: string[] = ['name', 'sdasds', 'asdsa', 'fggf', 'wewe'];
  text = '';

  btnClicked = (event) => {
    this.text += event.target.innerText;
    // console.log(event.target.innerText);
  }

  Evalute = function() {
    // result = evaluate(this.text).toString();
    try {
    result = eval(this.text);
    } catch (Exception) {
      result = 'Error';
    }
    console.log(result);
    this.text = result;
  };

  Clear = () => {
    this.text = '';
    result = '';
  }

  CE = () => {
    this.text = this.text.substring(0, this.text.length - 1);
  }

}
let result;

