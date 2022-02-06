import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUser } from 'src/app/security/app-user';
import { AppUserAuth } from 'src/app/security/app-user-auth';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  securityObject: AppUserAuth = new AppUserAuth();
  constructor() { }

  login(entity: AppUser): Observable<AppUserAuth>{
    this.securityObject.userName = entity.userName;

    switch(entity.userName.toLocaleLowerCase()){
      case "sklokov":
      case "psheriff":
        this.securityObject.isAuthentificated = true;
        this.securityObject.canAccessProducts = true;
        this.securityObject.canAccessProducts = true;
        this.securityObject.canAccessCategories = true;
        this.securityObject.canAccessLogs = true;
        this.securityObject.canAccessSettings = true;
        this.securityObject.canAddCategory = true;
        this.securityObject.canAddProduct = true;
        this.securityObject.canSaveProduct = true;
        break;

      case "bjones":
        this.securityObject.isAuthentificated = true;
        this.securityObject.canAccessLogs = true;
        this.securityObject.canAccessSettings = true;
        break;        

      default:
        this.securityObject.userName = "Invalid user name or password";
        break;
    }

    return of(this.securityObject);
  }

  logout(): void{
    this.securityObject.init();
  }
}
