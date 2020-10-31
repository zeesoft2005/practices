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
