export class Employee{
    constructor() {
        this.employeeID = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.userId = '';
    }
    public employeeID:string | null;
    public firstName: string;
    public lastName: string;
    public email: string;
    public userId: string;
}

export class Projects{
    constructor() {
        this.position = '';
        this.name = '';
        this.author = '';
    }
    public position: string;
    public name: string;
    public author: string;
}

export class ResponseBase {

    constructor() {
        this.message = '';
    }

    public message: string;
}

export class TimeManager{
    constructor() {
        this.timemanagerID = '';
        this.timeStamp = new Date();
        this.workHours = '';
        this.breakTime = '';
        this.employeeId = '';
    }
    public timemanagerID: string | null;
    public timeStamp: Date;
    public workHours: string;
    public breakTime: string;
    public employeeId: string;
}



export class WorkHours{
    constructor() {
        this.workhoursID = '';
        this.checkindate = '';
        this.checkoutdate = '';
        this.employeeID = '';
    }
    public workhoursID: string | null;
    public checkindate: string;
    public checkoutdate: string;
    public employeeID: string;

}
export class User {

    constructor() {
        this.id = '';
        this.userName = '';
        this.email = '';
        this.password = '';
        this.isAdmin = false;
        this.isUser = false;
    }

    public id: string;
    public userName: string;
    public email: string;
    public password: string;
    public isAdmin: boolean;
    public isUser: boolean;
}
export class Token {

    constructor() {
        this.tokenType = '';
        this.accessToken = '';
    }

    public tokenType: string;
    public accessToken: string;

}


//Responses 
export class GetTimeManagerByEmployeeIdResponse{
    constructor(){
        this.timeManager = new Array<TimeManager>();
        this.timeManagerResult = new TimeManagerResult();
    }
    public timeManager: Array<TimeManager>;
    public timeManagerResult: TimeManagerResult;
}
export class TimeManagerResult {
    constructor(){
        this.workHours = "";
        this.breakTime ="";
    }
    public workHours: string;
    public breakTime: string;
}