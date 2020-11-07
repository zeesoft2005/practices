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

function foo(x, y, z) { }
var args = [0, 1, 2];
foo(...args);//Here we are spreading the args array into positional arguments.


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
var person = new Person(1);
setTimeout(person.growOld,1000);//prints 1 which should be 2
setTimeout(person.growOlder, 1000);//prints 2
setTimeout(function () { console.log(person.age); }, 2000); // 1, should have been 2
//TS version
class Person2 {
    constructor(public age:number) {}
    growOld = () => {
        this.age++;
    }
}


//===CONCEPTS: for...of VERSUS for...in
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0,1,2
}
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item); // 9,2,5
}