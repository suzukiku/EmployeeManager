import { Token, User } from "./_models/api-models";

export class LoginResponse {
    constructor() {
        this.user = new User();
        this.token = new Token();
    }

    public user: User;
    public token: Token;
}
export class LoginResponseC {
    constructor() {
        this.User = "";
        this.Token = "";
    }

    public User: string;
    public Token: string;
}
export class RegisterModel {

    constructor() {
        this.UserName = '';
        this.FirstName = '';
        this.LastName = '';
        this.Password = '';
        this.Email = '';
    }

    public UserName: string;
    public FirstName: string;
    public LastName: string;
    public Password: string;
    public Email: string;
}