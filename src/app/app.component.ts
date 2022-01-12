import { Component } from '@angular/core';
import { AuthRepositoryService } from './shared/services/auth-repository/auth-repository.service';
import LocalStorageHelper from './shared/utils/storageHelper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUserAuthenticated = false;

  constructor(private authRepo: AuthRepositoryService) {
    this.isUserAuthenticated = LocalStorageHelper.get(authRepo.isloggedIn) as boolean;

    authRepo.userAuthenticatedEvent.subscribe((isAuth: boolean) => {
      this.isUserAuthenticated = isAuth;
    });
  }

  onLogOut() {
    this.authRepo.logout();
    this.isUserAuthenticated = false;
  }
}
