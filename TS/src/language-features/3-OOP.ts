
namespace TS{
    export namespace OOP{

  export interface IVehicle {  
    model: String;  
    startRunning(): void  
  }
  export interface ICar extends IVehicle {  
    doors: number;  
  }
  export interface IByke extends IVehicle {  
    isSportsByke: boolean;  
  }
  export abstract class Vehicle implements IVehicle{
    constructor(readonly model: String) {  
        
    }
   abstract startRunning(): void;
  }

  export class Car extends Vehicle implements ICar{
  
      static running: number;
      //private price: number = 0;
      constructor(readonly model: String, readonly doors: number, public readonly isAuto: Boolean) {  
        super(model);
      }
      // set Price(price: number){
      //   this.price = price;
      // }
      // get Price(): number {
      //   return this.price;
      // }
      startRunning(): void {  
          console.log(`The ${this.isAuto?' auto':''} car ${this.model} is running...`);
          Car.running = Car.running + 1;  
        }
      static carsRunning(): number{
          return Car.running;
      }
    }  
    export class Byke extends Vehicle implements IByke{
      constructor(readonly model: String, public readonly isSportsByke: boolean) {  
        super(model);
      }    
      startRunning(): void {  
        console.log(`The ${this.isSportsByke? 'sports-byke':''} byke ${this.model} is running...`);
      }
    }
interface Point {
  x: number;
  y: number;
}

////type template
type point = { z:11, y: 26, x: 12, 
  // toString: function(){
  // return 'Point';
  // }  
}


function printPoint(p: Point) {
  console.log(p);
}

// point.toString = function(){
//   return this.toString()+ '(' + this.x + ', ' + this.y + (this.z? ', z' + this.z : '')+ ')';
// };
// printPoint(point);

}



}