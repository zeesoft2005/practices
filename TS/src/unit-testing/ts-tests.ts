import Axios from "axios";

 const functions = {
     add: (a: number, b: number) => a + b,
     createObject: () => {
         return {firstName:'Zeeshan', lastName:'Ahmed'}
     },
     httpCall: (url:string) => Axios.get(url)
         .then(res => res.data)
         .catch(err => err.message)
     
    
};

export { functions as Functions} 