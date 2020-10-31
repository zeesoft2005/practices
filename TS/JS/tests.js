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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TS;
(function (TS) {
    var GenericTypes;
    (function (GenericTypes) {
        // class Employee implements IPerson<Employee> {
        //   name: string;
        //   age: number;
        //    profileInfo<T>():T{  }
        // } 
        // type Employee=ICar
        var List = /** @class */ (function () {
            //private _last: T;
            function List(items) {
                this.items = items;
            }
            List.prototype.add = function (el) {
                //this._last = el;
                this.items.push(el);
            };
            // get last(): T{
            //     return this._last;
            // }
            List.prototype.pop = function () {
                return this.items.pop();
            };
            return List;
        }());
        GenericTypes.List = List;
    })(GenericTypes = TS.GenericTypes || (TS.GenericTypes = {}));
    var GenericFunctions;
    (function (GenericFunctions) {
        //==== typed functions =====//
        //return type can by any primitive or void
        function IsNumberEven(a) {
            return a % 2 == 0 ? 'even' : 'odd';
        }
        var answer = IsNumberEven(2);
        console.log(answer);
        //==== Generics types =====//
        var strArr;
        strArr = ['Zee', 'Shan'];
        function Echo(t) {
            return t;
        }
        //console.log(Echo<Array<string>>(strArr));
        var identityFunc;
        var last = function (arr) {
            return arr[arr.length - 1];
        };
        console.log(last([])); //prints null
        console.log(last([2, 3])); // prints 3
        console.log(last(['two', 'three'])); //prints three
        var makeArray = function (size) {
            return new Array(size);
        };
        var namesArr = makeArray(5);
        //namesArr.push(1);//not allowed
        namesArr.push('zee');
        console.log(namesArr);
        var ages = makeArray(5);
        ages.push(23);
        console.log(ages);
        var toFullName = function (obj) {
            return __assign(__assign({}, obj), { FullName: obj.F + ' ' + obj.L });
        };
        console.log(toFullName({ F: 'Zeeshan', L: 'Ahmed', Age: 45 }));
        //a function of params T, U that returns any
        function doubleGenericFunc(name, age) {
            return name + ' of age: ' + age;
        }
        var doubleGenericLambda = function (a, d) {
            return a + ' : ' + d;
        };
        var func_output = doubleGenericFunc(1, 12);
        var lumbda_output = doubleGenericLambda('zee', 12);
        console.log('dbl generic func:' + func_output);
        console.log('dbl generic lumbda:' + lumbda_output);
    })(GenericFunctions = TS.GenericFunctions || (TS.GenericFunctions = {}));
})(TS || (TS = {}));
var TS;
(function (TS) {
    var OOP;
    (function (OOP) {
        var Vehicle = /** @class */ (function () {
            function Vehicle(model) {
                this.model = model;
            }
            return Vehicle;
        }());
        OOP.Vehicle = Vehicle;
        var Car = /** @class */ (function (_super) {
            __extends(Car, _super);
            //private price: number = 0;
            function Car(model, doors, isAuto) {
                var _this = _super.call(this, model) || this;
                _this.model = model;
                _this.doors = doors;
                _this.isAuto = isAuto;
                return _this;
            }
            // set Price(price: number){
            //   this.price = price;
            // }
            // get Price(): number {
            //   return this.price;
            // }
            Car.prototype.startRunning = function () {
                console.log("The " + (this.isAuto ? ' auto' : '') + " car " + this.model + " is running...");
                Car.running = Car.running + 1;
            };
            Car.carsRunning = function () {
                return Car.running;
            };
            return Car;
        }(Vehicle));
        OOP.Car = Car;
        var Byke = /** @class */ (function (_super) {
            __extends(Byke, _super);
            function Byke(model, isSportsByke) {
                var _this = _super.call(this, model) || this;
                _this.model = model;
                _this.isSportsByke = isSportsByke;
                return _this;
            }
            Byke.prototype.startRunning = function () {
                console.log("The " + (this.isSportsByke ? 'sports-byke' : '') + " byke " + this.model + " is running...");
            };
            return Byke;
        }(Vehicle));
        OOP.Byke = Byke;
        function printPoint(p) {
            console.log(p);
        }
        // point.toString = function(){
        //   return this.toString()+ '(' + this.x + ', ' + this.y + (this.z? ', z' + this.z : '')+ ')';
        // };
        // printPoint(point);
    })(OOP = TS.OOP || (TS.OOP = {}));
})(TS || (TS = {}));
