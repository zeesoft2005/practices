//import functions or modules to test
const sum = require('./js-tests');
const { Functions, Sum } = require('./ts-tests')
//import SumMaker as Sum  from "./ts-tests";//can only be used in a ts file

//Setting up tests:
beforeAll(() => {
  console.log('Starting tests...');
})
afterAll(() => {
  console.log('Ended all tests...');
})
//describing a test suit
describe('BASIC testing', () => {
  return;
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
  test('test a class function', () => { 
      expect(Sum.Of(1, 2)).toBe(1);
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

describe('MOCKS', () => { 
  const axios = require('./axiosConfig');
  const getPhotosByAlbumId = require('./api');
  jest.mock('./axiosConfig', () => {
    return {
        baseURL: 'https://jsonplaceholder.typicode.com/albums',
        request: jest.fn().mockResolvedValue({
            data:
                [
                    {
                        "albumId": 2,
                        "id": 51,
                        "title": "non sunt voluptatem placeat consequuntur rem incidunt",
                        "url": "https://via.placeholder.com/600/8e973b",
                        "thumbnailUrl": "https://via.placeholder.com/150/8e973b"
                    },
                    {
                        "albumId": 2,
                        "id": 52,
                        "title": "eveniet pariatur quia nobis reiciendis laboriosam ea",
                        "url": "https://via.placeholder.com/600/121fa4",
                        "thumbnailUrl": "https://via.placeholder.com/150/121fa4"
                    },
                    {
                        "albumId": 2,
                        "id": 53,
                        "title": "soluta et harum aliquid officiis ab omnis consequatur",
                        "url": "https://via.placeholder.com/600/6efc5f",
                        "thumbnailUrl": "https://via.placeholder.com/150/6efc5f"
                    }
                ]
        }),
    }
});
  test('mocking an api call against mock api', async () => { 
   
    var data = await getPhotosByAlbumId(2);
    expect(data.length).toBe(3);

  });
});