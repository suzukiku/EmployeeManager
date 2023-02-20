import { Token, User } from "./_models/api-models";

export class LoginResponse {
    constructor() {
        this.User = new User();
        this.Token = new Token();
    }

    public User: User;
    public Token: Token;
}
export class RegisterModel {

    constructor() {
        this.UserName = '';
        this.Password = '';
        this.Email = '';
    }

    public UserName: string;
    public Password: string;
    public Email: string;
}