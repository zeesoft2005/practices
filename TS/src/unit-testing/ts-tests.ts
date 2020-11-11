import axios from "axios";


 const functions = {
     add: (a: number, b: number) => a + b,
     createObject: () => {
         return {firstName:'Zeeshan', lastName:'Ahmed'}
     },
     httpCall: (url:string) => axios.get(url)
         .then(res => res.data)
         .catch(err => err.message)
     
    
};

class Sum {
 
    static Of(...numbers: number[]): number {        
         let sum = 0;
        for (const n of numbers) {
            sum = n + sum;            
        }
        return sum;
    }
}

export { functions as Functions } 
export { Sum  }
