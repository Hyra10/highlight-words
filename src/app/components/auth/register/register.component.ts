import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthRepositoryService } from 'src/app/shared/services/auth-repository/auth-repository.service';
import AuthData from 'src/app/shared/models/auth-data.model';
import Utils from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authRepo: AuthRepositoryService) { }

  ngOnInit() {
  }

  /**
   * function that is called when we submit the register form
   * @param form the form data where we get the user data
   * such as email and password
   */
  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const psw = form.value.password;
    const newId = Utils.newGuid();
    this.authRepo.register(new AuthData(newId, email, psw));
  }
}
