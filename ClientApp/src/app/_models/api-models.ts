export class Employee{
    constructor() {
        this.employeeID = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
    }
    public employeeID:string | null;
    public firstName: string;
    public lastName: string;
    public email: string;
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
        this.Id = '';
        this.UserName = '';
        this.Email = '';
        this.Password = '';
        this.IsAdmin = false;
        this.IsUser = false;
    }

    public Id: string;
    public UserName: string;
    public Email: string;
    public Password: string;
    public IsAdmin: boolean;
    public IsUser: boolean;
}
export class Token {

    constructor() {
        this.TokenType = '';
        this.AccessToken = '';
    }

    public TokenType: string;
    public AccessToken: string;

}