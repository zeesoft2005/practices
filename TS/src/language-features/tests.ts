///<reference path="Learning/2-generics.ts"/>
///<reference path="Learning/3-OOP.ts"/>
import IShape from "./Learning/4-modules"

//==== OOP: class types =====//
/*
const Prius = new TS.OOP.Car('Prius', 4, true);  
//Prius.Price = 20 * 100000;
Prius.startRunning(); // Prius is running
console.log(Prius.doors);//public by default
//console.log(TS.OOP.Car.carsRunning() + ' cars are running...');

///Prius.isAuto = false;//can't set outside constructor
const Vitz = new TS.OOP.Car('Vitz', 2, true);  
Vitz.startRunning(); // Vitz is running
//console.log(TS.OOP.Car.carsRunning() + ' cars are running...');
const CD70 = new TS.OOP.Byke('CD-70',false);  
CD70.startRunning(); // CD70 is running
const YBR = new TS.OOP.Byke('YBR', true);  
YBR.startRunning(); // CD70 is running
*/

let circle: IShape;
circle = {
    draw: function () {

        console.log("drawing a circle"); 
    
}
};
circle.draw();
