import { Component, OnInit, NgModule } from '@angular/core';
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-auth';
import { MessageService } from '../shared/messaging/message.service';
import { SecurityService } from '../shared/security/security.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth | undefined;
  returnUrl: string | undefined;

  constructor(private securityService: SecurityService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { 

  }

  ngOnInit(): void {  
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')!;
  }

  login(){
    //console.log('name password: ' + this.user.userName + ' ' + this.user.password);
    
    this.msgService.clearAll();
    this.securityObject?.init();
    this.securityService
      .login(this.user)
      .subscribe(resp => {
        localStorage.setItem("AuthObject",JSON.stringify(resp));
        this.securityObject = resp;

        if (this.returnUrl){
          this.router.navigateByUrl(this.returnUrl);
        }
      });
  }

}
