var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var c = obj2.c;
console.log("c", c);
//destructing with rest
//var { a, ...remaining } = obj1;
var _a = {
    w: 1,
    x: 2,
    y: 3,
    z: 4
}, w = _a.w, x = _a.x, rest = __rest(_a, ["w", "x"]);
console.log(w, x, remaining); // 1, 2, {y:3,z:4}
//array destructing
var _b = [1, 2, 3, 4], x = _b[0], y = _b[1], remaining = _b.slice(2);
console.log(x, y, remaining); // 1, 2, [3,4]
var _c = [1, 2, 3, 4], x = _c[0], restof = _c.slice(2);
console.log(x, remaining); // 1, [3,4]
//===CONCEPTS: REST parameters
/*Summary
1. optional paramaeters in a function: another use of spread operator ...
2.
*/
function iTakeItAll(first, second) {
    var allOthers = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        allOthers[_i - 2] = arguments[_i];
    }
    console.log(allOthers);
}
iTakeItAll('foo', 'bar'); // []
iTakeItAll('foo', 'bar', 'bas', 'qux'); // ['bas','qux']
//===CONCEPTS: ARROW FUNCTIONS
/*Summary
1. avoid typing function keyword
2. captures this and arguments
*/
//https://basarat.gitbook.io/typescript/future-javascript/arrow-functions
var inc = function (x) { return x + 1; };
var incJson = function (x) { return ({ x: 1 }); };
console.log("inc", inc(2));
console.log("incJs", incJson('Two')); //'Two' is ignored
function Person(age) {
    var _this = this;
    this.age = age;
    this.growOld = function () {
        this.age++;
    };
    this.growOlder = function () {
        _this.age++;
    };
}
var person = new Person(1);
setTimeout(person.growOld, 1000); //prints 1 which should be 2
setTimeout(person.growOlder, 1000); //prints 2
setTimeout(function () { console.log(person.age); }, 2000); // 1, should have been 2
//TS version
var Person2 = /** @class */ (function () {
    function Person2(age) {
        var _this = this;
        this.age = age;
        this.growOld = function () {
            _this.age++;
        };
    }
    return Person2;
}());
