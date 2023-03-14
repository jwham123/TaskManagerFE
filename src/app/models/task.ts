import { User } from "./user";

export class Task {
    id:number;
    name:String;
    description:string;
    date:String;
    time:String;
    estTime:number;
    completed:boolean;
    user:User;

    constructor(id:number, name:String, description:string, date:String, time:String, estTime:number, completed:boolean, user:User) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.time = time;
        this.estTime = estTime;
        this.completed = completed;
        this.user = user;
    }
}
