const sum = require('./js-tests');//export functions or modules to test
//Setting up tests:
beforeAll(() => {
  console.log('Strting tests...');
})
afterAll(() => {
  console.log('Ended all tests...');
})
//describing a s=test suit
describe('BASIC Jest testing', () => {
 
beforeEach(() => {
  console.log('Test Started');
})
afterEach(() => {
  console.log('Test Ended');
})

//test for external function
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
//test for internal function
const calcAge = (birthyesr) => {
    let age = new Date().getFullYear() - birthyesr
    console.log('age is:' + age);
    return age;
}; 
test('age calculator by birth year', () => {
    expect(calcAge(1975)).toBe(45);
});
 
const { Functions } = require('./ts-tests')

test('test TS functions exported', () => {
  expect(Functions.add(1, 2)).toBe(3); 
});

test('compare JSON/static objects with toEqual', () => {
  expect(Functions.createObject()).toEqual({
    firstName:'Zeeshan', lastName:'Ahmed'
  });
});

test('compare JSON/static objects with toBe', () => {
  expect(Functions.createObject()).toBe({
    firstName:'Zeeshan', lastName:'Ahmed'
  });
});

test('compare a string with a regex', () => {
  expect('Ahmed').toMatch(/Z/);
});

//w/o async and await
// test('test promise by an http api call', () => {
//   expect.assertions(1);//verifies that a certain number of assertions are called during a test
//   //returning an asyc call is important
//   return Functions.httpCall('https://jsonplaceholder.typicode.com/todos/1')
//     .then(data => {
//       expect(data.title).toEqual('delectus aut autem');
//     }).catch(err => {
//       console.log(err)
//     });
// });

  
//with async and await
test('test promise by an http api call', async() => {
  expect.assertions(1);//verifies that a certain number of assertions are called during a test
  var data = await Functions.httpCall('https://jsonplaceholder.typicode.com/todos/1');
  expect(data.title).toEqual('delectus aut autem');
   
});
  
});
