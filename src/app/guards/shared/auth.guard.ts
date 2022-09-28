import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { UserStatusService } from 'src/app/services/userStatus/user-status.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userStatus: UserStatusService) {}

  public exitFunction(): Promise<boolean> {
    this.userStatus.logged = false;
    return this.router.navigate(['/']);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userStatus.logged) return true;

    this.router.navigate(['login']);
    return false;
  }
}
