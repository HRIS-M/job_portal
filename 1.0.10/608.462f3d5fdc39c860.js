"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[608],{1110:(v,m,s)=>{s.d(m,{R:()=>t});var i=s(4650);let t=(()=>{class a{transform(u,p){return u&&Array.isArray(u)?u.slice(0,p):[]}static#t=this.\u0275fac=function(p){return new(p||a)};static#e=this.\u0275pipe=i.Yjl({name:"truncateComments",type:a,pure:!0})}return a})()},3937:(v,m,s)=>{s.d(m,{o:()=>u});var i=s(4650),t=s(1779),a=s(6895);function y(p,g){1&p&&(i.TgZ(0,"div",1)(1,"div",2)(2,"div",3),i._UZ(3,"img",4),i.qZA()(),i.TgZ(4,"h4"),i._uU(5,"Server Error Occurred."),i.qZA(),i.TgZ(6,"p"),i._uU(7,"Please try again later."),i.qZA(),i.TgZ(8,"button",5),i._uU(9,"Search for Jobs"),i.qZA()())}let u=(()=>{class p{constructor(){this.delay=1e3,this.isVisible=!1}ngOnInit(){setTimeout(()=>{this.isVisible=!0},this.delay)}ngAfterViewInit(){document.querySelectorAll(".material-icons").forEach(r=>{r.setAttribute("translate","no")})}static#t=this.\u0275fac=function(r){return new(r||p)};static#e=this.\u0275cmp=i.Xpm({type:p,selectors:[["app-failed-to-load-data"]],decls:1,vars:1,consts:[["class","failed-wrapper",4,"ngIf"],[1,"failed-wrapper"],[1,"py-3","px-2","px-md-4","px-lg-6"],[1,"img-wrapper"],["src","./assets/imgs/shared/server-error.svg","alt","server error"],["routerLink","/job",1,"btn-2","mb-2"]],template:function(r,d){1&r&&i.YNc(0,y,10,0,"div",0),2&r&&i.Q6J("ngIf",d.isVisible)},dependencies:[t.rH,a.O5],styles:[".failed-wrapper[_ngcontent-%COMP%]{width:100%;min-height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;flex-direction:column;padding:15px;position:absolute;inset:0;background-color:var(--color-surface-mixed-100);z-index:99}.failed-wrapper[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{width:150px;height:150px;display:flex;align-items:center;justify-content:center;margin-bottom:15px}.failed-wrapper[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.failed-wrapper[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], .failed-wrapper[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .failed-wrapper[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-bottom:15px}"]})}return p})()},9865:(v,m,s)=>{s.d(m,{t:()=>t});var i=s(4650);let t=(()=>{class a{static#t=this.\u0275fac=function(p){return new(p||a)};static#e=this.\u0275cmp=i.Xpm({type:a,selectors:[["app-forbidden"]],decls:9,vars:0,consts:[[1,"forbidden-wrapper"],[1,"d-flex","align-items-center","justify-content-center"],[1,"d-flex","flex-column","align-items-center","justify-content-center"],[1,"img-wrapper"],["src","./assets/imgs/shared/403.svg","alt","forbidden"],[1,"caption"],[1,"value"]],template:function(p,g){1&p&&(i.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),i._UZ(4,"img",4),i.qZA(),i.TgZ(5,"div",5),i._uU(6,"Seems like you don't have permission to access this page :("),i.qZA(),i.TgZ(7,"div",6),i._uU(8,"403"),i.qZA()()()())},styles:[".forbidden-wrapper[_ngcontent-%COMP%]{width:100%;height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;flex-direction:column}.forbidden-wrapper[_ngcontent-%COMP%]   .caption[_ngcontent-%COMP%]{font-size:32px;font-weight:600;color:var(--color-text-300)}.forbidden-wrapper[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:48px;font-weight:600;color:var(--color-text-100)}.forbidden-wrapper[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{width:200px;height:200px}.forbidden-wrapper[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}"]})}return a})()},3608:(v,m,s)=>{s.r(m),s.d(m,{JobDetailsModule:()=>ot});var i=s(6895),t=s(4650),a=s(1779),y=s(8666),u=s(4416),p=s(6196),g=s(8157),x=s(3378),r=s(7185),d=s(3937),h=s(927),_=s(6391),j=s(9865),A=s(8517);let Z=(()=>{class o{transform(e){if(!e)return"";const n=new Date(e);return`${n.getFullYear()}-${this.addLeadingZero(n.getMonth()+1)}-${this.addLeadingZero(n.getDate())}`}addLeadingZero(e){return e<10?`0${e}`:`${e}`}static#t=this.\u0275fac=function(n){return new(n||o)};static#e=this.\u0275pipe=t.Yjl({name:"dateFormat",type:o,pure:!0})}return o})();var I=s(1110);const O=function(o){return{"background-image":o}};function J(o,c){if(1&o&&(t.TgZ(0,"div",23)(1,"div",24),t._UZ(2,"div",25),t.qZA(),t.TgZ(3,"div",26)(4,"h1"),t._uU(5),t.qZA(),t.TgZ(6,"p"),t._uU(7,"Talent Boozt > Job Details > "),t.TgZ(8,"span"),t._uU(9),t.qZA()()()()),2&o){const e=c.$implicit;t.xp6(1),t.Q6J("ngStyle",t.VKq(3,O,e.jobBanner?"url("+e.jobBanner+")":"")),t.xp6(4),t.Oqu(e.title),t.xp6(4),t.Oqu(e.title)}}function M(o,c){if(1&o&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&o){const e=c.$implicit;t.xp6(1),t.Oqu(e)}}function T(o,c){if(1&o&&(t.TgZ(0,"ul")(1,"li"),t._uU(2),t.qZA()()),2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e)}}function P(o,c){if(1&o&&(t.TgZ(0,"div")(1,"div",41),t._uU(2,"Requirements:"),t.qZA(),t.YNc(3,T,3,1,"ul",42),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.requirements.split("\n"))}}function D(o,c){if(1&o&&(t.TgZ(0,"ul")(1,"li"),t._uU(2),t.qZA()()),2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e)}}function U(o,c){if(1&o&&(t.TgZ(0,"div")(1,"div",41),t._uU(2,"Required Experience:"),t.qZA(),t.YNc(3,D,3,1,"ul",42),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.experience.split("\n"))}}function S(o,c){if(1&o&&(t.TgZ(0,"ul")(1,"li"),t._uU(2),t.qZA()()),2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e)}}function B(o,c){if(1&o&&(t.TgZ(0,"div")(1,"div",41),t._uU(2,"Required Educational Qualifications:"),t.qZA(),t.YNc(3,S,3,1,"ul",42),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.education.split("\n"))}}function q(o,c){if(1&o&&(t.TgZ(0,"ul")(1,"li"),t._uU(2),t.qZA()()),2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e)}}function E(o,c){if(1&o&&(t.TgZ(0,"div")(1,"div",41),t._uU(2,"Required Additional Qualifications:"),t.qZA(),t.YNc(3,q,3,1,"ul",42),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.qualifications.split("\n"))}}function $(o,c){if(1&o&&(t.TgZ(0,"ul")(1,"li"),t._uU(2),t.qZA()()),2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e)}}function z(o,c){if(1&o&&(t.TgZ(0,"div")(1,"div",41),t._uU(2,"Skills:"),t.qZA(),t.YNc(3,$,3,1,"ul",42),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.skills.split("\n"))}}function F(o,c){if(1&o&&(t.TgZ(0,"ul")(1,"li"),t._uU(2),t.qZA()()),2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e)}}function V(o,c){if(1&o&&(t.TgZ(0,"div")(1,"div",41),t._uU(2,"Responsibilities and Duties:"),t.qZA(),t.YNc(3,F,3,1,"ul",42),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.responsibilities.split("\n"))}}function N(o,c){if(1&o&&(t.TgZ(0,"ul")(1,"li"),t._uU(2),t.qZA()()),2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e)}}function L(o,c){if(1&o&&(t.TgZ(0,"div")(1,"div",41),t._uU(2,"What You Will Get:"),t.qZA(),t.YNc(3,N,3,1,"ul",42),t.qZA()),2&o){const e=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",e.offer.split("\n"))}}function Y(o,c){if(1&o){const e=t.EpF();t.TgZ(0,"div",7)(1,"div",27)(2,"div",28)(3,"div",29)(4,"div",30),t._uU(5,"Job Information"),t.qZA()(),t._UZ(6,"hr"),t.TgZ(7,"div",31)(8,"div",32)(9,"i",33),t._uU(10,"how_to_reg"),t.qZA(),t.TgZ(11,"div",34)(12,"p",35),t._uU(13,"Employee Type:"),t.qZA(),t.TgZ(14,"p",36),t._uU(15),t.qZA()()(),t.TgZ(16,"div",32)(17,"i",33),t._uU(18,"location_pin"),t.qZA(),t.TgZ(19,"div",34)(20,"p",35),t._uU(21,"Location:"),t.qZA(),t.TgZ(22,"p",36),t._uU(23),t.qZA()()(),t.TgZ(24,"div",32)(25,"i",33),t._uU(26,"personal_video"),t.qZA(),t.TgZ(27,"div",34)(28,"p",35),t._uU(29,"Job Type:"),t.qZA(),t.TgZ(30,"p",36),t._uU(31),t.qZA()()(),t.TgZ(32,"div",32)(33,"i",33),t._uU(34,"cases"),t.qZA(),t.TgZ(35,"div",34)(36,"p",35),t._uU(37,"Experience:"),t.qZA(),t.TgZ(38,"p",36),t._uU(39),t.qZA()()(),t.TgZ(40,"div",32)(41,"i",33),t._uU(42,"book"),t.qZA(),t.TgZ(43,"div",34)(44,"p",35),t._uU(45,"Qualifications:"),t.qZA(),t.TgZ(46,"p",36),t._uU(47),t.qZA()()(),t.TgZ(48,"div",32)(49,"i",33),t._uU(50,"attach_money"),t.qZA(),t.TgZ(51,"div",34)(52,"p",35),t._uU(53,"Salary:"),t.qZA(),t.TgZ(54,"p",36),t._uU(55),t.qZA()()(),t.TgZ(56,"div",32)(57,"i",33),t._uU(58,"access_time"),t.qZA(),t.TgZ(59,"div",34)(60,"p",35),t._uU(61,"Date Posted:"),t.qZA(),t.TgZ(62,"p",36),t._uU(63),t.ALo(64,"dateFormat"),t.qZA()()(),t._UZ(65,"hr"),t.TgZ(66,"div",32)(67,"i",33),t._uU(68,"favorite_border"),t.qZA(),t.TgZ(69,"div",34)(70,"p",35),t._uU(71,"Save for later:"),t.qZA(),t.TgZ(72,"button",37),t.NdJ("click",function(){const b=t.CHM(e).$implicit,f=t.oxw();return t.KtG(f.userSavedIds.includes(b.id)?f.removeFav(b.id):f.saveFav(b.id))}),t._uU(73),t.qZA()()()()()(),t.TgZ(74,"div",38)(75,"div",39)(76,"div",40)(77,"div",41),t._uU(78,"Job Description:"),t.qZA(),t.YNc(79,M,2,1,"p",42),t.YNc(80,P,4,1,"div",3),t.YNc(81,U,4,1,"div",3),t.YNc(82,B,4,1,"div",3),t.YNc(83,E,4,1,"div",3),t.YNc(84,z,4,1,"div",3),t.YNc(85,V,4,1,"div",3),t.YNc(86,L,4,1,"div",3),t.TgZ(87,"button",37),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.navigateToApplyJob())}),t._uU(88,"Apply Now"),t.qZA()()()()()}if(2&o){const e=c.$implicit,n=t.oxw();t.xp6(15),t.Oqu(e.employeeType),t.xp6(8),t.Oqu(e.location),t.xp6(8),t.Oqu(e.jobType),t.xp6(8),t.Oqu(e.exShortDesc),t.xp6(8),t.Oqu(e.eduShortDesc),t.xp6(8),t.AsE("$",e.minSalary," - $",e.maxSalary,""),t.xp6(8),t.Oqu(t.lcZ(64,17,e.datePosted)),t.xp6(10),t.Oqu(n.userSavedIds.includes(e.id)?"Saved":"Save"),t.xp6(6),t.Q6J("ngForOf",e.description.split("\n")),t.xp6(1),t.Q6J("ngIf",e.requirements),t.xp6(1),t.Q6J("ngIf",e.experience),t.xp6(1),t.Q6J("ngIf",e.education),t.xp6(1),t.Q6J("ngIf",e.qualifications),t.xp6(1),t.Q6J("ngIf",e.skills),t.xp6(1),t.Q6J("ngIf",e.responsibilities),t.xp6(1),t.Q6J("ngIf",e.offer)}}function R(o,c){1&o&&(t.TgZ(0,"div"),t._UZ(1,"app-failed-to-load-data"),t.qZA())}function Q(o,c){1&o&&(t.TgZ(0,"div"),t._UZ(1,"app-result-not-found"),t.qZA())}function k(o,c){1&o&&(t.TgZ(0,"div"),t._UZ(1,"app-network-error"),t.qZA())}function W(o,c){1&o&&(t.TgZ(0,"div"),t._UZ(1,"app-forbidden"),t.qZA())}function K(o,c){if(1&o){const e=t.EpF();t.TgZ(0,"div",43)(1,"app-job-post-card1",44),t.NdJ("savedJobChanged",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.onJobSavedOrRemoved())}),t.qZA()()}if(2&o){const e=c.$implicit,n=t.oxw();t.xp6(1),t.Q6J("p",e)("userSavedIds",n.userSavedIds)("employeeId",n.employeeId)}}const X=[{path:"",component:(()=>{class o{constructor(e,n,l,b,f,C,w){this.router=e,this.valueIncrementService=n,this.employeeService=l,this.companyService=b,this.jobApplyService=f,this.cookieService=C,this.toastr=w,this.jobDataStore=[],this.filteredJobs=[],this.filteredJobDataStore=[],this.userSavedIds=[],this.loading=!1,this.serverError=!1,this.notFound=!1,this.forbidden=!1,this.corsError=!1,this.unexpectedError=!1}ngOnInit(){this.jobPostId=this.router.url.split("/")[2],this.employeeId=this.cookieService.userID(),this.filterJobData(),this.getEmployee(this.employeeId),this.getAllJobs()}ngAfterViewInit(){document.querySelectorAll(".material-icons").forEach(n=>{n.setAttribute("translate","no")}),this.addViewer()}ngOnDestroy(){sessionStorage.removeItem(`viewerId_${this.jobPostId}`)}getEmployee(e){this.employeeService.fetchFullEmployee(e).subscribe(n=>{this.employee=n,this.employeeName=this.employee.employee.firstname+" "+this.employee.employee.lastname,this.userSavedIds=this.employee.employee.savedJobs.map(l=>l.jobId)},n=>{this.warningMessage("Please Login First to Apply Jobs","Reminder")})}getAllJobs(){this.companyService.fetchAllPostedJobs().subscribe(e=>{e.forEach(n=>{n.postedJobs.forEach(l=>{l.companyName=n.companyName,l.companyLogo=n.companyLogo,l.companyLevel=n.companyLevel,l.companyId=n.companyId,this.jobDataStore.push(l)})})},e=>{404===e.status?this.notFound=!0:500===e.status?this.serverError=!0:0===e.status?this.corsError=!0:403===e.status?this.forbidden=!0:this.unexpectedError=!0,this.loading=!1})}filterJobsAds(){return this.filteredJobs=this.jobDataStore.filter(e=>null!==e.title&&e.title===this.jobPostTitle&&e.id!==this.jobPostId&&new Date(e.expiryDate)>new Date),0===this.filteredJobs.length&&(this.filteredJobs=this.jobDataStore.filter(e=>e.companyName===this.companyName&&e.id!==this.jobPostId&&new Date(e.expiryDate)>new Date)),this.sortJobsByType(),this.filteredJobs}sortJobsByType(){this.filteredJobs?.sort((e,n)=>{const l={4:1,3:2,2:3};return l[e.companyLevel]-l[n.companyLevel]})}filterJobData(){return this.filteredJobDataStore=this.jobDataStore.filter(e=>e.id===this.jobPostId),this.jobPostTitle=this.filteredJobDataStore[0]?.title,this.companyName=this.filteredJobDataStore[0]?.companyName,this.companyId=this.filteredJobDataStore[0]?.companyId,this.notFound=0===this.filteredJobDataStore.length,this.filteredJobDataStore}addViewer(){const e=`viewerId_${this.jobPostId}`;sessionStorage.getItem(e)||(this.viewerId=this.employeeId?this.generateRandomId():`anon_${this.generateRandomId()}`,sessionStorage.setItem(e,this.viewerId)),this.jobApplyService.fetchJobViewerByJobId(this.jobPostId).subscribe(n=>{const l=n[0]?.viewers||[],b=sessionStorage.getItem(e);if(!l.some(C=>C.id===b||this.employeeId&&C.employeeId===this.employeeId)){const C={id:b,employeeId:this.employeeId||"Guest_"+this.generateRandomId(),name:this.employeeName||"Guest",status:this.employeeName?"registered":"unregistered",date:new Date};this.jobApplyService.addViewer(this.companyId,this.jobPostId,C).subscribe(w=>{},w=>{console.error("Error adding viewer:",w)})}})}saveFav(e){this.employeeService.saveFavJobs(this.employeeId,{jobId:e,status:"saved"}).subscribe(n=>{this.getEmployee(this.employeeId),this.successMessage("Job Saved Successfully","Success")},n=>{this.errorMessage("Something went wrong. Please try again","Error")})}removeFav(e){this.employeeService.removeFavJobs(this.employeeId,e).subscribe(n=>{this.getEmployee(this.employeeId),this.successMessage("Job Removed Successfully","Success")},n=>{this.errorMessage("Something went wrong. Please try again","Error")})}onJobSavedOrRemoved(){this.getEmployee(this.employeeId)}successMessage(e,n){this.toastr.success(e,n,{progressBar:!0,progressAnimation:"increasing",closeButton:!0})}errorMessage(e,n){this.toastr.error(e,n,{progressBar:!0,progressAnimation:"decreasing",closeButton:!0})}warningMessage(e,n){this.toastr.warning(e,n,{progressBar:!0,progressAnimation:"decreasing"})}navigateToJobDetails(e){this.router.navigate(["/job-details",e]),setTimeout(()=>{window.location.reload()},500)}navigateToApplyJob(){this.router.navigate(["/job-apply"],{queryParams:{companyId:this.companyId,jobId:this.jobPostId}})}generateRandomId(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)}static#t=this.\u0275fac=function(n){return new(n||o)(t.Y36(a.F0),t.Y36(y.n),t.Y36(u.G),t.Y36(p.J),t.Y36(g.v),t.Y36(x.e),t.Y36(r._W))};static#e=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-job-details"]],decls:36,vars:10,consts:[["class","top-banner",4,"ngFor","ngForOf"],[1,"container",2,"max-width","clamp(320px, 90%, 1200px)"],["class","row",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"sub-topic-section"],[1,"container","popular-jobs"],[1,"container"],[1,"row"],["class","col-12 col-md-6 mb-4",4,"ngFor","ngForOf"],[1,"card-3"],[1,"d-md-flex","align-items-center","justify-content-between","card-content"],[2,"max-width","600px"],[1,"title-2","mb-3"],[1,"d-flex","align-items-center"],["routerLink","/job",1,"btn-1"],["routerLink","/learn-more-jobs",1,"btn-2"],[1,"mail-icon"],["stroke","currentColor","fill","none","stroke-width","2","viewBox","0 0 24 24","stroke-linecap","round","stroke-linejoin","round","height","1em","width","1em","xmlns","http://www.w3.org/2000/svg",1,"lg:text-[150px]","text-7xl","text-black/5","dark:text-white/5","ltr:-rotate-45","rtl:rotate-45"],["width","20","height","16","x","2","y","4","rx","2"],["d","m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"],[1,"pencil-icon"],["stroke","currentColor","fill","none","stroke-width","0","viewBox","0 0 16 16","height","1em","width","1em","xmlns","http://www.w3.org/2000/svg",1,"lg:text-[150px]","text-7xl","text-black/5","dark:text-white/5","rtl:-rotate-90"],["d","M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"],[1,"top-banner"],[1,"curved-div",3,"ngStyle"],[1,"overlay"],[1,"d-flex","align-items-center","justify-content-center","flex-column","w-100","h100","banner-cont"],[1,"col-12","col-md-4","col-lg-3","left-side"],[1,"job-details-card"],[1,"job-details-card-top"],[1,"title-1"],[1,"job-details-card-content"],[1,"job-info-item"],[1,"material-icons"],[1,"d-flex","flex-column"],[1,"tag"],[1,"tag-data"],[1,"btn-1",3,"click"],[1,"col-12","col-md-8","col-lg-9"],[1,"d-flex","align-items-center","justify-content-center","w-100"],[1,"job-description"],[1,"title-1","mb-2"],[4,"ngFor","ngForOf"],[1,"col-12","col-md-6","mb-4"],[3,"p","userSavedIds","employeeId","savedJobChanged"]],template:function(n,l){1&n&&(t.YNc(0,J,10,5,"div",0),t.TgZ(1,"div",1),t.YNc(2,Y,89,19,"div",2),t.YNc(3,R,2,0,"div",3),t.YNc(4,Q,2,0,"div",3),t.YNc(5,k,2,0,"div",3),t.YNc(6,W,2,0,"div",3),t.TgZ(7,"div",4)(8,"h3"),t._uU(9,"Related Vacancies"),t.qZA(),t.TgZ(10,"p"),t._uU(11,"Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide."),t.qZA()(),t.TgZ(12,"div",5)(13,"div",6)(14,"div",7),t.YNc(15,K,2,3,"div",8),t.ALo(16,"truncateComments"),t.qZA()()(),t.TgZ(17,"div",9)(18,"div",10)(19,"div",11)(20,"div",12),t._uU(21,"Explore a job now!"),t.qZA(),t.TgZ(22,"p"),t._uU(23,"Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide."),t.qZA()(),t.TgZ(24,"div",13)(25,"button",14),t._uU(26,"Apply Now"),t.qZA(),t.TgZ(27,"button",15),t._uU(28,"Learn More"),t.qZA()()(),t.TgZ(29,"div",16),t.O4$(),t.TgZ(30,"svg",17),t._UZ(31,"rect",18)(32,"path",19),t.qZA()(),t.kcU(),t.TgZ(33,"div",20),t.O4$(),t.TgZ(34,"svg",21),t._UZ(35,"path",22),t.qZA()()()()),2&n&&(t.Q6J("ngForOf",l.filterJobData()),t.xp6(2),t.Q6J("ngForOf",l.filterJobData()),t.xp6(1),t.Q6J("ngIf",!l.loading&&l.serverError),t.xp6(1),t.Q6J("ngIf",l.notFound&&0==l.filterJobData().length),t.xp6(1),t.Q6J("ngIf",l.corsError),t.xp6(1),t.Q6J("ngIf",l.forbidden&&0==l.filterJobData().length||l.unexpectedError),t.xp6(9),t.Q6J("ngForOf",t.xi3(16,7,l.filterJobsAds(),2)))},dependencies:[i.sg,i.O5,i.PC,a.rH,d.o,h.o,_.z,j.t,A.D,Z,I.R],styles:['.title-1[_ngcontent-%COMP%]{font-weight:420;color:var(--color-text-100);font-size:18px}.left-side[_ngcontent-%COMP%]{position:sticky;height:-moz-fit-content;height:fit-content;top:80px}.job-details-card[_ngcontent-%COMP%]{background-color:var(--color-surface-200);border-radius:12px;border:1px solid var(--color-surface-mixed-300);box-shadow:0 1px 2px 0 var(--color-box-shadow-100);margin-bottom:20px}.job-details-card[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{border:none;height:.1rem;margin:0;opacity:1;background-color:var(--color-surface-mixed-300)}.job-details-card[_ngcontent-%COMP%]   .job-details-card-top[_ngcontent-%COMP%], .job-details-card[_ngcontent-%COMP%]   .job-details-card-content[_ngcontent-%COMP%]{padding:20px 30px}.job-details-card[_ngcontent-%COMP%]   .job-details-card-top[_ngcontent-%COMP%]{display:flex;align-items:center}.job-details-card[_ngcontent-%COMP%]   .job-details-card-content[_ngcontent-%COMP%]   .job-info-item[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:16px}.job-details-card[_ngcontent-%COMP%]   .job-details-card-content[_ngcontent-%COMP%]   .job-info-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:12px;color:var(--color-text-100);width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;background-color:var(--color-primary-600-opacity-3)}.job-details-card[_ngcontent-%COMP%]   .job-details-card-content[_ngcontent-%COMP%]   .job-info-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:0}.job-details-card[_ngcontent-%COMP%]   .job-details-card-content[_ngcontent-%COMP%]   .job-info-item[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%]{color:var(--color-text-100);font-size:17px}.job-details-card[_ngcontent-%COMP%]   .job-details-card-content[_ngcontent-%COMP%]   .job-info-item[_ngcontent-%COMP%]   .tag-data[_ngcontent-%COMP%]{color:var(--color-primary-200);font-size:14px}.job-details-card[_ngcontent-%COMP%]   .job-details-card-content[_ngcontent-%COMP%]   .job-info-item[_ngcontent-%COMP%]:last-child{margin-bottom:0}.job-description[_ngcontent-%COMP%]{max-width:clamp(320px,90%,1000px);accent-color:var(--color-primary-100);margin-bottom:20px}.job-description[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:0 0 10px;padding:0;list-style:none}.job-description[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:8px 0;position:relative;text-align:left}.job-description[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:before{content:"arrow_right_alt";font-family:Material Icons;color:var(--color-primary-200);margin-right:6px}']})}return o})()}];let G=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#e=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[a.Bz.forChild(X),a.Bz]})}return o})();var H=s(5829),tt=s(8608),et=s(4197);let ot=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#e=this.\u0275mod=t.oAB({type:o});static#o=this.\u0275inj=t.cJS({imports:[i.ez,G,H.D,tt.v,et.N]})}return o})()},6391:(v,m,s)=>{s.d(m,{z:()=>t});var i=s(4650);let t=(()=>{class a{static#t=this.\u0275fac=function(p){return new(p||a)};static#e=this.\u0275cmp=i.Xpm({type:a,selectors:[["app-network-error"]],decls:9,vars:0,consts:[[1,"network-error"],[1,"d-flex","align-items-center","justify-content-center"],[1,"d-flex","flex-column","align-items-center","justify-content-center"],[1,"img-wrapper"],["src","./assets/imgs/shared/network-error.svg","alt","network error"],[1,"caption"],[1,"value"]],template:function(p,g){1&p&&(i.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),i._UZ(4,"img",4),i.qZA(),i.TgZ(5,"div",5),i._uU(6,"Network Error :("),i.qZA(),i.TgZ(7,"div",6),i._uU(8,"0/503"),i.qZA()()()())},styles:[".network-error[_ngcontent-%COMP%]{width:100%;height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;flex-direction:column}.network-error[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{width:200px;height:200px}.network-error[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}.network-error[_ngcontent-%COMP%]   .caption[_ngcontent-%COMP%]{font-size:24px;font-weight:600;color:#333}.network-error[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:48px;font-weight:600;color:#333}"]})}return a})()},927:(v,m,s)=>{s.d(m,{o:()=>t});var i=s(4650);let t=(()=>{class a{static#t=this.\u0275fac=function(p){return new(p||a)};static#e=this.\u0275cmp=i.Xpm({type:a,selectors:[["app-result-not-found"]],decls:9,vars:0,consts:[[1,"result-not-found"],[1,"d-flex","align-items-center","justify-content-center"],[1,"d-flex","flex-column","align-items-center","justify-content-center"],[1,"img-wrapper"],["src","./assets/imgs/shared/result-not-found.svg","alt","result not found"],[1,"caption"],[1,"value"]],template:function(p,g){1&p&&(i.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),i._UZ(4,"img",4),i.qZA(),i.TgZ(5,"div",5),i._uU(6,"Result Not Found :("),i.qZA(),i.TgZ(7,"div",6),i._uU(8,"404"),i.qZA()()()())},styles:[".result-not-found[_ngcontent-%COMP%]{width:100%;height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;flex-direction:column}.result-not-found[_ngcontent-%COMP%]   .caption[_ngcontent-%COMP%]{font-size:32px;font-weight:600;color:var(--color-text-300)}.result-not-found[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%]{font-size:48px;font-weight:600;color:var(--color-text-100)}.result-not-found[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]{width:200px;height:200px}.result-not-found[_ngcontent-%COMP%]   .img-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:100%}"]})}return a})()},8157:(v,m,s)=>{s.d(m,{v:()=>p});var i=s(529),t=s(2340),a=s(1135),y=s(8505),u=s(4650);let p=(()=>{class g{constructor(r){this.http=r,this.baseUrl=t.N.apiUrl,this.jobApplySubject=new a.X(null),this.jobApplySubjectByCompanyId=new a.X(null),this.jobApplySubjectByJobId=new a.X(null),this.jobViewerSubject=new a.X(null),this.jobViewerSubjectByCompanyId=new a.X(null),this.jobViewerSubjectByJobId=new a.X(null),this.jobApply$=this.jobApplySubject.asObservable(),this.jobApplyByCompanyId$=this.jobApplySubjectByCompanyId.asObservable(),this.jobApplyByJobId$=this.jobApplySubjectByJobId.asObservable(),this.jobViewer$=this.jobApplySubject.asObservable(),this.jobViewerByCompanyId$=this.jobApplySubjectByCompanyId.asObservable(),this.jobViewerByJobId$=this.jobApplySubjectByJobId.asObservable(),this.jobApplyCacheInitialized=!1,this.jobApplyByCompanyIdCacheInitialized=!1,this.jobApplyByJobIdCacheInitialized=!1,this.jobViewerCacheInitialized=!1,this.jobViewerByCompanyIdCacheInitialized=!1,this.jobViewerByJobIdCacheInitialized=!1}fetchJobApply(){const r=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.jobApplyCacheInitialized||this.http.get(`${this.baseUrl}/cmp_job-apply/getAll`,{headers:r}).subscribe(d=>{this.jobApplySubject.next(d),this.jobApplyCacheInitialized=!0}),this.jobApply$}fetchJobViewer(){const r=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.jobViewerCacheInitialized||this.http.get(`${this.baseUrl}/cmp_job-apply/getAll`,{headers:r}).subscribe(d=>{this.jobViewerSubject.next(d),this.jobViewerCacheInitialized=!0}),this.jobViewer$}fetchJobApplyByCompanyId(r){const d=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.jobApplyByCompanyIdCacheInitialized||this.http.get(`${this.baseUrl}/cmp_job-apply/getByCompanyId/${r}`,{headers:d}).subscribe(h=>{this.jobApplySubjectByCompanyId.next(h),this.jobApplyByCompanyIdCacheInitialized=!0}),this.jobApplyByCompanyId$}fetchJobViewerByCompanyId(r){const d=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.jobViewerByCompanyIdCacheInitialized||this.http.get(`${this.baseUrl}/cmp_job-apply/getByCompanyId/${r}`,{headers:d}).subscribe(h=>{this.jobViewerSubjectByCompanyId.next(h),this.jobViewerByCompanyIdCacheInitialized=!0}),this.jobViewerByCompanyId$}fetchJobApplyByJobId(r){const d=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.jobApplyByJobIdCacheInitialized||this.http.get(`${this.baseUrl}/cmp_job-apply/getByJobId/${r}`,{headers:d}).subscribe(h=>{this.jobApplySubjectByJobId.next(h),this.jobApplyByJobIdCacheInitialized=!0}),this.jobApplyByJobId$}fetchJobViewerByJobId(r){const d=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.http.get(`${this.baseUrl}/cmp_job-apply/getByJobId/${r}`,{headers:d})}addApplicant(r,d,h){const _=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.http.post(`${this.baseUrl}/cmp_job-apply/addApplicant/${r}/${d}`,h,{headers:_})}addViewer(r,d,h){const _=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.http.post(`${this.baseUrl}/cmp_job-apply/addViewer/${r}/${d}`,h,{headers:_})}updateSingleApplicant(r,d,h){const _=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.http.put(`${this.baseUrl}/cmp_job-apply/updateByJobId/${r}/jobApply/${d}`,h,{headers:_})}deleteSingleApplicant(r,d,h){const _=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.http.delete(`${this.baseUrl}/cmp_job-apply/deleteByJobId/${d}/jobApply/${h}`,{headers:_}).pipe((0,y.b)(()=>{this.clearCacheCompanyId(),this.fetchJobViewerByCompanyId(r)}))}deleteCompleteApply(r){const d=new i.WM({Authorization:"Basic "+btoa("admin:password")});return this.http.delete(`${this.baseUrl}/cmp_job-apply/delete/${r}`,{headers:d}).pipe((0,y.b)(()=>{this.clearCache(),this.fetchJobApply()}))}clearCacheJobId(){this.jobApplyByJobIdCacheInitialized=!1,this.jobApplySubjectByJobId.next(null)}clearCacheCompanyId(){this.jobApplyByCompanyIdCacheInitialized=!1,this.jobApplySubjectByCompanyId.next(null)}clearCache(){this.jobApplyCacheInitialized=!1,this.jobApplySubject.next(null)}clearCacheJobViewerJobId(){this.jobViewerByJobIdCacheInitialized=!1,this.jobViewerSubjectByJobId.next(null)}clearCacheJobViewerCompanyId(){this.jobViewerByCompanyIdCacheInitialized=!1,this.jobViewerSubjectByCompanyId.next(null)}clearCacheJobViewer(){this.jobViewerCacheInitialized=!1,this.jobViewerSubject.next(null)}static#t=this.\u0275fac=function(d){return new(d||g)(u.LFG(i.eN))};static#e=this.\u0275prov=u.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"})}return g})()}}]);