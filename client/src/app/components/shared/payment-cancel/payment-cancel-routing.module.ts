import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PaymentCancelComponent} from "./payment-cancel.component";

const routes: Routes = [{ path: '', component: PaymentCancelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCancelRoutingModule {}
