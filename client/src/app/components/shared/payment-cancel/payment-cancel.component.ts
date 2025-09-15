import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrl: './payment-cancel.component.scss'
})
export class PaymentCancelComponent implements OnInit{
  redirectUrl: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.redirectUrl = params['referrer'];
    })
  }

  goToReferrer() {
    if (!this.redirectUrl) return;
    const url = decodeURI(this.redirectUrl);
    const aElm: HTMLAnchorElement = document.createElement('a');
    aElm.href = url;
    aElm.target = '_self';
    aElm.click();
  }
}
