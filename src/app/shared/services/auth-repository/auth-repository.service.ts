import { Injectable, EventEmitter } from '@angular/core';
import AuthModel from '../../Interfaces/auth-model.entity';
import LocalStorageHelper from '../../utils/storageHelper';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthRepositoryService {

  public readonly isloggedIn = 'isloggedIn';
  public readonly userId = 'userId';
  private readonly authData = 'authData';
  private readonly userDoesntExists = 'User doesn\'t exists';
  private readonly userDoesExists = 'User already exists';
  userAuthenticatedEvent = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  /**
   * it logs the user in with the given data
   * @param data includes id, email and psw
   */
  login(data: AuthModel): void {
    const userData = this.userExists(data);
    if (userData) {
      LocalStorageHelper.add(this.isloggedIn, true);
      LocalStorageHelper.add(this.userId, userData.userId);
      this.userAuthenticatedEvent.emit(true);
      this.router.navigate(['/article']);
    } else {
      alert(this.userDoesntExists);
    }
  }

  /**
   * it logs the user out
   */
  logout(): void {
    LocalStorageHelper.add(this.isloggedIn, false);
    LocalStorageHelper.remove(this.userId);
    this.userAuthenticatedEvent.emit(false);

    this.router.navigate(['/login']);
  }

  /**
   * it registers the user with the given data
   * @param data includes user id, email and psw
   */
  register(data: AuthModel): void {
    if (this.userExists(data)) {
      alert(this.userDoesExists);
      return;
    }

    const authData = LocalStorageHelper.get(this.authData) as AuthModel[] || [];

    authData.push(data);

    LocalStorageHelper.add(this.authData, authData);

    alert('User Registered');
    this.router.navigate(['/login']);
  }

  /**
   * it lets the user change its password with a given email
   * @param data includes user id, email and psw
   */
  forgotPsw(data: AuthModel): void {
    const authData = LocalStorageHelper.get(this.authData) as AuthModel[] || [];
    const user = authData.find(x => x.email === data.email);

    if (user) {
      user.psw = data.psw;

      LocalStorageHelper.add(this.authData, authData);
      this.router.navigate(['/login']);
    } else {
      alert(this.userDoesntExists);
    }
  }

  /**
   * look at the auth data on the local Storage and search for
   * the user with the given userId
   * @param data includes user id, email and psw
   * @returns the user that matches the userId
   */
  private userExists(data: AuthModel): AuthModel {
    return (LocalStorageHelper.get(this.authData) as AuthModel[] || [])
      .find(x => x.email === data.email && x.psw === data.psw);
  }

}
