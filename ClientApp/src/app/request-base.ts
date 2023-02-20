export class LoginModel {

    constructor() {
        this.UserName = '';
        this.Password = '';
    }

    public UserName: string;
    public Password: string
    public Email?: string;
}
