import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {GoogleAuthService} from "../../services/google-auth.service";
import {MyOAuthLogger} from "../../DTO/MyAuthLogger";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    SharedPipesModule
  ],
  providers: [
    OAuthService,
    { provide: OAuthLogger, useClass: MyOAuthLogger },
    GoogleAuthService,
    UrlHelperService
  ],
})
export class HomeModule { }
