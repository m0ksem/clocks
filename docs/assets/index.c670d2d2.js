import{o as A,a as k,d as V,r as c,b as m,c as h,w as _,e as T,f as u,g as $,h as p,t as w,i as C,v as U,j as D,_ as z,k as M,l as S,F as L,m as q,n as I,p as j,q as J}from"./vendor.7663e798.js";const E=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}};E();const N=(e,o)=>{let a=-1;A(()=>{a=setInterval(e,o)}),k(()=>{clearInterval(a)})},B=e=>{const[o,a]=e.split(":").map(t=>Number(t));return o*60+a},y=(e,o)=>{const a=new Date;return a.setTime(e.getTime()+o*1e3*60),a};var O=(e,o)=>{const a=e.__vccOpts||e;for(const[l,t]of o)a[l]=t;return a};const K=V({props:{modelValue:{type:Boolean,required:!0},offset:{type:Number,required:!0},ampm:{type:Boolean,required:!0}},setup(e){const o=c(new Date),a=c(y(o.value,e.offset));return{urTime:o,cardTime:a,onUrTimeUpdate:()=>{a.value=y(o.value,e.offset)},onCardTimeUpdate:()=>{o.value=y(a.value,-e.offset)},resetTimes:()=>{o.value=new Date,a.value=y(o.value,e.offset)}}}});function F(e,o,a,l,t,s){const r=m("va-time-input"),i=m("va-modal");return T(),h(i,{"model-value":e.modelValue,title:"Time calculator","cancel-text":"","onUpdate:modelValue":o[2]||(o[2]=d=>e.$emit("update:model-value",d)),onBeforeOpen:e.resetTimes},{default:_(()=>[u(r,{label:"Your time",modelValue:e.urTime,"onUpdate:modelValue":[o[0]||(o[0]=d=>e.urTime=d),e.onUrTimeUpdate],class:"mb-2","manual-input":"",ampm:e.ampm},null,8,["modelValue","ampm","onUpdate:modelValue"]),u(r,{label:"Card time",modelValue:e.cardTime,"onUpdate:modelValue":[o[1]||(o[1]=d=>e.cardTime=d),e.onCardTimeUpdate],"manual-input":"",ampm:e.ampm},null,8,["modelValue","ampm","onUpdate:modelValue"])]),_:1},8,["model-value","onBeforeOpen"])}var G=O(K,[["render",F]]);const P=V({components:{CalculateTimeZoneModal:G},props:{name:{type:String,default:"Kyiv"},timezone:{type:Object,required:!0},color:{type:String},ampm:{type:Boolean,default:!1}},setup(e){const o=c(!1),a=new Date().getTimezoneOffset(),l=$(()=>B(e.timezone.utc)+a),t=()=>y(new Date,l.value),s=i=>e.ampm==!0?i.toLocaleTimeString("en-US"):i.toLocaleTimeString("en-GB"),r=c(s(t()));return N(()=>{r.value=s(t())},1e3),{currentTime:r,timeZoneOffset:l,toShowCalculate:o}}}),R={class:"display-2"},Y={class:"d-flex align--center justify--space-between"},H={class:"title"};function W(e,o,a,l,t,s){const r=m("va-divider"),i=m("va-button"),d=m("CalculateTimeZoneModal"),v=m("va-card-content"),n=m("va-hover"),g=m("va-card");return T(),h(g,{color:e.color,gradient:""},{default:_(()=>[u(n,{class:"time-zone-card",stateful:""},{default:_(({hover:b})=>[u(v,null,{default:_(()=>[p("h3",R,w(e.currentTime),1),u(r),p("div",Y,[p("span",null,w(e.name),1),p("p",null,[p("span",H,"Offset "+w(e.timeZoneOffset/60)+"h",1)])]),C(u(i,{class:"time-zone-card__delete-button",icon:"cancel",flat:"",color:"danger",onClick:o[0]||(o[0]=f=>e.$emit("delete"))},null,512),[[U,b]]),C(u(i,{class:"time-zone-card__calculate-button",flat:"",icon:"schedule",onClick:o[1]||(o[1]=f=>e.toShowCalculate=!0)},null,512),[[U,b]]),u(d,{modelValue:e.toShowCalculate,"onUpdate:modelValue":o[2]||(o[2]=f=>e.toShowCalculate=f),offset:e.timeZoneOffset,ampm:e.ampm},null,8,["modelValue","offset","ampm"])]),_:2},1024)]),_:1})]),_:1},8,["color"])}var Q=O(P,[["render",W],["__scopeId","data-v-31344241"]]);const X=V({props:{modelValue:{type:Boolean,required:!0}},setup(e,{emit:o}){const a=c(),l=c({name:"",offset:"",timezone:null}),t=()=>{a.value.validate()&&l.value.timezone&&(o("create",l.value),o("update:modelValue",!1))},s=()=>{o("update:modelValue",!1)},r=()=>{l.value={name:"",offset:"",timezone:null}},i=$(()=>{const d=new Date().getTimezoneOffset();return l.value.offset?z.filter(v=>B(v.utc)+d===Number(l.value.offset)*60):z});return D(()=>l.value.timezone,d=>{!l.value.name&&d&&(l.value.name=d.label)}),{computedTimeZones:i,form:a,formData:l,onOk:t,onCancel:s,onBeforeOpen:r}}});function x(e,o,a,l,t,s){const r=m("va-input"),i=m("va-select"),d=m("va-form"),v=m("va-modal");return T(),h(v,{"model-value":e.modelValue,onOk:e.onOk,onCancel:e.onCancel,onBeforeOpen:e.onBeforeOpen,title:"Add time zone"},{default:_(()=>[u(d,{style:{"max-width":"300px",width:"100vw"},ref:"form"},{default:_(()=>[u(r,{modelValue:e.formData.name,"onUpdate:modelValue":o[0]||(o[0]=n=>e.formData.name=n),label:"Name",class:"mb-4",placeholder:"Kyiv",rules:[n=>n!=null&&n.length>0||"Required"]},null,8,["modelValue","rules"]),u(r,{modelValue:e.formData.offset,"onUpdate:modelValue":o[1]||(o[1]=n=>e.formData.offset=n),label:"filter time zone by offset",class:"mb-2",placeholder:"2",mask:"numeral",rules:[n=>!n||!isNaN(n)||"Should be number",n=>!n||Number(n)<=24&&Number(n)>=-24||"Should in range from -24 to 24"]},null,8,["modelValue","rules"]),u(i,{modelValue:e.formData.timezone,"onUpdate:modelValue":o[2]||(o[2]=n=>e.formData.timezone=n),label:"Time zone","text-by":"label","track-by":"label",options:e.computedTimeZones,searchable:"",rules:[n=>n!=null&&n||"Required"]},null,8,["modelValue","options","rules"])]),_:1},512)]),_:1},8,["model-value","onOk","onCancel","onBeforeOpen"])}var ee=O(X,[["render",x]]);const oe=V({components:{TimeZoneCard:Q,AddTimeZoneModal:ee},setup(){const e=JSON.parse(localStorage.getItem("pref")||"null"),o=c(e||{ampm:!1});D(o,n=>{localStorage.setItem("pref",JSON.stringify(n))},{deep:!0});const a=["#4cc9f0","#ffc6ff","#06d6a0","#4ea8de","#f9c74f","#bdb2ff","#ffc6ff"],l=n=>o.value.ampm==!0?n.toLocaleTimeString("en-US"):n.toLocaleTimeString("en-GB"),t=c(l(new Date));N(()=>{t.value=l(new Date)},1e3);const s=c(!1),r=c([]),i="timezones",d=n=>{r.value.push(n),localStorage.setItem(i,JSON.stringify(r.value))},v=n=>{r.value=r.value.filter(g=>g!==n),localStorage.setItem(i,JSON.stringify(r.value))};return M(()=>{r.value=JSON.parse(localStorage.getItem(i)||"[]")}),{preferences:o,colors:a,currentTime:t,doShowAddModal:s,timeZones:r,createTimeZone:d,deleteTimeZone:v}}}),te={class:"app"},ne={class:"container"},ae={class:"header d-flex justify--space-between align--center",style:{"flex-wrap":"wrap"}},le={class:"display-1"},re={class:"d-flex align--center"},se=I("Add"),me={class:"row",style:{margin:"0 -0.5rem"}};function ue(e,o,a,l,t,s){const r=m("va-switch"),i=m("va-button"),d=m("AddTimeZoneModal"),v=m("va-divider"),n=m("TimeZoneCard"),g=m("va-card-content"),b=m("va-card");return T(),S("div",te,[p("div",ne,[u(b,null,{default:_(()=>[u(g,null,{default:_(()=>[p("div",ae,[p("h1",le,w(e.currentTime),1),p("div",re,[u(r,{modelValue:e.preferences.ampm,"onUpdate:modelValue":o[0]||(o[0]=f=>e.preferences.ampm=f),"true-inner-label":"12h","false-inner-label":"24h"},null,8,["modelValue"]),u(i,{"icon-right":"add",onClick:o[1]||(o[1]=f=>e.doShowAddModal=!0)},{default:_(()=>[se]),_:1}),u(d,{modelValue:e.doShowAddModal,"onUpdate:modelValue":o[2]||(o[2]=f=>e.doShowAddModal=f),onCreate:e.createTimeZone},null,8,["modelValue","onCreate"])])]),u(v),p("div",me,[(T(!0),S(L,null,q(e.timeZones,(f,Z)=>(T(),S("div",{key:f.name,class:"flex lg4 md6 sm12 xs12 pa-2"},[u(n,{name:f.name,offset:f.offset*60,timezone:f.timezone,color:e.colors[Z],ampm:e.preferences.ampm,onDelete:ie=>e.deleteTimeZone(f)},null,8,["name","offset","timezone","color","ampm","onDelete"])]))),128))])]),_:1})]),_:1})])])}var de=O(oe,[["render",ue]]);j(de).use(J).mount("#app");