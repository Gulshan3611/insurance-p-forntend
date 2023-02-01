import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../app/_services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthService) { }

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('go_d_r_a') || '{}');
    if (currentUser && Object.keys(currentUser).length === 0
      && Object.getPrototypeOf(currentUser) === Object.prototype) {
      this._router.navigate(['/auth/login']);
      return false;
    }
    return true;

  }
}
