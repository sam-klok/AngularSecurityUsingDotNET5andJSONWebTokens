import { Component, OnInit, NgModule } from '@angular/core';
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-auth';
import { MessageService } from '../shared/messaging/message.service';
import { SecurityService } from '../shared/security/security.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth | undefined;

  constructor(private securityService: SecurityService,
    private msgService: MessageService) { 

  }

  ngOnInit(): void {  

  }

  login(){
    //console.log('name password: ' + this.user.userName + ' ' + this.user.password);
    
    this.msgService.clearAll();
    this.securityObject?.init();
    this.securityService
      .login(this.user)
      .subscribe(resp => this.securityObject = resp);
  }

}
