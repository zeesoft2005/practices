  
    
namespace TS{
    export namespace GenericTypes {
  //types with interfaces
  interface IPerson<T>{
    name: string;
    age: number;
    profileInfo<T>():T;
  }
  // class Employee implements IPerson<Employee> {
  //   name: string;
  //   age: number;
  //    profileInfo<T>():T{  }
  // } 
  // type Employee=ICar
  
  
  
  export class List<T>
  {
    //private _last: T;
    constructor(private items: T[]){}
     add(el: T):void {
      //this._last = el;
      this.items.push(el);
    }
    // get last(): T{
    //     return this._last;
    // }
     pop<T>(): any {
      return this.items.pop();
    }
    
    //printList:()=> string;
  }
}
 
export namespace GenericFunctions{
    //==== typed functions =====//
//return type can by any primitive or void
function IsNumberEven(a: number): string
{
 return a % 2 == 0 ? 'even' : 'odd';
}
let answer = IsNumberEven(2);
console.log(answer);

//==== Generics types =====//

let strArr: Array<string>;
strArr = ['Zee', 'Shan'];
function Echo<T>(t: T): T
{
  return t;
}
//console.log(Echo<Array<string>>(strArr));
let identityFunc: <T>(arg: T) => T;

const last = <T>(arr: T[]): T => {
  return arr[arr.length-1];
}

console.log(last([]));//prints null
console.log(last<number>([2, 3]));// prints 3
console.log(last(['two', 'three']));//prints three

const makeArray = <T>(size: number)=>{
  return new Array<T>(size);
}
let namesArr = makeArray<string>(5);
//namesArr.push(1);//not allowed
namesArr.push('zee');
console.log(namesArr);
let ages = makeArray<number>(5);
ages.push(23);
console.log(ages);

let toFullName = <T extends {F: string, L: string}> (obj: T) =>{
  return { ...obj, FullName: obj.F + ' ' + obj.L };
};

console.log(toFullName({F:'Zeeshan', L:'Ahmed', Age:45}));
//a function of params T, U that returns any
function doubleGenericFunc<T, U>(name: T, age: U): any 
{
  return name +' of age: '+ age;
}
let doubleGenericLambda: <T, U>(a: T, d: U) => any = (a, d) => {
  return a +' : '+ d;
}; 

var func_output = doubleGenericFunc<number, number>(1, 12);
var lumbda_output = doubleGenericLambda<string, number>('zee', 12);

console.log('dbl generic func:'+func_output);
console.log('dbl generic lumbda:'+lumbda_output);


}
}