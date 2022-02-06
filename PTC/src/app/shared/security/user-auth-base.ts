export class UserAuthBase{
    userName: string = "";
    //password: string = ""; // TODO: verify..
    bearerToken: string = "";
    isAuthentificated: boolean = false;

    init(): void{
        this.userName = "";
        this.bearerToken = "";
        this.isAuthentificated = false;
    }
}