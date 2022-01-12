import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import AuthData from 'src/app/shared/models/auth-data.model';
import { AuthRepositoryService } from 'src/app/shared/services/auth-repository/auth-repository.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authRepo: AuthRepositoryService) { }

  ngOnInit() {
  }

  /**
   * function that is called when we submit the login form
   * @param form the form data where we get the user data
   * such as email and password
   */
  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const psw = form.value.password;

    this.authRepo.login(new AuthData('', email, psw));
  }
}
