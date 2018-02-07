import { Injectable }       from '@angular/core';
import {CanActivate, Router,} from '@angular/router';
import { ServicesService }      from '../services.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) { }

  canActivate() {
    if(this.servicesService.loggedIn()){
      this.router.navigate(['/register']);
      return false;
    } else{
      return true;
    }
  }
}
