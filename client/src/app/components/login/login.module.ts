import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {GoogleAuthService} from "../../services/google-auth.service";
import {OAuthLogger, OAuthModule, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {MyOAuthLogger} from "../../DTO/MyAuthLogger";

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        OAuthModule.forRoot()
    ],
  providers: [
    OAuthService,
    { provide: OAuthLogger, useClass: MyOAuthLogger },
    GoogleAuthService,
    UrlHelperService
  ],
})
export class LoginModule { }
