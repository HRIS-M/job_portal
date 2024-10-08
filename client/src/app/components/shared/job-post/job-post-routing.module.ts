import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Routes} from "@angular/router";
import {JobPostComponent} from "./job-post.component";
import {AuthGuard} from "../../../guards/auth.guard";
import {AdminGuard} from "../../../guards/admin.guard";
import {CanDeactivateGuard} from "../../../guards/can-deactivate.guard";

const routes: Routes = [{path: '', component: JobPostComponent, canActivate: [AuthGuard, AdminGuard], canDeactivate: [CanDeactivateGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPostRoutingModule { }
