import { first, last } from "rxjs";
import { Task } from "./task";

export class User {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    tickets:Array<Task>;

    constructor(id:number, firstName:string, lastName:string, email:string, password:string, tickets:Array<Task>) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.tickets = tickets;
    }
}