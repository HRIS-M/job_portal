import {NgModule} from "@angular/core";
import {ProDashboardComponent} from "./pro-dashboard.component";
import {ProMainDbComponent} from "../pro-main-db/pro-main-db.component";
import {CommonModule} from "@angular/common";
import {ProDashboardRoutingModule} from "./pro-dashboard-routing.module";
import {SharedPipesModule} from "../../../../shared/modules/shared-pipes.module";
import {SharedDashboardModule} from "../../../../shared/modules/shared-dashboard.module";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProApplicantsDbComponent} from "../pro-applicants-db/pro-applicants-db.component";
import {SharedChartsComponentModule} from "../../../../shared/modules/shared-charts-component.module";
import {SharedComponentModule} from "../../../../shared/modules/shared-component.module";
import {ProCompanyAnalysisComponent} from "../pro-company-analysis/pro-company-analysis.component";

@NgModule({
  declarations: [
    ProDashboardComponent,
    ProMainDbComponent,
    ProApplicantsDbComponent,
    ProCompanyAnalysisComponent
  ],
  imports: [
    CommonModule,
    ProDashboardRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule,
    SharedPipesModule,
    SharedDashboardModule,
    SharedChartsComponentModule,
    SharedComponentModule
  ],
  exports: []
})
export class ProDashboardModule {}
