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
