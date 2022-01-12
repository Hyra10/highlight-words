import { Component, OnInit } from '@angular/core';
import { AuthRepositoryService } from 'src/app/shared/services/auth-repository/auth-repository.service';
import AuthData from 'src/app/shared/models/auth-data.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authRepo: AuthRepositoryService) { }

  ngOnInit() {
  }

  /**
   * function that is called when we submit the forgot password form
   * @param form the form data where we get the user data
   * such as email and password
   */
  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const psw = form.value.password;

    this.authRepo.forgotPsw(new AuthData('', email, psw));
  }

}
