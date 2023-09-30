import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetailOpenGuard implements CanActivate {
  
  constructor(
    private _authservice: AuthService,
    private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this._authservice.getLoggedIn()) {
        this.router.navigate(['login']);
        return false;
      }
      return true;
    // return this._authservice.isLoggedIn$.pipe(
    //   tap(isLoggedIn => {
    //     if(!isLoggedIn) {
    //       this.router.navigate(['login']);
    //     }
    //   })
    // ); 
  }
  
}
