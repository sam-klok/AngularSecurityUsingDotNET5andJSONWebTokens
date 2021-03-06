import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-auth';
import { ConfigurationService } from '../configuration/configuration.service';
import { MessageService } from '../messaging/message.service';

const API_ENDPOINT = "security/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();
  apiUrl: string = "";
  private hasChanged = new BehaviorSubject<number>(0);
  securityReset = this.hasChanged.asObservable();

  constructor(private http: HttpClient,
    private msgService: MessageService,
    private configService: ConfigurationService) { 
      this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT;
  }

  login(entity: AppUser): Observable<AppUserAuth>{
    delete entity.userId;

    return this.http.post<AppUserAuth>(this.apiUrl + "login", 
      entity, httpOptions).pipe(
        tap(resp => {
          Object.assign(this.securityObject, resp);

          this.hasChanged.next(0);
        }),
        catchError(
          this.handleError<AppUserAuth>('login', 
          "Invalid user name/password", new AppUserAuth())
        )
      )
  }

  // login(entity: AppUser): Observable<AppUserAuth>{
  //   this.securityObject.userName = entity.userName;

  //   switch(entity.userName.toLocaleLowerCase()){
  //     case "samklok":
  //     case "sklokov":
  //     case "psheriff":
  //       this.securityObject.isAuthentificated = true;
  //       this.securityObject.canAccessProducts = true;
  //       this.securityObject.canAccessProducts = true;
  //       this.securityObject.canAccessCategories = true;
  //       this.securityObject.canAccessLogs = true;
  //       this.securityObject.canAccessSettings = true;
  //       this.securityObject.canAddCategory = true;
  //       this.securityObject.canAddProduct = true;
  //       this.securityObject.canSaveProduct = true;
  //       break;

  //     case "bjones":
  //       this.securityObject.isAuthentificated = true;
  //       this.securityObject.canAccessLogs = true;
  //       this.securityObject.canAccessSettings = true;
  //       break;        

  //     default:
  //       this.securityObject.userName = "Invalid user name or password";
  //       break;
  //   }

  //   return of(this.securityObject);
  // }

  private handleError<T>(operation = 'operation', msg = '', result?: T) {
    // Add error messages to message service
    return (error: any): Observable<T> => {
      // Clear any old messages
      this.msgService.clearExceptionMessages();
      this.msgService.clearValidationMessages();

      msg = "Status Code: " + error.status + " - " + msg || "";

      console.log(msg + " " + JSON.stringify(error));

      // Set the last exception generated
      this.msgService.lastException = error;

      switch (error.status) {
        case 400:  // Model State Error
          if (error.error) {
            // Add all error messages to the validationMessages list
            Object.keys(error.error.errors)
              .map(keyName => this.msgService
                .addValidationMessage(error.error.errors[keyName][0]));
            // Reverse the array so error messages come out in the right order
            this.msgService.validationMessages = this.msgService.validationMessages.reverse();
          }
          break;
        case 404:
          this.msgService.addExceptionMessage(msg);
          break;
        case 500:
          this.msgService.addExceptionMessage(error.error);
          break;
        case 0:
          this.msgService.addExceptionMessage(
            "Unknown error, check to make sure the Web API URL can be reached." + " - ERROR: " + JSON.stringify(error));
          break;
        default:
          this.msgService.addException(error);
          break;
      }

      // Return default configuration values
      return of(result as T);
    };
  }

  logout(): void{
    this.securityObject.init();
    this.hasChanged.next(0);
  }

  // hasClaim(claimType: any, claimValue?: any):boolean{
  //   return this.isClaimValid(claimType, claimValue);
  // }

  hasClaim(claimType: any, claimValue?: any):boolean{
    let ret: boolean = false;

    if (typeof claimType === "string"){
      ret = this.isClaimValid(claimType, claimValue);
    }
    else{
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++){
          ret = this.isClaimValid(claims[index]);

          if (ret){
            break;
          }
        }
      }
    }

    return ret;
  }

  private isClaimValid(claimType: string, claimValue?:string): boolean {
    let ret: boolean = false;
    let auth: AppUserAuth | undefined;

    auth = this.securityObject;

    if(auth){
      if (claimType.indexOf(":")>=0){
        let words: string[] = claimType.split(":");
        claimType = words[0].toLowerCase();
        claimValue = words[1];
      }
      else{
        claimType = claimType.toLowerCase();
        claimValue = claimValue ? claimValue : "true";
      }

      ret = auth
        .claims
        .find(c=>c.claimType.toLowerCase() == claimType && c.claimValue == claimValue) != null;
    }

    return ret;
  }
}
