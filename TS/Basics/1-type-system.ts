
//==== type system =====//
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
let el: UIElement = {id: '1', name: 'P', value: ' a paraghraph...'};

