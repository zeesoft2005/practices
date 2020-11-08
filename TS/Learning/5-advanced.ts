//===CONCEPTS: DESTRUCTING and OBJECT SPREAD
/*Summary
Destructuring can make your code more readable and maintainable by reducing
 the line count and making the intent clear.Array destructuring 
 can allow you to use arrays as though they were tuples
*/
//object destrucing
var obj1 = {
    a: 1,
    b: 2
};
var obj2 = {
    c: '3',
    d: '4'
};
//destrucing
const {
    c
} = obj2;
console.log("c", c);
//destructing with rest
//var { a, ...remaining } = obj1;
var {
    w,
    x,
    ...rest
} = {
    w: 1,
    x: 2,
    y: 3,
    z: 4
};
console.log(w, x, remaining); // 1, 2, {y:3,z:4}
//array destructing
var [x, y, ...remaining] = [1, 2, 3, 4];
console.log(x, y, remaining); // 1, 2, [3,4]
var [x, , ...restof] = [1, 2, 3, 4];
console.log(x, remaining); // 1, [3,4]
var list = [1, 2];
list = [...list, 3, 4];
console.log(list); // [1,2,3,4]
//object spread

const point2D = {x: 1, y: 2};
/** Create a new object by using all the point2D props along with z */
const point3D = {...point2D, z: 3};

const fo = {a: 1, b: 2, c: 0};
const ba = {c: 1, d: 2};
/** Merge foo and bar */
const fooBar = {...fo, ...ba};
// fooBar is now {a: 1, b: 2, c: 1, d: 2}



//===CONCEPTS: REST parameters
/*Summary
1. optional paramaeters in a function: another use of spread operator ...
2. 
*/
function iTakeItAll(first, second, ...allOthers) {
    console.log(allOthers);
}
iTakeItAll('foo', 'bar'); // []
iTakeItAll('foo', 'bar', 'bas', 'qux'); // ['bas','qux']

function fu(x, y, z) { }
let args:[number, number, number] = [0, 1, 2];
fu(...args);//Here we are spreading the args array into positional arguments.


//===CONCEPTS: ARROW FUNCTIONS
/*Summary
1. avoid typing function keyword
2. captures this and arguments
*/
//https://basarat.gitbook.io/typescript/future-javascript/arrow-functions
var inc = (x) => x + 1;
var incJson = (x) => ({ x : 1 });
console.log("inc", inc(2));
console.log("incJs", incJson('Two'));//'Two' is ignored

function Person(age) {
    this.age = age;
    this.growOld = function() {
        this.age++;
    }
     this.growOlder = () => {
        this.age++;
    }
}
const person = new Person(1);
setTimeout(person.growOld,1000);//prints 1 which should be 2
setTimeout(person.growOlder, 1000);//prints 2
setTimeout(function () { console.log(person.age); }, 2000); // 1, should have been 2
//TS version
class Person2 {
    constructor(public age:number) {}
    growOld = () =>{
        this.age++;
    }
}

//===CONCEPTS: for...of VERSUS for...in
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0,1,2
}
var someArray = [9, 2, 5];
for (var elem of someArray) {
    console.log(elem); // 9,2,5
}

//===CONCEPTS: Template Strings: use of backticks ( i.e. ` ) instead of single (') or double (") quotes
//1. a template engine for free.
//2. interpolation (aka dynamic values)
// References: 
// https://www.tektutorialshub.com/typescript/typescript-tagged-templates/
// https://dev.to/tclain/ests-bit-of-the-day-typed-tagged-templates-pj8
var lyrics = 'Never gonna give you up';
var html = `<div>${lyrics}</div>`;//interpolation
//multiline strings
 lyrics = `Never gonna give you up
Never gonna let you down`;
console.log(`1 and 1 make ${1 + 1}`);//aanything inside the interpolation (${ and }) can be a js expression 
console.log(html);
//tagged template
let nameStr = 'Zee';
function sayHello(text: TemplateStringsArray, name: string) {
    return name? 'Hi, '+ name : 'Hi';
}
//ref. https://www.tektutorialshub.com/typescript/typescript-tagged-templates/
var templateWithTag = sayHello `${nameStr} world`;
var templateWithoutTag = `${nameStr} world`;
//var templateWithoutPlaceholder = sayHello` world`;//error: must have 2nd arg: a string placeholder

console.log(templateWithTag);
console.log(templateWithoutTag);
const greet = (name: string) => `hello ${name}`
console.log(greet('Zeeshan')); // hello timothee

//raw and rest
let firstName: string = "Sachin"
let lastName: string = "Tendulkar"
let topic = "Typescript"
 
function say(strings: TemplateStringsArray, ... expr: string[]) {
    let str = '';
    console.log(strings.raw);//this gives us raw template strings w/o placeholders
  strings.forEach((string, i) => {
      str += string + (expr[i] || '');
  });
  return str;
}
 
console.log(say`Welcome, ${firstName} ${lastName}. Learn ${topic} here`);


//===CONCEPTS: Promise: 
//1. 
//2. 
// References: 
function asyncAction() {
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Async is done!");
      reject('Rejected!');
    }, 1500);
  });
  return promise;
}

asyncAction().then(function(success) { 
    console.log(success); 
}) 
.catch(function(error) { 
   // error handler is called
   console.log(error); 
});