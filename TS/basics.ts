class Car {

    // fields  
      model: String;  
      doors: Number;  
      isElectric: Boolean;
    
    constructor(model: String, doors: Number, isElectric: Boolean) {  
        this.model = model;  
        this.doors = doors;  
        this.isElectric = isElectric;  
      }
    
    displayMake(): void {  
        console.log(`This car is ${this.model}`);  
      }
    
    }
    const Prius = new Car('Prius', 4, true);  
Prius.displayMake(); // This car is Prius
interface ICar {  
    model: String,  
    make: String,  
    display(): void  
  }
  
  const aCar: ICar = {  
    model: 'Prius',  
    make: 'Toyota',  
    display() => { console.log('hi'); }  
  }