
//==== type system =====//
//all are valid statements to declare a variable in TypeScript:
var myVar1 = 123;
var myVar2:number = 123;
let myVar3: number = 123;
//let ba:string=47;//in latest TS, it's an error
//console.log( " Value of a= " +ba);
//difference b/w let and var
var fV = 4;//function scoped
if (true) {
  fV = 5;
}
console.log(fV);//prints 5
let bV = 5;//block-scoped
if (true) {
  let bV = 4;
}
console.log(bV);//prints 4
//1. let is good to use in a loop to avoid side-effect of closure:
var funcs = [];
// create a bunch of functions
for (let i = 0; i < 3; i++) { // Note the use of let vs var if 'let i' is replaced with 'var i' 
    funcs.push(function() {
        console.log(i);
    })
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
let bar;//it's ok
//like, let, const is block scoped
//const foo; // ERROR: const declarations must be initialized
const fooo1 = 123;
//fooo1 = 456; // ERROR: Left-hand side of an assignment expression cannot be a constant
const fooo = { bar: 123 };//but we can assign new value to an obj prop
fooo.bar = 456; // Allowed!
console.log(fooo); // { bar: 456 }
//declare a variable of type 'any' implicitley
let a;
a = 1;
a = 's';

//declare a variable of type 'any' explicitley
let b:any;
b = true;
b = 'zee'
//declare a variable of type: number, bool, string, 
let n:number, bool:boolean, str:string, int:bigint;
//bool = 'true';//not ok
bool = false;//ok
//declare & assign a variable value
let val: string = 'hello';
// literal types: Union
type Style = 'A' | 'B' | 99;
var st: Style;
//st = 12;//wrong
st = 99;//correct
st = 'A';// correct


//Union and Intersection literal types
interface SuccessResult{
  isValid: true;
}

interface FailureResult{
  isValid: false;
  reason: string;
}

interface ResultMessage{
  message: string;
}
type Conflicting = { a: number } & { b: string };
let conflic: Conflicting = {a:1, b:''};
type ActionResult = SuccessResult | FailureResult;
type ActionResponse = ActionResult & ResultMessage;
let response: ActionResponse = {isValid: false, reason: 'unknown', message: 'unknown'};
let actionResult: ActionResult = {isValid: false, reason:'network failure'};
response = {isValid: false, message: 'Operation couldn\'t be completed!', reason:'Connection failed.'};

// declare function DoAction(): ActionResult;

//define shape of a type by interface
interface Person{
  fname: string;
  lname: string;
  [key: string]: any;
}

let Ali: Person = {
  fname : 'fname',
  lname: 'lname'
};
//Ali.fname = 'zee';//ok
Ali['addidtional_prop'] = 'extra';
Ali.Age = 23; // allowed any type of prop
// array types
let names: string[];//declare a string array
let arr:number[] = [];//create a numeric array
arr[0] = 2;
let numArr:number[]=[23,233];
console.log(numArr);
//tuple
let aTuple:[string, number];
aTuple = ['A', 123];

type MyTuple = [number, string, boolean?];
let data: MyTuple;
data = [12,'zee'];
data.push(1, 'zee', false);
console.log(data);

//enum
enum Posts{ Director, Manager, Supervisor}
let myPost: Posts;
myPost = Posts.Supervisor;
console.log(myPost);//prints index not string
console.log(Posts[myPost]);//prints 'Supervisor'

//classes as interface
class DomElement{
  id: string = '';
  name: string = '';

}
//interface can extend a class: WEIRD!!
interface UIElement extends DomElement{
  value: string;
}
// a type composed of a class+interface
let ele: UIElement = {id: '1', name: 'P', value: ' a paraghraph...'};

