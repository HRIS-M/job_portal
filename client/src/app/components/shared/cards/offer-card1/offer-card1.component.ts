import {Component, OnInit} from '@angular/core';
import {CredentialService} from "../../../../services/credential.service";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-offer-card1',
  templateUrl: './offer-card1.component.html',
  styleUrls: ['./offer-card1.component.scss']
})
export class OfferCard1Component implements OnInit{

  isOfferActive = false;
  seatsLeft = 0;

  constructor(private credentialService: CredentialService,
              public themeService: ThemeService) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.credentialService.fetchUserCountByLevel('3').subscribe((response: any) => {
      this.seatsLeft = 30 - parseInt(response);
      if (this.seatsLeft > 0 && this.seatsLeft <= 30) {
        this.isOfferActive = true;
      }
    });
  }
}
