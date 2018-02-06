import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { ServicesService }      from '../services.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) { }

  canActivate() {
    if(this.servicesService.loggedIn()){
      return true;
    } else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
