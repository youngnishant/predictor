import{P as L,l as D,r as S,j as h,a as T,R as j,b as F}from"./vendor.9a311367.js";const b=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&d(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}};b();let f=0,c=1e6;const C=async(e,a)=>{let r=[];e&&L.parse(e,{complete:function(d){d.data.forEach(n=>{r.push(n.slice(2,6))}),r.shift();let t=[];r.map(n=>{s(n[1])>f&&(f=s(n[1])),s(n[2])<c&&(c=s(n[2]))}),r.map(n=>{t.push(E(n))});let o=D.exports.chunk(t,5),i=o.slice(0,20);const g=new S.LSTMTimeStep({inputSize:4,hiddenLayers:[8,8],outputSize:4});g.train(i,{iterations:1e3,learningRate:.03,errorThresh:.01,log:n=>{console.log(n);const v=document.getElementById("logs");let m=document.createElement("li");m.appendChild(document.createTextNode(n)),v.appendChild(m)}});let y=o[21],w=o[22][0];console.log(x(g.run(y)),x(w))}})},E=e=>({open:p(s(e[0])),high:p(s(e[1])),low:p(s(e[2])),close:p(s(e[3]))}),x=e=>({open:u(e.open),high:u(e.high),low:u(e.low),close:u(e.close)}),s=e=>parseFloat(e.replace(",","")),p=e=>(e-c)/(f-c),u=e=>e*(f-c)+c,l=h.exports.jsx,N=h.exports.jsxs,O=h.exports.Fragment;function R(){const[e,a]=T.exports.useState(null);return N(O,{children:[l("div",{className:"App",children:l("input",{type:"file",accept:".csv,.xlsx,.xls",onChange:r=>a(r.target.files[0])})}),l("button",{onClick:()=>C(e),children:"Check"}),l("div",{style:{height:"500px",width:"100%",overflow:"scroll",marginTop:"50px"},children:l("ul",{id:"logs"})})]})}j.render(l(F.StrictMode,{children:l(R,{})}),document.getElementById("root"));