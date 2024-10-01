import{W as C,X as v,Y as x,Z as P,_ as S,e as g,g as M,k as d,l as h}from"./chunk-JAL5QYTD.js";import{Fb as i,La as s,Nb as p,Z as a,ga as u,ha as c,lb as n,mb as o,tb as l,uc as f}from"./chunk-RIFD72XT.js";var y=(()=>{class t{constructor(r,e,m){this.userService=r,this.router=e,this.route=m,this.user=this.userService.getCurrentUser()}subscribe(){this.userService.updateUserSubscription(this.user.email,!0)&&this.router.navigate(["../pokemon"],{relativeTo:this.route})}static{this.\u0275fac=function(e){return new(e||t)(s(h),s(M),s(g))}}static{this.\u0275cmp=u({type:t,selectors:[["app-info"]],standalone:!0,features:[p],decls:19,vars:0,consts:[[1,"info-card"],["mat-raised-button","","color","primary",3,"click"]],template:function(e,m){e&1&&(n(0,"mat-card",0)(1,"mat-card-header")(2,"mat-card-title"),i(3," Upgrade Your Plan "),o()(),n(4,"mat-card-content")(5,"p"),i(6," You're currently on a basic plan, which limits access to some features of the Pokemon app. To access the full range of features, including viewing detailed Pokemon stats, favorite Pokemon functionality, and more, we recommend upgrading to our premium plan. "),o(),n(7,"div"),i(8," As a premium user, you'll unlock: "),n(9,"ul")(10,"li"),i(11,"Detailed Pokemon stats and abilities"),o(),n(12,"li"),i(13,"Ability to mark and filter favorite Pokemon"),o(),n(14,"li"),i(15,"Access to premium support and updates"),o()()()(),n(16,"mat-card-actions")(17,"button",1),l("click",function(){return m.subscribe()}),i(18," Subscribe Now "),o()()())},dependencies:[C,P,S,v,x],styles:[".info-card[_ngcontent-%COMP%]{max-width:600px;margin:50px auto;padding:20px}.info-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;color:#333}.info-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{padding-left:20px}.info-card[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%]{text-align:center;margin-top:20px}.info-card[_ngcontent-%COMP%]   mat-card-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%}"]})}}return t})();var I=[{path:"",component:y}],_=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=c({type:t})}static{this.\u0275inj=a({imports:[d.forChild(I),d]})}}return t})();var U=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275mod=c({type:t})}static{this.\u0275inj=a({imports:[f,_]})}}return t})();export{U as InfoModule};
