import {PaymentCancelComponent} from "./payment-cancel.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {PaymentCancelRoutingModule} from "./payment-cancel-routing.module";

@NgModule({
  imports: [
    CommonModule,
    PaymentCancelRoutingModule
  ],
  declarations: [PaymentCancelComponent]
})
export class PaymentCancelModule { }
