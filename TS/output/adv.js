var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
var list = [1, 2];
list = __spreadArrays(list, [3, 4]);
console.log(list); // [1,2,3,4]
//object spread
var point2D = { x: 1, y: 2 };
/** Create a new object by using all the point2D props along with z */
var point3D = __assign(__assign({}, point2D), { z: 3 });
var fo = { a: 1, b: 2, c: 0 };
var ba = { c: 1, d: 2 };
/** Merge foo and bar */
var fooBar = __assign(__assign({}, fo), ba);
// fooBar is now {a: 1, b: 2, c: 1, d: 2}
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
function fu(x, y, z) { }
var args = [0, 1, 2];
fu.apply(void 0, args); //Here we are spreading the args array into positional arguments.
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
//===CONCEPTS: for...of VERSUS for...in
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0,1,2
}
var someArray = [9, 2, 5];
for (var _i = 0, someArray_1 = someArray; _i < someArray_1.length; _i++) {
    var el = someArray_1[_i];
    console.log(el); // 9,2,5
}
//===CONCEPTS: Template Strings: use of backticks ( i.e. ` ) instead of single (') or double (") quotes
var lyrics = 'Never gonna give you up';
var html = "<div>" + lyrics + "</div>"; //interpolation
//multiline strings
lyrics = "Never gonna give you up\nNever gonna let you down";
console.log("1 and 1 make " + (1 + 1)); //aanything inside the interpolation (${ and }) can be a js expression 
console.log(html);
//tagged template
var nameStr = 'Zee';
function sayHello(text, name) {
    return name ? 'Hi, ' + name : 'Hi';
}
//ref. https://www.tektutorialshub.com/typescript/typescript-tagged-templates/
var templateWithTag = sayHello(__makeTemplateObject(["", " world"], ["", " world"]), nameStr);
var templateWithoutTag = nameStr + " world";
//var templateWithoutPlaceholder = sayHello` world`;//error: must have 2nd arg: a string placeholder
console.log(templateWithTag);
console.log(templateWithoutTag);
var greet = function (name) { return "hello " + name; };
console.log(greet('Zeeshan')); // hello timothee
//raw and rest
var firstName = "Sachin";
var lastName = "Tendulkar";
var topic = "Typescript";
function say(strings) {
    var expr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        expr[_i - 1] = arguments[_i];
    }
    var str = '';
    console.log(strings.raw); //this gives us raw template strings w/o placeholders
    strings.forEach(function (string, i) {
        str += string + (expr[i] || '');
    });
    return str;
}
console.log(say(__makeTemplateObject(["Welcome, ", " ", ". Learn ", " here"], ["Welcome, ", " ", ". Learn ", " here"]), firstName, lastName, topic));
