import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private securityService: SecurityService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let claimType: string = route.data["claimType"];

    let auth = localStorage.getItem("AuthObject");
    if (auth) {
      Object.assign(this.securityService.securityObject, JSON.parse(auth))
    }

    let isAuth = this.securityService.securityObject.isAuthentificated
      && this.securityService.hasClaim(claimType);

    //let isPropTrue = this.securityService.securityObject.getValueOfProperty(this.securityService.securityObject, claimType);
    
    //return isAuth && isPropTrue;

    if (isAuth){
      return true;
    }
    else{
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }

  }
  
}
