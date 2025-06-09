import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-hire-card1',
  templateUrl: './hire-card1.component.html',
  styleUrls: ['./hire-card1.component.scss']
})
export class HireCard1Component {

  constructor(private router: Router, private cookieService: AuthService ) { }

  moveToRegister() {
    const referrer = this.cookieService.getReferer();
    const platform = this.cookieService.getPlatform();
    const promo = this.cookieService.getPromotion();
    const aElm: HTMLAnchorElement = document.createElement('a');
    const currentUrl = window.location.origin + window.location.pathname;
    const recruiterRedirectParams = new URLSearchParams({
      plat: platform,
      ref: referrer,
      prom: promo,
      rb: 'RECRUITER',
      lv: '2',
    });
    aElm.href = `https://login.talentboozt.com/login?redirectUri=${currentUrl}?&${recruiterRedirectParams.toString()}`;
    aElm.target = '_self';
    aElm.click();
  }
}
