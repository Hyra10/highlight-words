import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRepositoryService } from '../services/auth-repository/auth-repository.service';
import LocalStorageHelper from '../utils/storageHelper';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private repo: AuthRepositoryService) {}

  /**
   * simple guard that checks on the local storage if the user is logged in
   */
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if (LocalStorageHelper.get(this.repo.isloggedIn)) {
        return true;
      }

      this.router.navigate(['/login']);
  }

}
