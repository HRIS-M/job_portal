"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[272],{1272:(_,s,c)=>{c.r(s),c.d(s,{ContactModule:()=>f});var m=c(6895),l=c(1779),r=c(7705),t=c(4650);function p(o,h){if(1&o){const e=t.EpF();t.TgZ(0,"map-marker",29,30),t.NdJ("mapClick",function(){const a=t.CHM(e).$implicit,C=t.MAs(1),Z=t.oxw();return t.KtG(Z.openInfo(C,a.info))}),t.qZA()}if(2&o){const e=h.$implicit;t.Q6J("position",e.position)("label",e.label)("title",e.title)("options",e.options)}}const d=[{path:"",component:(()=>{class o{constructor(){this.zoom=12,this.options={mapTypeId:"hybrid",zoomControl:!1,scrollwheel:!1,disableDoubleClickZoom:!0,maxZoom:15,minZoom:8},this.markers=[{position:{lat:6.918604,lng:79.865564},label:{color:"#5faee3",text:"We are here"},title:"SPARKC pvt ltd",info:"Visit our location",options:{animation:google.maps.Animation.BOUNCE}}],this.infoContent=""}ngOnInit(){this.center={lat:6.918604,lng:79.865564}}ngAfterViewInit(){document.querySelectorAll(".material-icons").forEach(n=>{n.setAttribute("translate","no")})}zoomIn(){this.zoom<this.options.maxZoom&&this.zoom++}zoomOut(){this.zoom>this.options.minZoom&&this.zoom--}openInfo(e,n){const i=e;this.infoContent=n,this.info.open(i)}static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275cmp=t.Xpm({type:o,selectors:[["app-contact"]],viewQuery:function(n,i){if(1&n&&(t.Gf(r.b6,5),t.Gf(r.ch,5)),2&n){let a;t.iGM(a=t.CRH())&&(i.map=a.first),t.iGM(a=t.CRH())&&(i.info=a.first)}},decls:75,vars:5,consts:[["height","500px","width","100%",3,"zoom","center","options"],[3,"position","label","title","options","mapClick",4,"ngFor","ngForOf"],[1,"map-btns"],[1,"btn-1",3,"click"],[1,"container"],[1,"d-md-flex","align-items-center","justify-content-between","my-4"],[1,"img-wrapper"],["src","assets/imgs/contact/get-touch.svg","alt","contact"],[1,"contact-form-wrapper"],[1,"form-card-1"],["action",""],[1,"row","form-wrapper"],[1,"col-12"],[1,"form-group"],["for","name"],["type","text","id","name","placeholder","John Doe",1,"form-control"],["for","email"],["type","email","id","email","placeholder","XwVpP@example.com",1,"form-control"],["for","subject"],["type","text","id","subject","placeholder","Your Question",1,"form-control"],["for","comment"],["id","comment","rows","5","placeholder","Your Message",1,"form-control"],["type","submit",1,"btn-1"],[1,"row","mb-3"],[1,"col-12","col-md-4","contact-card"],[1,"icon"],[1,"material-icons"],[1,"title"],[1,"content"],[3,"position","label","title","options","mapClick"],["markerElem",""]],template:function(n,i){1&n&&(t.TgZ(0,"google-map",0),t.YNc(1,p,2,4,"map-marker",1),t.TgZ(2,"map-info-window"),t._uU(3),t.qZA(),t.TgZ(4,"div",2)(5,"button",3),t.NdJ("click",function(){return i.zoomIn()}),t._uU(6,"+"),t.qZA(),t.TgZ(7,"button",3),t.NdJ("click",function(){return i.zoomOut()}),t._uU(8,"-"),t.qZA()()(),t.TgZ(9,"div",4)(10,"div",4)(11,"div",5)(12,"div",6),t._UZ(13,"img",7),t.qZA(),t.TgZ(14,"div",8)(15,"div",9)(16,"h4"),t._uU(17,"Get in touch !"),t.qZA(),t.TgZ(18,"form",10)(19,"div",11)(20,"div",12)(21,"div",13)(22,"label",14),t._uU(23,"Your Name"),t.qZA(),t._UZ(24,"input",15),t.qZA()(),t.TgZ(25,"div",12)(26,"div",13)(27,"label",16),t._uU(28,"Email Address"),t.qZA(),t._UZ(29,"input",17),t.qZA()(),t.TgZ(30,"div",12)(31,"div",13)(32,"label",18),t._uU(33,"Subject"),t.qZA(),t._UZ(34,"input",19),t.qZA()(),t.TgZ(35,"div",12)(36,"div",13)(37,"label",20),t._uU(38,"Comment"),t.qZA(),t._UZ(39,"textarea",21),t.qZA()(),t.TgZ(40,"div",12)(41,"div",13)(42,"button",22),t._uU(43,"Send Message"),t.qZA()()()()()()()(),t.TgZ(44,"div",23)(45,"div",24)(46,"div",25)(47,"i",26),t._uU(48,"phone"),t.qZA()(),t.TgZ(49,"div",27),t._uU(50," Phone "),t.qZA(),t.TgZ(51,"p"),t._uU(52,"The phrasal sequence of the is now so that many campaign and benefit"),t.qZA(),t.TgZ(53,"div",28),t._uU(54,"+152 534-468-854"),t.qZA()(),t.TgZ(55,"div",24)(56,"div",25)(57,"i",26),t._uU(58,"email"),t.qZA()(),t.TgZ(59,"div",27),t._uU(60," Email "),t.qZA(),t.TgZ(61,"p"),t._uU(62,"The phrasal sequence of the is now so that many campaign and benefit"),t.qZA(),t.TgZ(63,"div",28),t._uU(64,"XwVpP@example.com"),t.qZA()(),t.TgZ(65,"div",24)(66,"div",25)(67,"i",26),t._uU(68,"location_on"),t.qZA()(),t.TgZ(69,"div",27),t._uU(70," Location "),t.qZA(),t.TgZ(71,"p"),t._uU(72,"The phrasal sequence of the is now so that many campaign and benefit"),t.qZA(),t.TgZ(73,"div",28),t._uU(74,"San Francisco, CA"),t.qZA()()()()()),2&n&&(t.Q6J("zoom",i.zoom)("center",i.center)("options",i.options),t.xp6(1),t.Q6J("ngForOf",i.markers),t.xp6(2),t.Oqu(i.infoContent))},dependencies:[m.sg,r.b6,r.ch,r.O_],styles:["google-map[_ngcontent-%COMP%]{position:relative}google-map[_ngcontent-%COMP%]   .map-btns[_ngcontent-%COMP%]{position:absolute;display:flex;align-items:center;justify-content:center;bottom:20px;left:20px;z-index:1}google-map[_ngcontent-%COMP%]   .map-btns[_ngcontent-%COMP%]   .btn-1[_ngcontent-%COMP%]{margin-right:8px}.img-wrapper[_ngcontent-%COMP%], .contact-form-wrapper[_ngcontent-%COMP%]{flex:1;min-width:50%;padding:20px}.img-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .contact-form-wrapper[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.contact-card[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;min-height:300px}.contact-card[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{width:60px;height:60px;display:flex;align-items:center;justify-content:center;border-radius:16px;background-color:var(--color-primary-600-opacity-9);margin-bottom:20px;color:var(--color-primary-200);font-size:24px}.contact-card[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:18px;margin-bottom:10px;color:var(--color-text-100)}.contact-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center}.contact-card[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{color:var(--color-primary-200)}"]})}return o})()}];let g=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275mod=t.oAB({type:o});static#n=this.\u0275inj=t.cJS({imports:[l.Bz.forChild(d),l.Bz]})}return o})();var u=c(5829);let f=(()=>{class o{static#t=this.\u0275fac=function(n){return new(n||o)};static#o=this.\u0275mod=t.oAB({type:o});static#n=this.\u0275inj=t.cJS({imports:[m.ez,g,r.Y4,u.D]})}return o})()}}]);