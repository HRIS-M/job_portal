import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PricingUtilities} from "../../shared/utilities/pricing.utilities";
import {CartService} from "../../services/payment/cart.service";
import {Router} from "@angular/router";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-prising',
  templateUrl: './prising.component.html',
  styleUrls: ['./prising.component.scss']
})
export class PrisingComponent implements AfterViewInit, OnInit{

  utilities = PricingUtilities;

  constructor(private windowService: WindowService,
              private cartService: CartService,
              private cookieService: AuthService,
              private meta: Meta, private title: Title,
              private router: Router) {
  }

  ngOnInit() {
    this.title.setTitle('Talentboozt -Pricing');
    this.meta.addTags([
      { name: 'description', content: 'GREAT PRICES! GREAT VALUE! Simple and Flexible pricing. Try Talentboozt for now.' },
      { name: 'keywords', content: 'Affordable Pricing, Flexible Plans, Simple Subscriptions, Talentboozt Pricing, ' +
          'Free Plan, Pro Plan, Premium Plan, Job Management, Dashboard Customization, Track Ads, Monitor Applicants, ' +
          'Verified Features, Ad Customization, Hiring Process Tools, Top Ratings, Premium Support, Separate Tools, ' +
          'Subscription FAQs, Upgrade Options, Payment Methods' }
    ]);
  }

  ngAfterViewInit() {
    if (this.windowService.nativeWindow) {
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
  }

  gotoCart(cart: any, url: string) {
    this.cartService.addToCart(cart);
    if (url.includes('https://')){
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
    } else {
      this.router.navigate([url]);
    }
  }
}
