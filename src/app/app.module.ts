import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article/article.component';
import { HighlightTextDirective } from './shared/directives/highlightText/highlight-text.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { CommentComponent } from './components/comment/comment.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HighlightTextDirective,
    TooltipComponent,
    CommentComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
