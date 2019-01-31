import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // buttons: string[] = ['name', 'sdasds', 'asdsa', 'fggf', 'wewe'];
    expression = '';
    input = '';

    btnClicked = (event) => {
        let text = event.object.text;
        if (!isNaN(text)) {
            this.input += text;
        }
        else {
            this.input = '';
        }
        this.expression += (text == "x") ? "*" : text;
        if (this.input == "4268") {
            alert("Welcome Humayun! This is a secret message...");
        }
    }

    Evalute = function () {
        // result = evaluate(this.text).toString();
        try {
            result = eval(this.expression);
        } catch (Exception) {
            result = 'Error';
        }
        this.input = result;
        this.expression = '';

    };

    Clear = () => {
        this.expression = '';
        this.input = '';
        result = '';
    }

    CE = () => {
        this.input = this.input.toString().substring(0, this.input.length - 1);
        this.expression = this.expression.toString().substring(0, this.expression.length - 1);
    }

    Square = function () {
        let val = this.input;
        this.input = Math.pow(val, 2);
        this.expression = this.expression.toString().substring(0, this.expression.lastIndexOf(val));
        this.expression += Math.pow(val, 2);
    }
    Cube = function () {
        let val = this.input;
        this.input = Math.pow(val, 3);
        this.expression = this.expression.toString().substring(0, this.expression.lastIndexOf(val));
        this.expression += Math.pow(val, 3);
    }
    Root = function () {
        let val = this.input;
        this.input = Math.sqrt(val);
        this.expression = this.expression.toString().substring(0, this.expression.lastIndexOf(val));
        this.expression += Math.sqrt(val);
    }


    constructor() {

    }

    ngOnInit() {

    }
}
let result;