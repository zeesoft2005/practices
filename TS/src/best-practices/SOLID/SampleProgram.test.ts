import FileStore from './SampleProgram';

describe('Testing FileStore', () => {

let  msg = 'a message to save to disk';
let  id = 1;
let  directory = 'teststore';
let  filestore = new FileStore(directory);  
 
  describe('reading and writing files', () => {
      describe('read when the file does not exist', () => {
          test('returns undefined', () => {
            expect(filestore.read(1)).toBeUndefined()
          })
      })
      describe('save', () => {
        test('should save the message to a file called id.txt', () => {
          filestore.save(id, msg);
        })
      })
      describe('read when the file exists', () => {
          test('should read the message from file given an id', () => {
            expect(filestore.read(id)).toBe(msg)
          })
        })
   })
})