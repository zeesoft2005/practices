export class User{
    constructor(){
        this.Id= Number.parseInt(Math.random().toString().substring(2));
    }

    Id: number; 
    Email: string;
    Password: string;
    Name: string;
}