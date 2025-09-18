(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dn=globalThis,zl=Dn.ShadowRoot&&(Dn.ShadyCSS===void 0||Dn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ql=Symbol(),vd=new WeakMap;let Mc=class{constructor(e,s,i){if(this._$cssResult$=!0,i!==ql)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(zl&&e===void 0){const i=s!==void 0&&s.length===1;i&&(e=vd.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&vd.set(s,e))}return e}toString(){return this.cssText}};const dh=t=>new Mc(typeof t=="string"?t:t+"",void 0,ql),A=(t,...e)=>{const s=t.length===1?t[0]:e.reduce(((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1]),t[0]);return new Mc(s,t,ql)},ch=(t,e)=>{if(zl)t.adoptedStyleSheets=e.map((s=>s instanceof CSSStyleSheet?s:s.styleSheet));else for(const s of e){const i=document.createElement("style"),n=Dn.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)}},_d=zl?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return dh(s)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:uh,defineProperty:hh,getOwnPropertyDescriptor:ph,getOwnPropertyNames:fh,getOwnPropertySymbols:gh,getPrototypeOf:vh}=Object,Fe=globalThis,yd=Fe.trustedTypes,_h=yd?yd.emptyScript:"",Sr=Fe.reactiveElementPolyfillSupport,Li=(t,e)=>t,Mn={toAttribute(t,e){switch(e){case Boolean:t=t?_h:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Wl=(t,e)=>!uh(t,e),md={attribute:!0,type:String,converter:Mn,reflect:!1,useDefault:!1,hasChanged:Wl};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Fe.litPropertyMetadata??(Fe.litPropertyMetadata=new WeakMap);let Ds=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=md){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(e,s),!s.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(e,i,s);n!==void 0&&hh(this.prototype,e,n)}}static getPropertyDescriptor(e,s,i){const{get:n,set:r}=ph(this.prototype,e)??{get(){return this[s]},set(o){this[s]=o}};return{get:n,set(o){const a=n==null?void 0:n.call(this);r==null||r.call(this,o),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??md}static _$Ei(){if(this.hasOwnProperty(Li("elementProperties")))return;const e=vh(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Li("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Li("properties"))){const s=this.properties,i=[...fh(s),...gh(s)];for(const n of i)this.createProperty(n,s[n])}const e=this[Symbol.metadata];if(e!==null){const s=litPropertyMetadata.get(e);if(s!==void 0)for(const[i,n]of s)this.elementProperties.set(i,n)}this._$Eh=new Map;for(const[s,i]of this.elementProperties){const n=this._$Eu(s,i);n!==void 0&&this._$Eh.set(n,s)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)s.unshift(_d(n))}else e!==void 0&&s.push(_d(e));return s}static _$Eu(e,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise((s=>this.enableUpdating=s)),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach((s=>s(this)))}addController(e){var s;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)==null||s.call(e))}removeController(e){var s;(s=this._$EO)==null||s.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ch(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach((s=>{var i;return(i=s.hostConnected)==null?void 0:i.call(s)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach((s=>{var i;return(i=s.hostDisconnected)==null?void 0:i.call(s)}))}attributeChangedCallback(e,s,i){this._$AK(e,i)}_$ET(e,s){var r;const i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){const o=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:Mn).toAttribute(s,i.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,s){var r,o;const i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){const a=i.getPropertyOptions(n),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((r=a.converter)==null?void 0:r.fromAttribute)!==void 0?a.converter:Mn;this._$Em=n;const h=l.fromAttribute(s,a.type);this[n]=h??((o=this._$Ej)==null?void 0:o.get(n))??h,this._$Em=null}}requestUpdate(e,s,i){var n;if(e!==void 0){const r=this.constructor,o=this[e];if(i??(i=r.getPropertyOptions(e)),!((i.hasChanged??Wl)(o,s)||i.useDefault&&i.reflect&&o===((n=this._$Ej)==null?void 0:n.get(e))&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,s,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,s,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??s??this[e]),r!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(s=void 0),this._$AL.set(e,s)),n===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[r,o]of n){const{wrapped:a}=o,l=this[r];a!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(i=this._$EO)==null||i.forEach((n=>{var r;return(r=n.hostUpdate)==null?void 0:r.call(n)})),this.update(s)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(s)}willUpdate(e){}_$AE(e){var s;(s=this._$EO)==null||s.forEach((i=>{var n;return(n=i.hostUpdated)==null?void 0:n.call(i)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach((s=>this._$ET(s,this[s])))),this._$EM()}updated(e){}firstUpdated(e){}};Ds.elementStyles=[],Ds.shadowRootOptions={mode:"open"},Ds[Li("elementProperties")]=new Map,Ds[Li("finalized")]=new Map,Sr==null||Sr({ReactiveElement:Ds}),(Fe.reactiveElementVersions??(Fe.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Di=globalThis,jn=Di.trustedTypes,bd=jn?jn.createPolicy("lit-html",{createHTML:t=>t}):void 0,jc="$lit$",Le=`lit$${Math.random().toFixed(9).slice(2)}$`,Fc="?"+Le,yh=`<${Fc}>`,vs=document,Mi=()=>vs.createComment(""),ji=t=>t===null||typeof t!="object"&&typeof t!="function",Kl=Array.isArray,mh=t=>Kl(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Cr=`[ 	
\f\r]`,$i=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ed=/-->/g,Td=/>/g,is=RegExp(`>|${Cr}(?:([^\\s"'>=/]+)(${Cr}*=${Cr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Sd=/'/g,Cd=/"/g,Vc=/^(?:script|style|textarea|title)$/i,bh=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),c=bh(1),Ge=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),Ad=new WeakMap,fs=vs.createTreeWalker(vs,129);function Bc(t,e){if(!Kl(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return bd!==void 0?bd.createHTML(e):e}const Eh=(t,e)=>{const s=t.length-1,i=[];let n,r=e===2?"<svg>":e===3?"<math>":"",o=$i;for(let a=0;a<s;a++){const l=t[a];let h,g,v=-1,b=0;for(;b<l.length&&(o.lastIndex=b,g=o.exec(l),g!==null);)b=o.lastIndex,o===$i?g[1]==="!--"?o=Ed:g[1]!==void 0?o=Td:g[2]!==void 0?(Vc.test(g[2])&&(n=RegExp("</"+g[2],"g")),o=is):g[3]!==void 0&&(o=is):o===is?g[0]===">"?(o=n??$i,v=-1):g[1]===void 0?v=-2:(v=o.lastIndex-g[2].length,h=g[1],o=g[3]===void 0?is:g[3]==='"'?Cd:Sd):o===Cd||o===Sd?o=is:o===Ed||o===Td?o=$i:(o=is,n=void 0);const x=o===is&&t[a+1].startsWith("/>")?" ":"";r+=o===$i?l+yh:v>=0?(i.push(h),l.slice(0,v)+jc+l.slice(v)+Le+x):l+Le+(v===-2?a:x)}return[Bc(t,r+(t[s]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class Fi{constructor({strings:e,_$litType$:s},i){let n;this.parts=[];let r=0,o=0;const a=e.length-1,l=this.parts,[h,g]=Eh(e,s);if(this.el=Fi.createElement(h,i),fs.currentNode=this.el.content,s===2||s===3){const v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(n=fs.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(const v of n.getAttributeNames())if(v.endsWith(jc)){const b=g[o++],x=n.getAttribute(v).split(Le),F=/([.?@])?(.*)/.exec(b);l.push({type:1,index:r,name:F[2],strings:x,ctor:F[1]==="."?Sh:F[1]==="?"?Ch:F[1]==="@"?Ah:tr}),n.removeAttribute(v)}else v.startsWith(Le)&&(l.push({type:6,index:r}),n.removeAttribute(v));if(Vc.test(n.tagName)){const v=n.textContent.split(Le),b=v.length-1;if(b>0){n.textContent=jn?jn.emptyScript:"";for(let x=0;x<b;x++)n.append(v[x],Mi()),fs.nextNode(),l.push({type:2,index:++r});n.append(v[b],Mi())}}}else if(n.nodeType===8)if(n.data===Fc)l.push({type:2,index:r});else{let v=-1;for(;(v=n.data.indexOf(Le,v+1))!==-1;)l.push({type:7,index:r}),v+=Le.length-1}r++}}static createElement(e,s){const i=vs.createElement("template");return i.innerHTML=e,i}}function ii(t,e,s=t,i){var o,a;if(e===Ge)return e;let n=i!==void 0?(o=s._$Co)==null?void 0:o[i]:s._$Cl;const r=ji(e)?void 0:e._$litDirective$;return(n==null?void 0:n.constructor)!==r&&((a=n==null?void 0:n._$AO)==null||a.call(n,!1),r===void 0?n=void 0:(n=new r(t),n._$AT(t,s,i)),i!==void 0?(s._$Co??(s._$Co=[]))[i]=n:s._$Cl=n),n!==void 0&&(e=ii(t,n._$AS(t,e.values),n,i)),e}let Th=class{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:i}=this._$AD,n=((e==null?void 0:e.creationScope)??vs).importNode(s,!0);fs.currentNode=n;let r=fs.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new yi(r,r.nextSibling,this,e):l.type===1?h=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(h=new $h(r,this,e)),this._$AV.push(h),l=i[++a]}o!==(l==null?void 0:l.index)&&(r=fs.nextNode(),o++)}return fs.currentNode=vs,n}p(e){let s=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,s),s+=i.strings.length-2):i._$AI(e[s])),s++}};class yi{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,s,i,n){this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=n,this._$Cv=(n==null?void 0:n.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=ii(this,e,s),ji(e)?e===S||e==null||e===""?(this._$AH!==S&&this._$AR(),this._$AH=S):e!==this._$AH&&e!==Ge&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):mh(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==S&&ji(this._$AH)?this._$AA.nextSibling.data=e:this.T(vs.createTextNode(e)),this._$AH=e}$(e){var r;const{values:s,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Fi.createElement(Bc(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===n)this._$AH.p(s);else{const o=new Th(n,this),a=o.u(this.options);o.p(s),this.T(a),this._$AH=o}}_$AC(e){let s=Ad.get(e.strings);return s===void 0&&Ad.set(e.strings,s=new Fi(e)),s}k(e){Kl(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,n=0;for(const r of e)n===s.length?s.push(i=new yi(this.O(Mi()),this.O(Mi()),this,this.options)):i=s[n],i._$AI(r),n++;n<s.length&&(this._$AR(i&&i._$AB.nextSibling,n),s.length=n)}_$AR(e=this._$AA.nextSibling,s){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,s);e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var s;this._$AM===void 0&&(this._$Cv=e,(s=this._$AP)==null||s.call(this,e))}}class tr{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,i,n,r){this.type=1,this._$AH=S,this._$AN=void 0,this.element=e,this.name=s,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}_$AI(e,s=this,i,n){const r=this.strings;let o=!1;if(r===void 0)e=ii(this,e,s,0),o=!ji(e)||e!==this._$AH&&e!==Ge,o&&(this._$AH=e);else{const a=e;let l,h;for(e=r[0],l=0;l<r.length-1;l++)h=ii(this,a[i+l],s,l),h===Ge&&(h=this._$AH[l]),o||(o=!ji(h)||h!==this._$AH[l]),h===S?e=S:e!==S&&(e+=(h??"")+r[l+1]),this._$AH[l]=h}o&&!n&&this.j(e)}j(e){e===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Sh extends tr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===S?void 0:e}}class Ch extends tr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==S)}}class Ah extends tr{constructor(e,s,i,n,r){super(e,s,i,n,r),this.type=5}_$AI(e,s=this){if((e=ii(this,e,s,0)??S)===Ge)return;const i=this._$AH,n=e===S&&i!==S||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==S&&(i===S||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var s;typeof this._$AH=="function"?this._$AH.call(((s=this.options)==null?void 0:s.host)??this.element,e):this._$AH.handleEvent(e)}}class $h{constructor(e,s,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ii(this,e)}}const Oh={I:yi},Ar=Di.litHtmlPolyfillSupport;Ar==null||Ar(Fi,yi),(Di.litHtmlVersions??(Di.litHtmlVersions=[])).push("3.3.1");const Ih=(t,e,s)=>{const i=(s==null?void 0:s.renderBefore)??e;let n=i._$litPart$;if(n===void 0){const r=(s==null?void 0:s.renderBefore)??null;i._$litPart$=n=new yi(e.insertBefore(Mi(),r),r,void 0,s??{})}return n._$AI(t),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gs=globalThis;let O=class extends Ds{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var s;const e=super.createRenderRoot();return(s=this.renderOptions).renderBefore??(s.renderBefore=e.firstChild),e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ih(s,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Ge}};var Uc;O._$litElement$=!0,O.finalized=!0,(Uc=gs.litElementHydrateSupport)==null||Uc.call(gs,{LitElement:O});const $r=gs.litElementPolyfillSupport;$r==null||$r({LitElement:O});(gs.litElementVersions??(gs.litElementVersions=[])).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=t=>(e,s)=>{s!==void 0?s.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wh={attribute:!0,type:String,converter:Mn,reflect:!1,hasChanged:Wl},xh=(t=wh,e,s)=>{const{kind:i,metadata:n}=s;let r=globalThis.litPropertyMetadata.get(n);if(r===void 0&&globalThis.litPropertyMetadata.set(n,r=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),i==="accessor"){const{name:o}=s;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,t)},init(a){return a!==void 0&&this.C(o,void 0,t,a),a}}}if(i==="setter"){const{name:o}=s;return function(a){const l=this[o];e.call(this,a),this.requestUpdate(o,l,t)}}throw Error("Unsupported decorator location: "+i)};function u(t){return(e,s)=>typeof s=="object"?xh(t,e,s):((i,n,r)=>{const o=n.hasOwnProperty(r);return n.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(n,r):void 0})(t,e,s)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function d(t){return u({...t,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ph=(t,e,s)=>(s.configurable=!0,s.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,s),s);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(t,e){return(s,i,n)=>{const r=o=>{var a;return((a=o.renderRoot)==null?void 0:a.querySelector(t))??null};return Ph(s,i,{get(){return r(this)}})}}const Ns=Symbol("LitMobxRenderReaction"),$d=Symbol("LitMobxRequestUpdate");function Nh(t,e){var s,i;return i=class extends t{constructor(){super(...arguments),this[s]=()=>{this.requestUpdate()}}connectedCallback(){super.connectedCallback();const r=this.constructor.name||this.nodeName;this[Ns]=new e(`${r}.update()`,this[$d]),this.hasUpdated&&this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this[Ns]&&(this[Ns].dispose(),this[Ns]=void 0)}update(r){this[Ns]?this[Ns].track(super.update.bind(this,r)):super.update(r)}},s=$d,i}function N(t){for(var e=arguments.length,s=new Array(e>1?e-1:0),i=1;i<e;i++)s[i-1]=arguments[i];throw new Error(typeof t=="number"?"[MobX] minified error nr: "+t+(s.length?" "+s.map(String).join(","):"")+". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts":"[MobX] "+t)}var Lh={};function Gc(){return typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:Lh}var Hc=Object.assign,Fn=Object.getOwnPropertyDescriptor,ae=Object.defineProperty,rn=Object.prototype,Xr=[];Object.freeze(Xr);var Xc={};Object.freeze(Xc);var Dh=typeof Proxy<"u",Rh=Object.toString();function kc(){Dh||N("Proxy not available")}function Yc(t){var e=!1;return function(){if(!e)return e=!0,t.apply(this,arguments)}}var Us=function(){};function Qt(t){return typeof t=="function"}function _s(t){var e=typeof t;switch(e){case"string":case"symbol":case"number":return!0}return!1}function er(t){return t!==null&&typeof t=="object"}function He(t){if(!er(t))return!1;var e=Object.getPrototypeOf(t);if(e==null)return!0;var s=Object.hasOwnProperty.call(e,"constructor")&&e.constructor;return typeof s=="function"&&s.toString()===Rh}function zc(t){var e=t==null?void 0:t.constructor;return e?e.name==="GeneratorFunction"||e.displayName==="GeneratorFunction":!1}function sr(t,e,s){ae(t,e,{enumerable:!1,writable:!0,configurable:!0,value:s})}function qc(t,e,s){ae(t,e,{enumerable:!1,writable:!1,configurable:!0,value:s})}function qe(t,e){var s="isMobX"+t;return e.prototype[s]=!0,function(i){return er(i)&&i[s]===!0}}function mi(t){return t!=null&&Object.prototype.toString.call(t)==="[object Map]"}function Uh(t){var e=Object.getPrototypeOf(t),s=Object.getPrototypeOf(e),i=Object.getPrototypeOf(s);return i===null}function on(t){return t!=null&&Object.prototype.toString.call(t)==="[object Set]"}var Wc=typeof Object.getOwnPropertySymbols<"u";function Mh(t){var e=Object.keys(t);if(!Wc)return e;var s=Object.getOwnPropertySymbols(t);return s.length?[].concat(e,s.filter(function(i){return rn.propertyIsEnumerable.call(t,i)})):e}var ir=typeof Reflect<"u"&&Reflect.ownKeys?Reflect.ownKeys:Wc?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:Object.getOwnPropertyNames;function Kc(t){return t===null?null:typeof t=="object"?""+t:t}function Te(t,e){return rn.hasOwnProperty.call(t,e)}var jh=Object.getOwnPropertyDescriptors||function(e){var s={};return ir(e).forEach(function(i){s[i]=Fn(e,i)}),s};function Fh(t,e){for(var s=0;s<e.length;s++){var i=e[s];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,Gh(i.key),i)}}function nr(t,e,s){return e&&Fh(t.prototype,e),Object.defineProperty(t,"prototype",{writable:!1}),t}function ys(){return ys=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t},ys.apply(this,arguments)}function Jc(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,kr(t,e)}function kr(t,e){return kr=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,n){return i.__proto__=n,i},kr(t,e)}function Or(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Vh(t,e){if(t){if(typeof t=="string")return Od(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);if(s==="Object"&&t.constructor&&(s=t.constructor.name),s==="Map"||s==="Set")return Array.from(t);if(s==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return Od(t,e)}}function Od(t,e){(e==null||e>t.length)&&(e=t.length);for(var s=0,i=new Array(e);s<e;s++)i[s]=t[s];return i}function Ms(t,e){var s=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(s)return(s=s.call(t)).next.bind(s);if(Array.isArray(t)||(s=Vh(t))||e){s&&(t=s);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Bh(t,e){if(typeof t!="object"||t===null)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var i=s.call(t,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}function Gh(t){var e=Bh(t,"string");return typeof e=="symbol"?e:String(e)}var oe=Symbol("mobx-stored-annotations");function le(t){function e(s,i){if(an(i))return t.decorate_20223_(s,i);bi(s,i,t)}return Object.assign(e,t)}function bi(t,e,s){Te(t,oe)||sr(t,oe,ys({},t[oe])),Wh(s)||(t[oe][e]=s)}function Hh(t){return Te(t,oe)||sr(t,oe,ys({},t[oe])),t[oe]}function an(t){return typeof t=="object"&&typeof t.kind=="string"}var C=Symbol("mobx administration"),ln=(function(){function t(s){s===void 0&&(s="Atom"),this.name_=void 0,this.isPendingUnobservation=!1,this.isBeingObserved=!1,this.observers_=new Set,this.diffValue_=0,this.lastAccessedBy_=0,this.lowestObserverState_=L.NOT_TRACKING_,this.onBOL=void 0,this.onBUOL=void 0,this.name_=s}var e=t.prototype;return e.onBO=function(){this.onBOL&&this.onBOL.forEach(function(i){return i()})},e.onBUO=function(){this.onBUOL&&this.onBUOL.forEach(function(i){return i()})},e.reportObserved=function(){return fu(this)},e.reportChanged=function(){Vt(),gu(this),Bt()},e.toString=function(){return this.name_},t})(),Jl=qe("Atom",ln);function Zc(t,e,s){e===void 0&&(e=Us),s===void 0&&(s=Us);var i=new ln(t);return e!==Us&&Qp(i,e),s!==Us&&bu(i,s),i}function Xh(t,e){return Du(t,e)}function kh(t,e){return Object.is?Object.is(t,e):t===e?t!==0||1/t===1/e:t!==t&&e!==e}var Vn={structural:Xh,default:kh};function ms(t,e,s){return sd(t)?t:Array.isArray(t)?I.array(t,{name:s}):He(t)?I.object(t,void 0,{name:s}):mi(t)?I.map(t,{name:s}):on(t)?I.set(t,{name:s}):typeof t=="function"&&!lr(t)&&!Bi(t)?zc(t)?ni(t):Vi(s,t):t}function Yh(t,e,s){if(t==null||fn(t)||pn(t)||We(t)||$s(t))return t;if(Array.isArray(t))return I.array(t,{name:s,deep:!1});if(He(t))return I.object(t,void 0,{name:s,deep:!1});if(mi(t))return I.map(t,{name:s,deep:!1});if(on(t))return I.set(t,{name:s,deep:!1})}function rr(t){return t}function zh(t,e){return Du(t,e)?e:t}var qh="override";function Wh(t){return t.annotationType_===qh}function dn(t,e){return{annotationType_:t,options_:e,make_:Kh,extend_:Jh,decorate_20223_:Zh}}function Kh(t,e,s,i){var n;if((n=this.options_)!=null&&n.bound)return this.extend_(t,e,s,!1)===null?0:1;if(i===t.target_)return this.extend_(t,e,s,!1)===null?0:2;if(lr(s.value))return 1;var r=Qc(t,this,e,s,!1);return ae(i,e,r),2}function Jh(t,e,s,i){var n=Qc(t,this,e,s);return t.defineProperty_(e,n,i)}function Zh(t,e){var s=e.kind,i=e.name,n=e.addInitializer,r=this,o=function(h){var g,v,b,x;return bs((g=(v=r.options_)==null?void 0:v.name)!=null?g:i.toString(),h,(b=(x=r.options_)==null?void 0:x.autoAction)!=null?b:!1)};if(s=="field"){n(function(){bi(this,i,r)});return}if(s=="method"){var a;return lr(t)||(t=o(t)),(a=this.options_)!=null&&a.bound&&n(function(){var l=this,h=l[i].bind(l);h.isMobxAction=!0,l[i]=h}),t}N("Cannot apply '"+r.annotationType_+"' to '"+String(i)+"' (kind: "+s+"):"+(`
'`+r.annotationType_+"' can only be used on properties with a function value."))}function Qh(t,e,s,i){e.annotationType_,i.value}function Qc(t,e,s,i,n){var r,o,a,l,h,g,v;n===void 0&&(n=_.safeDescriptors),Qh(t,e,s,i);var b=i.value;if((r=e.options_)!=null&&r.bound){var x;b=b.bind((x=t.proxy_)!=null?x:t.target_)}return{value:bs((o=(a=e.options_)==null?void 0:a.name)!=null?o:s.toString(),b,(l=(h=e.options_)==null?void 0:h.autoAction)!=null?l:!1,(g=e.options_)!=null&&g.bound?(v=t.proxy_)!=null?v:t.target_:void 0),configurable:n?t.isPlainObject_:!0,enumerable:!1,writable:!n}}function tu(t,e){return{annotationType_:t,options_:e,make_:tp,extend_:ep,decorate_20223_:sp}}function tp(t,e,s,i){var n;if(i===t.target_)return this.extend_(t,e,s,!1)===null?0:2;if((n=this.options_)!=null&&n.bound&&(!Te(t.target_,e)||!Bi(t.target_[e]))&&this.extend_(t,e,s,!1)===null)return 0;if(Bi(s.value))return 1;var r=eu(t,this,e,s,!1,!1);return ae(i,e,r),2}function ep(t,e,s,i){var n,r=eu(t,this,e,s,(n=this.options_)==null?void 0:n.bound);return t.defineProperty_(e,r,i)}function sp(t,e){var s,i=e.name,n=e.addInitializer;return Bi(t)||(t=ni(t)),(s=this.options_)!=null&&s.bound&&n(function(){var r=this,o=r[i].bind(r);o.isMobXFlow=!0,r[i]=o}),t}function ip(t,e,s,i){e.annotationType_,i.value}function eu(t,e,s,i,n,r){r===void 0&&(r=_.safeDescriptors),ip(t,e,s,i);var o=i.value;if(Bi(o)||(o=ni(o)),n){var a;o=o.bind((a=t.proxy_)!=null?a:t.target_),o.isMobXFlow=!0}return{value:o,configurable:r?t.isPlainObject_:!0,enumerable:!1,writable:!r}}function Zl(t,e){return{annotationType_:t,options_:e,make_:np,extend_:rp,decorate_20223_:op}}function np(t,e,s){return this.extend_(t,e,s,!1)===null?0:1}function rp(t,e,s,i){return ap(t,this,e,s),t.defineComputedProperty_(e,ys({},this.options_,{get:s.get,set:s.set}),i)}function op(t,e){var s=this,i=e.name,n=e.addInitializer;return n(function(){var r=Ei(this)[C],o=ys({},s.options_,{get:t,context:this});o.name||(o.name="ObservableObject."+i.toString()),r.values_.set(i,new he(o))}),function(){return this[C].getObservablePropValue_(i)}}function ap(t,e,s,i){e.annotationType_,i.get}function or(t,e){return{annotationType_:t,options_:e,make_:lp,extend_:dp,decorate_20223_:cp}}function lp(t,e,s){return this.extend_(t,e,s,!1)===null?0:1}function dp(t,e,s,i){var n,r;return up(t,this),t.defineObservableProperty_(e,s.value,(n=(r=this.options_)==null?void 0:r.enhancer)!=null?n:ms,i)}function cp(t,e){var s=this,i=e.kind,n=e.name,r=new WeakSet;function o(a,l){var h,g,v=Ei(a)[C],b=new Ve(l,(h=(g=s.options_)==null?void 0:g.enhancer)!=null?h:ms,"ObservableObject."+n.toString(),!1);v.values_.set(n,b),r.add(a)}if(i=="accessor")return{get:function(){return r.has(this)||o(this,t.get.call(this)),this[C].getObservablePropValue_(n)},set:function(l){return r.has(this)||o(this,l),this[C].setObservablePropValue_(n,l)},init:function(l){return r.has(this)||o(this,l),l}}}function up(t,e,s,i){e.annotationType_}var hp="true",pp=su();function su(t){return{annotationType_:hp,options_:t,make_:fp,extend_:gp,decorate_20223_:vp}}function fp(t,e,s,i){var n,r;if(s.get)return ar.make_(t,e,s,i);if(s.set){var o=bs(e.toString(),s.set);return i===t.target_?t.defineProperty_(e,{configurable:_.safeDescriptors?t.isPlainObject_:!0,set:o})===null?0:2:(ae(i,e,{configurable:!0,set:o}),2)}if(i!==t.target_&&typeof s.value=="function"){var a;if(zc(s.value)){var l,h=(l=this.options_)!=null&&l.autoBind?ni.bound:ni;return h.make_(t,e,s,i)}var g=(a=this.options_)!=null&&a.autoBind?Vi.bound:Vi;return g.make_(t,e,s,i)}var v=((n=this.options_)==null?void 0:n.deep)===!1?I.ref:I;if(typeof s.value=="function"&&(r=this.options_)!=null&&r.autoBind){var b;s.value=s.value.bind((b=t.proxy_)!=null?b:t.target_)}return v.make_(t,e,s,i)}function gp(t,e,s,i){var n,r;if(s.get)return ar.extend_(t,e,s,i);if(s.set)return t.defineProperty_(e,{configurable:_.safeDescriptors?t.isPlainObject_:!0,set:bs(e.toString(),s.set)},i);if(typeof s.value=="function"&&(n=this.options_)!=null&&n.autoBind){var o;s.value=s.value.bind((o=t.proxy_)!=null?o:t.target_)}var a=((r=this.options_)==null?void 0:r.deep)===!1?I.ref:I;return a.extend_(t,e,s,i)}function vp(t,e){N("'"+this.annotationType_+"' cannot be used as a decorator")}var _p="observable",yp="observable.ref",mp="observable.shallow",bp="observable.struct",iu={deep:!0,name:void 0,defaultDecorator:void 0,proxy:!0};Object.freeze(iu);function En(t){return t||iu}var Yr=or(_p),Ep=or(yp,{enhancer:rr}),Tp=or(mp,{enhancer:Yh}),Sp=or(bp,{enhancer:zh}),nu=le(Yr);function Tn(t){return t.deep===!0?ms:t.deep===!1?rr:Ap(t.defaultDecorator)}function Cp(t){var e;return t?(e=t.defaultDecorator)!=null?e:su(t):void 0}function Ap(t){var e,s;return t&&(e=(s=t.options_)==null?void 0:s.enhancer)!=null?e:ms}function ru(t,e,s){if(an(e))return Yr.decorate_20223_(t,e);if(_s(e)){bi(t,e,Yr);return}return sd(t)?t:He(t)?I.object(t,e,s):Array.isArray(t)?I.array(t,e):mi(t)?I.map(t,e):on(t)?I.set(t,e):typeof t=="object"&&t!==null?t:I.box(t,e)}Hc(ru,nu);var $p={box:function(e,s){var i=En(s);return new Ve(e,Tn(i),i.name,!0,i.equals)},array:function(e,s){var i=En(s);return(_.useProxies===!1||i.proxy===!1?Tf:hf)(e,Tn(i),i.name)},map:function(e,s){var i=En(s);return new $u(e,Tn(i),i.name)},set:function(e,s){var i=En(s);return new wu(e,Tn(i),i.name)},object:function(e,s,i){return Os(function(){return tf(_.useProxies===!1||(i==null?void 0:i.proxy)===!1?Ei({},i):lf({},i),e,s)})},ref:le(Ep),shallow:le(Tp),deep:nu,struct:le(Sp)},I=Hc(ru,$p),ou="computed",Op="computed.struct",zr=Zl(ou),Ip=Zl(Op,{equals:Vn.structural}),ar=function(e,s){if(an(s))return zr.decorate_20223_(e,s);if(_s(s))return bi(e,s,zr);if(He(e))return le(Zl(ou,e));var i=He(s)?s:{};return i.get=e,i.name||(i.name=e.name||""),new he(i)};Object.assign(ar,zr);ar.struct=le(Ip);var Id,wd,Bn=0,wp=1,xp=(Id=(wd=Fn(function(){},"name"))==null?void 0:wd.configurable)!=null?Id:!1,xd={value:"action",configurable:!0,writable:!1,enumerable:!1};function bs(t,e,s,i){s===void 0&&(s=!1);function n(){return Pp(t,s,e,i||this,arguments)}return n.isMobxAction=!0,n.toString=function(){return e.toString()},xp&&(xd.value=t,ae(n,"name",xd)),n}function Pp(t,e,s,i,n){var r=Np(t,e);try{return s.apply(i,n)}catch(o){throw r.error_=o,o}finally{Lp(r)}}function Np(t,e,s,i){var n=!1,r=0,o=_.trackingDerivation,a=!e||!o;Vt();var l=_.allowStateChanges;a&&(As(),l=Ql(!0));var h=ed(!0),g={runAsAction_:a,prevDerivation_:o,prevAllowStateChanges_:l,prevAllowStateReads_:h,notifySpy_:n,startTime_:r,actionId_:wp++,parentActionId_:Bn};return Bn=g.actionId_,g}function Lp(t){Bn!==t.actionId_&&N(30),Bn=t.parentActionId_,t.error_!==void 0&&(_.suppressReactionErrors=!0),td(t.prevAllowStateChanges_),Ri(t.prevAllowStateReads_),Bt(),t.runAsAction_&&Se(t.prevDerivation_),_.suppressReactionErrors=!1}function Ql(t){var e=_.allowStateChanges;return _.allowStateChanges=t,e}function td(t){_.allowStateChanges=t}var au;au=Symbol.toPrimitive;var Ve=(function(t){Jc(e,t);function e(i,n,r,o,a){var l;return r===void 0&&(r="ObservableValue"),a===void 0&&(a=Vn.default),l=t.call(this,r)||this,l.enhancer=void 0,l.name_=void 0,l.equals=void 0,l.hasUnreportedChange_=!1,l.interceptors_=void 0,l.changeListeners_=void 0,l.value_=void 0,l.dehancer=void 0,l.enhancer=n,l.name_=r,l.equals=a,l.value_=n(i,void 0,r),l}var s=e.prototype;return s.dehanceValue=function(n){return this.dehancer!==void 0?this.dehancer(n):n},s.set=function(n){this.value_,n=this.prepareNewValue_(n),n!==_.UNCHANGED&&this.setNewValue_(n)},s.prepareNewValue_=function(n){if(jt(this)){var r=Ft(this,{object:this,type:de,newValue:n});if(!r)return _.UNCHANGED;n=r.newValue}return n=this.enhancer(n,this.value_,this.name_),this.equals(this.value_,n)?_.UNCHANGED:n},s.setNewValue_=function(n){var r=this.value_;this.value_=n,this.reportChanged(),Jt(this)&&Zt(this,{type:de,object:this,newValue:n,oldValue:r})},s.get=function(){return this.reportObserved(),this.dehanceValue(this.value_)},s.intercept_=function(n){return un(this,n)},s.observe_=function(n,r){return r&&n({observableKind:"value",debugObjectName:this.name_,object:this,type:de,newValue:this.value_,oldValue:void 0}),hn(this,n)},s.raw=function(){return this.value_},s.toJSON=function(){return this.get()},s.toString=function(){return this.name_+"["+this.value_+"]"},s.valueOf=function(){return Kc(this.get())},s[au]=function(){return this.valueOf()},e})(ln),Dp=qe("ObservableValue",Ve),lu;function Sn(t,e){return!!(t&e)}function Cn(t,e,s){return s?t|=e:t&=~e,t}lu=Symbol.toPrimitive;var he=(function(){function t(s){this.dependenciesState_=L.NOT_TRACKING_,this.observing_=[],this.newObserving_=null,this.observers_=new Set,this.diffValue_=0,this.runId_=0,this.lastAccessedBy_=0,this.lowestObserverState_=L.UP_TO_DATE_,this.unboundDepsCount_=0,this.value_=new Hn(null),this.name_=void 0,this.triggeredBy_=void 0,this.flags_=0,this.derivation=void 0,this.setter_=void 0,this.isTracing_=Gn.NONE,this.scope_=void 0,this.equals_=void 0,this.requiresReaction_=void 0,this.keepAlive_=void 0,this.onBOL=void 0,this.onBUOL=void 0,s.get||N(31),this.derivation=s.get,this.name_=s.name||"ComputedValue",s.set&&(this.setter_=bs("ComputedValue-setter",s.set)),this.equals_=s.equals||(s.compareStructural||s.struct?Vn.structural:Vn.default),this.scope_=s.context,this.requiresReaction_=s.requiresReaction,this.keepAlive_=!!s.keepAlive}var e=t.prototype;return e.onBecomeStale_=function(){jp(this)},e.onBO=function(){this.onBOL&&this.onBOL.forEach(function(i){return i()})},e.onBUO=function(){this.onBUOL&&this.onBUOL.forEach(function(i){return i()})},e.get=function(){if(this.isComputing&&N(32,this.name_,this.derivation),_.inBatch===0&&this.observers_.size===0&&!this.keepAlive_)qr(this)&&(this.warnAboutUntrackedRead_(),Vt(),this.value_=this.computeValue_(!1),Bt());else if(fu(this),qr(this)){var i=_.trackingContext;this.keepAlive_&&!i&&(_.trackingContext=this),this.trackAndCompute()&&Mp(this),_.trackingContext=i}var n=this.value_;if(Rn(n))throw n.cause;return n},e.set=function(i){if(this.setter_){this.isRunningSetter&&N(33,this.name_),this.isRunningSetter=!0;try{this.setter_.call(this.scope_,i)}finally{this.isRunningSetter=!1}}else N(34,this.name_)},e.trackAndCompute=function(){var i=this.value_,n=this.dependenciesState_===L.NOT_TRACKING_,r=this.computeValue_(!0),o=n||Rn(i)||Rn(r)||!this.equals_(i,r);return o&&(this.value_=r),o},e.computeValue_=function(i){this.isComputing=!0;var n=Ql(!1),r;if(i)r=du(this,this.derivation,this.scope_);else if(_.disableErrorBoundaries===!0)r=this.derivation.call(this.scope_);else try{r=this.derivation.call(this.scope_)}catch(o){r=new Hn(o)}return td(n),this.isComputing=!1,r},e.suspend_=function(){this.keepAlive_||(Wr(this),this.value_=void 0)},e.observe_=function(i,n){var r=this,o=!0,a=void 0;return qp(function(){var l=r.get();if(!o||n){var h=As();i({observableKind:"computed",debugObjectName:r.name_,type:de,object:r,newValue:l,oldValue:a}),Se(h)}o=!1,a=l})},e.warnAboutUntrackedRead_=function(){},e.toString=function(){return this.name_+"["+this.derivation.toString()+"]"},e.valueOf=function(){return Kc(this.get())},e[lu]=function(){return this.valueOf()},nr(t,[{key:"isComputing",get:function(){return Sn(this.flags_,t.isComputingMask_)},set:function(i){this.flags_=Cn(this.flags_,t.isComputingMask_,i)}},{key:"isRunningSetter",get:function(){return Sn(this.flags_,t.isRunningSetterMask_)},set:function(i){this.flags_=Cn(this.flags_,t.isRunningSetterMask_,i)}},{key:"isBeingObserved",get:function(){return Sn(this.flags_,t.isBeingObservedMask_)},set:function(i){this.flags_=Cn(this.flags_,t.isBeingObservedMask_,i)}},{key:"isPendingUnobservation",get:function(){return Sn(this.flags_,t.isPendingUnobservationMask_)},set:function(i){this.flags_=Cn(this.flags_,t.isPendingUnobservationMask_,i)}}]),t})();he.isComputingMask_=1;he.isRunningSetterMask_=2;he.isBeingObservedMask_=4;he.isPendingUnobservationMask_=8;var cn=qe("ComputedValue",he),L;(function(t){t[t.NOT_TRACKING_=-1]="NOT_TRACKING_",t[t.UP_TO_DATE_=0]="UP_TO_DATE_",t[t.POSSIBLY_STALE_=1]="POSSIBLY_STALE_",t[t.STALE_=2]="STALE_"})(L||(L={}));var Gn;(function(t){t[t.NONE=0]="NONE",t[t.LOG=1]="LOG",t[t.BREAK=2]="BREAK"})(Gn||(Gn={}));var Hn=function(e){this.cause=void 0,this.cause=e};function Rn(t){return t instanceof Hn}function qr(t){switch(t.dependenciesState_){case L.UP_TO_DATE_:return!1;case L.NOT_TRACKING_:case L.STALE_:return!0;case L.POSSIBLY_STALE_:{for(var e=ed(!0),s=As(),i=t.observing_,n=i.length,r=0;r<n;r++){var o=i[r];if(cn(o)){if(_.disableErrorBoundaries)o.get();else try{o.get()}catch{return Se(s),Ri(e),!0}if(t.dependenciesState_===L.STALE_)return Se(s),Ri(e),!0}}return uu(t),Se(s),Ri(e),!1}}}function du(t,e,s){var i=ed(!0);uu(t),t.newObserving_=new Array(t.runId_===0?100:t.observing_.length),t.unboundDepsCount_=0,t.runId_=++_.runId;var n=_.trackingDerivation;_.trackingDerivation=t,_.inBatch++;var r;if(_.disableErrorBoundaries===!0)r=e.call(s);else try{r=e.call(s)}catch(o){r=new Hn(o)}return _.inBatch--,_.trackingDerivation=n,Rp(t),Ri(i),r}function Rp(t){for(var e=t.observing_,s=t.observing_=t.newObserving_,i=L.UP_TO_DATE_,n=0,r=t.unboundDepsCount_,o=0;o<r;o++){var a=s[o];a.diffValue_===0&&(a.diffValue_=1,n!==o&&(s[n]=a),n++),a.dependenciesState_>i&&(i=a.dependenciesState_)}for(s.length=n,t.newObserving_=null,r=e.length;r--;){var l=e[r];l.diffValue_===0&&hu(l,t),l.diffValue_=0}for(;n--;){var h=s[n];h.diffValue_===1&&(h.diffValue_=0,Up(h,t))}i!==L.UP_TO_DATE_&&(t.dependenciesState_=i,t.onBecomeStale_())}function Wr(t){var e=t.observing_;t.observing_=[];for(var s=e.length;s--;)hu(e[s],t);t.dependenciesState_=L.NOT_TRACKING_}function cu(t){var e=As();try{return t()}finally{Se(e)}}function As(){var t=_.trackingDerivation;return _.trackingDerivation=null,t}function Se(t){_.trackingDerivation=t}function ed(t){var e=_.allowStateReads;return _.allowStateReads=t,e}function Ri(t){_.allowStateReads=t}function uu(t){if(t.dependenciesState_!==L.UP_TO_DATE_){t.dependenciesState_=L.UP_TO_DATE_;for(var e=t.observing_,s=e.length;s--;)e[s].lowestObserverState_=L.UP_TO_DATE_}}var Ir=function(){this.version=6,this.UNCHANGED={},this.trackingDerivation=null,this.trackingContext=null,this.runId=0,this.mobxGuid=0,this.inBatch=0,this.pendingUnobservations=[],this.pendingReactions=[],this.isRunningReactions=!1,this.allowStateChanges=!1,this.allowStateReads=!0,this.enforceActions=!0,this.spyListeners=[],this.globalReactionErrorHandlers=[],this.computedRequiresReaction=!1,this.reactionRequiresObservable=!1,this.observableRequiresReaction=!1,this.disableErrorBoundaries=!1,this.suppressReactionErrors=!1,this.useProxies=!0,this.verifyProxies=!1,this.safeDescriptors=!0},wr=!0,_=(function(){var t=Gc();return t.__mobxInstanceCount>0&&!t.__mobxGlobals&&(wr=!1),t.__mobxGlobals&&t.__mobxGlobals.version!==new Ir().version&&(wr=!1),wr?t.__mobxGlobals?(t.__mobxInstanceCount+=1,t.__mobxGlobals.UNCHANGED||(t.__mobxGlobals.UNCHANGED={}),t.__mobxGlobals):(t.__mobxInstanceCount=1,t.__mobxGlobals=new Ir):(setTimeout(function(){N(35)},1),new Ir)})();function Up(t,e){t.observers_.add(e),t.lowestObserverState_>e.dependenciesState_&&(t.lowestObserverState_=e.dependenciesState_)}function hu(t,e){t.observers_.delete(e),t.observers_.size===0&&pu(t)}function pu(t){t.isPendingUnobservation===!1&&(t.isPendingUnobservation=!0,_.pendingUnobservations.push(t))}function Vt(){_.inBatch++}function Bt(){if(--_.inBatch===0){vu();for(var t=_.pendingUnobservations,e=0;e<t.length;e++){var s=t[e];s.isPendingUnobservation=!1,s.observers_.size===0&&(s.isBeingObserved&&(s.isBeingObserved=!1,s.onBUO()),s instanceof he&&s.suspend_())}_.pendingUnobservations=[]}}function fu(t){var e=_.trackingDerivation;return e!==null?(e.runId_!==t.lastAccessedBy_&&(t.lastAccessedBy_=e.runId_,e.newObserving_[e.unboundDepsCount_++]=t,!t.isBeingObserved&&_.trackingContext&&(t.isBeingObserved=!0,t.onBO())),t.isBeingObserved):(t.observers_.size===0&&_.inBatch>0&&pu(t),!1)}function gu(t){t.lowestObserverState_!==L.STALE_&&(t.lowestObserverState_=L.STALE_,t.observers_.forEach(function(e){e.dependenciesState_===L.UP_TO_DATE_&&e.onBecomeStale_(),e.dependenciesState_=L.STALE_}))}function Mp(t){t.lowestObserverState_!==L.STALE_&&(t.lowestObserverState_=L.STALE_,t.observers_.forEach(function(e){e.dependenciesState_===L.POSSIBLY_STALE_?e.dependenciesState_=L.STALE_:e.dependenciesState_===L.UP_TO_DATE_&&(t.lowestObserverState_=L.UP_TO_DATE_)}))}function jp(t){t.lowestObserverState_===L.UP_TO_DATE_&&(t.lowestObserverState_=L.POSSIBLY_STALE_,t.observers_.forEach(function(e){e.dependenciesState_===L.UP_TO_DATE_&&(e.dependenciesState_=L.POSSIBLY_STALE_,e.onBecomeStale_())}))}var Xn=(function(){function t(s,i,n,r){s===void 0&&(s="Reaction"),this.name_=void 0,this.onInvalidate_=void 0,this.errorHandler_=void 0,this.requiresObservable_=void 0,this.observing_=[],this.newObserving_=[],this.dependenciesState_=L.NOT_TRACKING_,this.diffValue_=0,this.runId_=0,this.unboundDepsCount_=0,this.isDisposed_=!1,this.isScheduled_=!1,this.isTrackPending_=!1,this.isRunning_=!1,this.isTracing_=Gn.NONE,this.name_=s,this.onInvalidate_=i,this.errorHandler_=n,this.requiresObservable_=r}var e=t.prototype;return e.onBecomeStale_=function(){this.schedule_()},e.schedule_=function(){this.isScheduled_||(this.isScheduled_=!0,_.pendingReactions.push(this),vu())},e.isScheduled=function(){return this.isScheduled_},e.runReaction_=function(){if(!this.isDisposed_){Vt(),this.isScheduled_=!1;var i=_.trackingContext;if(_.trackingContext=this,qr(this)){this.isTrackPending_=!0;try{this.onInvalidate_()}catch(n){this.reportExceptionInDerivation_(n)}}_.trackingContext=i,Bt()}},e.track=function(i){if(!this.isDisposed_){Vt(),this.isRunning_=!0;var n=_.trackingContext;_.trackingContext=this;var r=du(this,i,void 0);_.trackingContext=n,this.isRunning_=!1,this.isTrackPending_=!1,this.isDisposed_&&Wr(this),Rn(r)&&this.reportExceptionInDerivation_(r.cause),Bt()}},e.reportExceptionInDerivation_=function(i){var n=this;if(this.errorHandler_){this.errorHandler_(i,this);return}if(_.disableErrorBoundaries)throw i;var r="[mobx] uncaught error in '"+this+"'";_.suppressReactionErrors||console.error(r,i),_.globalReactionErrorHandlers.forEach(function(o){return o(i,n)})},e.dispose=function(){this.isDisposed_||(this.isDisposed_=!0,this.isRunning_||(Vt(),Wr(this),Bt()))},e.getDisposer_=function(i){var n=this,r=function o(){n.dispose(),i==null||i.removeEventListener==null||i.removeEventListener("abort",o)};return i==null||i.addEventListener==null||i.addEventListener("abort",r),r[C]=this,r},e.toString=function(){return"Reaction["+this.name_+"]"},e.trace=function(i){},t})(),Fp=100,Vp=function(e){return e()};function vu(){_.inBatch>0||_.isRunningReactions||Vp(Bp)}function Bp(){_.isRunningReactions=!0;for(var t=_.pendingReactions,e=0;t.length>0;){++e===Fp&&(console.error("[mobx] cycle in reaction: "+t[0]),t.splice(0));for(var s=t.splice(0),i=0,n=s.length;i<n;i++)s[i].runReaction_()}_.isRunningReactions=!1}var kn=qe("Reaction",Xn);function Ui(){return!1}function Gp(t){return console.warn("[mobx.spy] Is a no-op in production builds"),function(){}}var _u="action",Hp="action.bound",yu="autoAction",Xp="autoAction.bound",kp="<unnamed action>",Kr=dn(_u),Yp=dn(Hp,{bound:!0}),Jr=dn(yu,{autoAction:!0}),zp=dn(Xp,{autoAction:!0,bound:!0});function mu(t){var e=function(i,n){if(Qt(i))return bs(i.name||kp,i,t);if(Qt(n))return bs(i,n,t);if(an(n))return(t?Jr:Kr).decorate_20223_(i,n);if(_s(n))return bi(i,n,t?Jr:Kr);if(_s(i))return le(dn(t?yu:_u,{name:i,autoAction:t}))};return e}var $=mu(!1);Object.assign($,Kr);var Vi=mu(!0);Object.assign(Vi,Jr);$.bound=le(Yp);Vi.bound=le(zp);function lr(t){return Qt(t)&&t.isMobxAction===!0}function qp(t,e){var s,i,n,r,o;e===void 0&&(e=Xc);var a=(s=(i=e)==null?void 0:i.name)!=null?s:"Autorun",l=!e.scheduler&&!e.delay,h;if(l)h=new Xn(a,function(){this.track(b)},e.onError,e.requiresObservable);else{var g=Kp(e),v=!1;h=new Xn(a,function(){v||(v=!0,g(function(){v=!1,h.isDisposed_||h.track(b)}))},e.onError,e.requiresObservable)}function b(){t(h)}return(n=e)!=null&&(r=n.signal)!=null&&r.aborted||h.schedule_(),h.getDisposer_((o=e)==null?void 0:o.signal)}var Wp=function(e){return e()};function Kp(t){return t.scheduler?t.scheduler:t.delay?function(e){return setTimeout(e,t.delay)}:Wp}var Jp="onBO",Zp="onBUO";function Qp(t,e,s){return Eu(Jp,t,e,s)}function bu(t,e,s){return Eu(Zp,t,e,s)}function Eu(t,e,s,i){var n=Zr(e),r=Qt(i)?i:s,o=t+"L";return n[o]?n[o].add(r):n[o]=new Set([r]),function(){var a=n[o];a&&(a.delete(r),a.size===0&&delete n[o])}}function tf(t,e,s,i){var n=jh(e);return Os(function(){var r=Ei(t,i)[C];ir(n).forEach(function(o){r.extend_(o,n[o],s&&o in s?s[o]:!0)})}),t}var ef=0;function Tu(){this.message="FLOW_CANCELLED"}Tu.prototype=Object.create(Error.prototype);var xr=tu("flow"),sf=tu("flow.bound",{bound:!0}),ni=Object.assign(function(e,s){if(an(s))return xr.decorate_20223_(e,s);if(_s(s))return bi(e,s,xr);var i=e,n=i.name||"<unnamed flow>",r=function(){var a=this,l=arguments,h=++ef,g=$(n+" - runid: "+h+" - init",i).apply(a,l),v,b=void 0,x=new Promise(function(F,tt){var $t=0;v=tt;function es(Nt){b=void 0;var xe;try{xe=$(n+" - runid: "+h+" - yield "+$t++,g.next).call(g,Nt)}catch(ss){return tt(ss)}Ai(xe)}function Tr(Nt){b=void 0;var xe;try{xe=$(n+" - runid: "+h+" - yield "+$t++,g.throw).call(g,Nt)}catch(ss){return tt(ss)}Ai(xe)}function Ai(Nt){if(Qt(Nt==null?void 0:Nt.then)){Nt.then(Ai,tt);return}return Nt.done?F(Nt.value):(b=Promise.resolve(Nt.value),b.then(es,Tr))}es(void 0)});return x.cancel=$(n+" - runid: "+h+" - cancel",function(){try{b&&Pd(b);var F=g.return(void 0),tt=Promise.resolve(F.value);tt.then(Us,Us),Pd(tt),v(new Tu)}catch($t){v($t)}}),x};return r.isMobXFlow=!0,r},xr);ni.bound=le(sf);function Pd(t){Qt(t.cancel)&&t.cancel()}function Bi(t){return(t==null?void 0:t.isMobXFlow)===!0}function nf(t,e){return t?fn(t)||!!t[C]||Jl(t)||kn(t)||cn(t):!1}function sd(t){return nf(t)}function rf(t){if(fn(t))return t[C].ownKeys_();N(38)}function An(t,e,s){return t.set(e,s),s}function Rs(t,e){if(t==null||typeof t!="object"||t instanceof Date||!sd(t))return t;if(Dp(t)||cn(t))return Rs(t.get(),e);if(e.has(t))return e.get(t);if(pn(t)){var s=An(e,t,new Array(t.length));return t.forEach(function(o,a){s[a]=Rs(o,e)}),s}if($s(t)){var i=An(e,t,new Set);return t.forEach(function(o){i.add(Rs(o,e))}),i}if(We(t)){var n=An(e,t,new Map);return t.forEach(function(o,a){n.set(a,Rs(o,e))}),n}else{var r=An(e,t,{});return rf(t).forEach(function(o){rn.propertyIsEnumerable.call(t,o)&&(r[o]=Rs(t[o],e))}),r}}function of(t,e){return Rs(t,new Map)}function be(t,e){e===void 0&&(e=void 0),Vt();try{return t.apply(e)}finally{Bt()}}function Ls(t){return t[C]}var af={has:function(e,s){return Ls(e).has_(s)},get:function(e,s){return Ls(e).get_(s)},set:function(e,s,i){var n;return _s(s)?(n=Ls(e).set_(s,i,!0))!=null?n:!0:!1},deleteProperty:function(e,s){var i;return _s(s)?(i=Ls(e).delete_(s,!0))!=null?i:!0:!1},defineProperty:function(e,s,i){var n;return(n=Ls(e).defineProperty_(s,i))!=null?n:!0},ownKeys:function(e){return Ls(e).ownKeys_()},preventExtensions:function(e){N(13)}};function lf(t,e){var s,i;return kc(),t=Ei(t,e),(i=(s=t[C]).proxy_)!=null?i:s.proxy_=new Proxy(t,af)}function jt(t){return t.interceptors_!==void 0&&t.interceptors_.length>0}function un(t,e){var s=t.interceptors_||(t.interceptors_=[]);return s.push(e),Yc(function(){var i=s.indexOf(e);i!==-1&&s.splice(i,1)})}function Ft(t,e){var s=As();try{for(var i=[].concat(t.interceptors_||[]),n=0,r=i.length;n<r&&(e=i[n](e),e&&!e.type&&N(14),!!e);n++);return e}finally{Se(s)}}function Jt(t){return t.changeListeners_!==void 0&&t.changeListeners_.length>0}function hn(t,e){var s=t.changeListeners_||(t.changeListeners_=[]);return s.push(e),Yc(function(){var i=s.indexOf(e);i!==-1&&s.splice(i,1)})}function Zt(t,e){var s=As(),i=t.changeListeners_;if(i){i=i.slice();for(var n=0,r=i.length;n<r;n++)i[n](e);Se(s)}}function df(t,e,s){return Os(function(){var i,n=Ei(t,s)[C];(i=e)!=null||(e=Hh(t)),ir(e).forEach(function(r){return n.make_(r,e[r])})}),t}var Nd="splice",de="update",cf=1e4,uf={get:function(e,s){var i=e[C];return s===C?i:s==="length"?i.getArrayLength_():typeof s=="string"&&!isNaN(s)?i.get_(parseInt(s)):Te(Yn,s)?Yn[s]:e[s]},set:function(e,s,i){var n=e[C];return s==="length"&&n.setArrayLength_(i),typeof s=="symbol"||isNaN(s)?e[s]=i:n.set_(parseInt(s),i),!0},preventExtensions:function(){N(15)}},id=(function(){function t(s,i,n,r){s===void 0&&(s="ObservableArray"),this.owned_=void 0,this.legacyMode_=void 0,this.atom_=void 0,this.values_=[],this.interceptors_=void 0,this.changeListeners_=void 0,this.enhancer_=void 0,this.dehancer=void 0,this.proxy_=void 0,this.lastKnownLength_=0,this.owned_=n,this.legacyMode_=r,this.atom_=new ln(s),this.enhancer_=function(o,a){return i(o,a,"ObservableArray[..]")}}var e=t.prototype;return e.dehanceValue_=function(i){return this.dehancer!==void 0?this.dehancer(i):i},e.dehanceValues_=function(i){return this.dehancer!==void 0&&i.length>0?i.map(this.dehancer):i},e.intercept_=function(i){return un(this,i)},e.observe_=function(i,n){return n===void 0&&(n=!1),n&&i({observableKind:"array",object:this.proxy_,debugObjectName:this.atom_.name_,type:"splice",index:0,added:this.values_.slice(),addedCount:this.values_.length,removed:[],removedCount:0}),hn(this,i)},e.getArrayLength_=function(){return this.atom_.reportObserved(),this.values_.length},e.setArrayLength_=function(i){(typeof i!="number"||isNaN(i)||i<0)&&N("Out of range: "+i);var n=this.values_.length;if(i!==n)if(i>n){for(var r=new Array(i-n),o=0;o<i-n;o++)r[o]=void 0;this.spliceWithArray_(n,0,r)}else this.spliceWithArray_(i,n-i)},e.updateArrayLength_=function(i,n){i!==this.lastKnownLength_&&N(16),this.lastKnownLength_+=n,this.legacyMode_&&n>0&&Lu(i+n+1)},e.spliceWithArray_=function(i,n,r){var o=this;this.atom_;var a=this.values_.length;if(i===void 0?i=0:i>a?i=a:i<0&&(i=Math.max(0,a+i)),arguments.length===1?n=a-i:n==null?n=0:n=Math.max(0,Math.min(n,a-i)),r===void 0&&(r=Xr),jt(this)){var l=Ft(this,{object:this.proxy_,type:Nd,index:i,removedCount:n,added:r});if(!l)return Xr;n=l.removedCount,r=l.added}if(r=r.length===0?r:r.map(function(v){return o.enhancer_(v,void 0)}),this.legacyMode_){var h=r.length-n;this.updateArrayLength_(a,h)}var g=this.spliceItemsIntoValues_(i,n,r);return(n!==0||r.length!==0)&&this.notifyArraySplice_(i,r,g),this.dehanceValues_(g)},e.spliceItemsIntoValues_=function(i,n,r){if(r.length<cf){var o;return(o=this.values_).splice.apply(o,[i,n].concat(r))}else{var a=this.values_.slice(i,i+n),l=this.values_.slice(i+n);this.values_.length+=r.length-n;for(var h=0;h<r.length;h++)this.values_[i+h]=r[h];for(var g=0;g<l.length;g++)this.values_[i+r.length+g]=l[g];return a}},e.notifyArrayChildUpdate_=function(i,n,r){var o=!this.owned_&&Ui(),a=Jt(this),l=a||o?{observableKind:"array",object:this.proxy_,type:de,debugObjectName:this.atom_.name_,index:i,newValue:n,oldValue:r}:null;this.atom_.reportChanged(),a&&Zt(this,l)},e.notifyArraySplice_=function(i,n,r){var o=!this.owned_&&Ui(),a=Jt(this),l=a||o?{observableKind:"array",object:this.proxy_,debugObjectName:this.atom_.name_,type:Nd,index:i,removed:r,added:n,removedCount:r.length,addedCount:n.length}:null;this.atom_.reportChanged(),a&&Zt(this,l)},e.get_=function(i){if(this.legacyMode_&&i>=this.values_.length){console.warn("[mobx] Out of bounds read: "+i);return}return this.atom_.reportObserved(),this.dehanceValue_(this.values_[i])},e.set_=function(i,n){var r=this.values_;if(this.legacyMode_&&i>r.length&&N(17,i,r.length),i<r.length){this.atom_;var o=r[i];if(jt(this)){var a=Ft(this,{type:de,object:this.proxy_,index:i,newValue:n});if(!a)return;n=a.newValue}n=this.enhancer_(n,o);var l=n!==o;l&&(r[i]=n,this.notifyArrayChildUpdate_(i,n,o))}else{for(var h=new Array(i+1-r.length),g=0;g<h.length-1;g++)h[g]=void 0;h[h.length-1]=n,this.spliceWithArray_(r.length,0,h)}},t})();function hf(t,e,s,i){return s===void 0&&(s="ObservableArray"),i===void 0&&(i=!1),kc(),Os(function(){var n=new id(s,e,i,!1);qc(n.values_,C,n);var r=new Proxy(n.values_,uf);return n.proxy_=r,t&&t.length&&n.spliceWithArray_(0,0,t),r})}var Yn={clear:function(){return this.splice(0)},replace:function(e){var s=this[C];return s.spliceWithArray_(0,s.values_.length,e)},toJSON:function(){return this.slice()},splice:function(e,s){for(var i=arguments.length,n=new Array(i>2?i-2:0),r=2;r<i;r++)n[r-2]=arguments[r];var o=this[C];switch(arguments.length){case 0:return[];case 1:return o.spliceWithArray_(e);case 2:return o.spliceWithArray_(e,s)}return o.spliceWithArray_(e,s,n)},spliceWithArray:function(e,s,i){return this[C].spliceWithArray_(e,s,i)},push:function(){for(var e=this[C],s=arguments.length,i=new Array(s),n=0;n<s;n++)i[n]=arguments[n];return e.spliceWithArray_(e.values_.length,0,i),e.values_.length},pop:function(){return this.splice(Math.max(this[C].values_.length-1,0),1)[0]},shift:function(){return this.splice(0,1)[0]},unshift:function(){for(var e=this[C],s=arguments.length,i=new Array(s),n=0;n<s;n++)i[n]=arguments[n];return e.spliceWithArray_(0,0,i),e.values_.length},reverse:function(){return _.trackingDerivation&&N(37,"reverse"),this.replace(this.slice().reverse()),this},sort:function(){_.trackingDerivation&&N(37,"sort");var e=this.slice();return e.sort.apply(e,arguments),this.replace(e),this},remove:function(e){var s=this[C],i=s.dehanceValues_(s.values_).indexOf(e);return i>-1?(this.splice(i,1),!0):!1}};j("at",Ut);j("concat",Ut);j("flat",Ut);j("includes",Ut);j("indexOf",Ut);j("join",Ut);j("lastIndexOf",Ut);j("slice",Ut);j("toString",Ut);j("toLocaleString",Ut);j("toSorted",Ut);j("toSpliced",Ut);j("with",Ut);j("every",ee);j("filter",ee);j("find",ee);j("findIndex",ee);j("findLast",ee);j("findLastIndex",ee);j("flatMap",ee);j("forEach",ee);j("map",ee);j("some",ee);j("toReversed",ee);j("reduce",Su);j("reduceRight",Su);function j(t,e){typeof Array.prototype[t]=="function"&&(Yn[t]=e(t))}function Ut(t){return function(){var e=this[C];e.atom_.reportObserved();var s=e.dehanceValues_(e.values_);return s[t].apply(s,arguments)}}function ee(t){return function(e,s){var i=this,n=this[C];n.atom_.reportObserved();var r=n.dehanceValues_(n.values_);return r[t](function(o,a){return e.call(s,o,a,i)})}}function Su(t){return function(){var e=this,s=this[C];s.atom_.reportObserved();var i=s.dehanceValues_(s.values_),n=arguments[0];return arguments[0]=function(r,o,a){return n(r,o,a,e)},i[t].apply(i,arguments)}}var pf=qe("ObservableArrayAdministration",id);function pn(t){return er(t)&&pf(t[C])}var Cu,Au,ff={},Re="add",zn="delete";Cu=Symbol.iterator;Au=Symbol.toStringTag;var $u=(function(){function t(s,i,n){var r=this;i===void 0&&(i=ms),n===void 0&&(n="ObservableMap"),this.enhancer_=void 0,this.name_=void 0,this[C]=ff,this.data_=void 0,this.hasMap_=void 0,this.keysAtom_=void 0,this.interceptors_=void 0,this.changeListeners_=void 0,this.dehancer=void 0,this.enhancer_=i,this.name_=n,Qt(Map)||N(18),Os(function(){r.keysAtom_=Zc("ObservableMap.keys()"),r.data_=new Map,r.hasMap_=new Map,s&&r.merge(s)})}var e=t.prototype;return e.has_=function(i){return this.data_.has(i)},e.has=function(i){var n=this;if(!_.trackingDerivation)return this.has_(i);var r=this.hasMap_.get(i);if(!r){var o=r=new Ve(this.has_(i),rr,"ObservableMap.key?",!1);this.hasMap_.set(i,o),bu(o,function(){return n.hasMap_.delete(i)})}return r.get()},e.set=function(i,n){var r=this.has_(i);if(jt(this)){var o=Ft(this,{type:r?de:Re,object:this,newValue:n,name:i});if(!o)return this;n=o.newValue}return r?this.updateValue_(i,n):this.addValue_(i,n),this},e.delete=function(i){var n=this;if(this.keysAtom_,jt(this)){var r=Ft(this,{type:zn,object:this,name:i});if(!r)return!1}if(this.has_(i)){var o=Ui(),a=Jt(this),l=a||o?{observableKind:"map",debugObjectName:this.name_,type:zn,object:this,oldValue:this.data_.get(i).value_,name:i}:null;return be(function(){var h;n.keysAtom_.reportChanged(),(h=n.hasMap_.get(i))==null||h.setNewValue_(!1);var g=n.data_.get(i);g.setNewValue_(void 0),n.data_.delete(i)}),a&&Zt(this,l),!0}return!1},e.updateValue_=function(i,n){var r=this.data_.get(i);if(n=r.prepareNewValue_(n),n!==_.UNCHANGED){var o=Ui(),a=Jt(this),l=a||o?{observableKind:"map",debugObjectName:this.name_,type:de,object:this,oldValue:r.value_,name:i,newValue:n}:null;r.setNewValue_(n),a&&Zt(this,l)}},e.addValue_=function(i,n){var r=this;this.keysAtom_,be(function(){var h,g=new Ve(n,r.enhancer_,"ObservableMap.key",!1);r.data_.set(i,g),n=g.value_,(h=r.hasMap_.get(i))==null||h.setNewValue_(!0),r.keysAtom_.reportChanged()});var o=Ui(),a=Jt(this),l=a||o?{observableKind:"map",debugObjectName:this.name_,type:Re,object:this,name:i,newValue:n}:null;a&&Zt(this,l)},e.get=function(i){return this.has(i)?this.dehanceValue_(this.data_.get(i).get()):this.dehanceValue_(void 0)},e.dehanceValue_=function(i){return this.dehancer!==void 0?this.dehancer(i):i},e.keys=function(){return this.keysAtom_.reportObserved(),this.data_.keys()},e.values=function(){var i=this,n=this.keys();return Gi({next:function(){var o=n.next(),a=o.done,l=o.value;return{done:a,value:a?void 0:i.get(l)}}})},e.entries=function(){var i=this,n=this.keys();return Gi({next:function(){var o=n.next(),a=o.done,l=o.value;return{done:a,value:a?void 0:[l,i.get(l)]}}})},e[Cu]=function(){return this.entries()},e.forEach=function(i,n){for(var r=Ms(this),o;!(o=r()).done;){var a=o.value,l=a[0],h=a[1];i.call(n,h,l,this)}},e.merge=function(i){var n=this;return We(i)&&(i=new Map(i)),be(function(){He(i)?Mh(i).forEach(function(r){return n.set(r,i[r])}):Array.isArray(i)?i.forEach(function(r){var o=r[0],a=r[1];return n.set(o,a)}):mi(i)?(Uh(i)||N(19,i),i.forEach(function(r,o){return n.set(o,r)})):i!=null&&N(20,i)}),this},e.clear=function(){var i=this;be(function(){cu(function(){for(var n=Ms(i.keys()),r;!(r=n()).done;){var o=r.value;i.delete(o)}})})},e.replace=function(i){var n=this;return be(function(){for(var r=gf(i),o=new Map,a=!1,l=Ms(n.data_.keys()),h;!(h=l()).done;){var g=h.value;if(!r.has(g)){var v=n.delete(g);if(v)a=!0;else{var b=n.data_.get(g);o.set(g,b)}}}for(var x=Ms(r.entries()),F;!(F=x()).done;){var tt=F.value,$t=tt[0],es=tt[1],Tr=n.data_.has($t);if(n.set($t,es),n.data_.has($t)){var Ai=n.data_.get($t);o.set($t,Ai),Tr||(a=!0)}}if(!a)if(n.data_.size!==o.size)n.keysAtom_.reportChanged();else for(var Nt=n.data_.keys(),xe=o.keys(),ss=Nt.next(),gd=xe.next();!ss.done;){if(ss.value!==gd.value){n.keysAtom_.reportChanged();break}ss=Nt.next(),gd=xe.next()}n.data_=o}),this},e.toString=function(){return"[object ObservableMap]"},e.toJSON=function(){return Array.from(this)},e.observe_=function(i,n){return hn(this,i)},e.intercept_=function(i){return un(this,i)},nr(t,[{key:"size",get:function(){return this.keysAtom_.reportObserved(),this.data_.size}},{key:Au,get:function(){return"Map"}}]),t})(),We=qe("ObservableMap",$u);function gf(t){if(mi(t)||We(t))return t;if(Array.isArray(t))return new Map(t);if(He(t)){var e=new Map;for(var s in t)e.set(s,t[s]);return e}else return N(21,t)}var Ou,Iu,vf={};Ou=Symbol.iterator;Iu=Symbol.toStringTag;var wu=(function(){function t(s,i,n){var r=this;i===void 0&&(i=ms),n===void 0&&(n="ObservableSet"),this.name_=void 0,this[C]=vf,this.data_=new Set,this.atom_=void 0,this.changeListeners_=void 0,this.interceptors_=void 0,this.dehancer=void 0,this.enhancer_=void 0,this.name_=n,Qt(Set)||N(22),this.enhancer_=function(o,a){return i(o,a,n)},Os(function(){r.atom_=Zc(r.name_),s&&r.replace(s)})}var e=t.prototype;return e.dehanceValue_=function(i){return this.dehancer!==void 0?this.dehancer(i):i},e.clear=function(){var i=this;be(function(){cu(function(){for(var n=Ms(i.data_.values()),r;!(r=n()).done;){var o=r.value;i.delete(o)}})})},e.forEach=function(i,n){for(var r=Ms(this),o;!(o=r()).done;){var a=o.value;i.call(n,a,a,this)}},e.add=function(i){var n=this;if(this.atom_,jt(this)){var r=Ft(this,{type:Re,object:this,newValue:i});if(!r)return this}if(!this.has(i)){be(function(){n.data_.add(n.enhancer_(i,void 0)),n.atom_.reportChanged()});var o=!1,a=Jt(this),l=a||o?{observableKind:"set",debugObjectName:this.name_,type:Re,object:this,newValue:i}:null;a&&Zt(this,l)}return this},e.delete=function(i){var n=this;if(jt(this)){var r=Ft(this,{type:zn,object:this,oldValue:i});if(!r)return!1}if(this.has(i)){var o=!1,a=Jt(this),l=a||o?{observableKind:"set",debugObjectName:this.name_,type:zn,object:this,oldValue:i}:null;return be(function(){n.atom_.reportChanged(),n.data_.delete(i)}),a&&Zt(this,l),!0}return!1},e.has=function(i){return this.atom_.reportObserved(),this.data_.has(this.dehanceValue_(i))},e.entries=function(){var i=0,n=Array.from(this.keys()),r=Array.from(this.values());return Gi({next:function(){var a=i;return i+=1,a<r.length?{value:[n[a],r[a]],done:!1}:{done:!0}}})},e.keys=function(){return this.values()},e.values=function(){this.atom_.reportObserved();var i=this,n=0,r=Array.from(this.data_.values());return Gi({next:function(){return n<r.length?{value:i.dehanceValue_(r[n++]),done:!1}:{done:!0}}})},e.replace=function(i){var n=this;return $s(i)&&(i=new Set(i)),be(function(){Array.isArray(i)?(n.clear(),i.forEach(function(r){return n.add(r)})):on(i)?(n.clear(),i.forEach(function(r){return n.add(r)})):i!=null&&N("Cannot initialize set from "+i)}),this},e.observe_=function(i,n){return hn(this,i)},e.intercept_=function(i){return un(this,i)},e.toJSON=function(){return Array.from(this)},e.toString=function(){return"[object ObservableSet]"},e[Ou]=function(){return this.values()},nr(t,[{key:"size",get:function(){return this.atom_.reportObserved(),this.data_.size}},{key:Iu,get:function(){return"Set"}}]),t})(),$s=qe("ObservableSet",wu),Ld=Object.create(null),Dd="remove",xu=(function(){function t(s,i,n,r){i===void 0&&(i=new Map),r===void 0&&(r=pp),this.target_=void 0,this.values_=void 0,this.name_=void 0,this.defaultAnnotation_=void 0,this.keysAtom_=void 0,this.changeListeners_=void 0,this.interceptors_=void 0,this.proxy_=void 0,this.isPlainObject_=void 0,this.appliedAnnotations_=void 0,this.pendingKeys_=void 0,this.target_=s,this.values_=i,this.name_=n,this.defaultAnnotation_=r,this.keysAtom_=new ln("ObservableObject.keys"),this.isPlainObject_=He(this.target_)}var e=t.prototype;return e.getObservablePropValue_=function(i){return this.values_.get(i).get()},e.setObservablePropValue_=function(i,n){var r=this.values_.get(i);if(r instanceof he)return r.set(n),!0;if(jt(this)){var o=Ft(this,{type:de,object:this.proxy_||this.target_,name:i,newValue:n});if(!o)return null;n=o.newValue}if(n=r.prepareNewValue_(n),n!==_.UNCHANGED){var a=Jt(this),l=!1,h=a||l?{type:de,observableKind:"object",debugObjectName:this.name_,object:this.proxy_||this.target_,oldValue:r.value_,name:i,newValue:n}:null;r.setNewValue_(n),a&&Zt(this,h)}return!0},e.get_=function(i){return _.trackingDerivation&&!Te(this.target_,i)&&this.has_(i),this.target_[i]},e.set_=function(i,n,r){return r===void 0&&(r=!1),Te(this.target_,i)?this.values_.has(i)?this.setObservablePropValue_(i,n):r?Reflect.set(this.target_,i,n):(this.target_[i]=n,!0):this.extend_(i,{value:n,enumerable:!0,writable:!0,configurable:!0},this.defaultAnnotation_,r)},e.has_=function(i){if(!_.trackingDerivation)return i in this.target_;this.pendingKeys_||(this.pendingKeys_=new Map);var n=this.pendingKeys_.get(i);return n||(n=new Ve(i in this.target_,rr,"ObservableObject.key?",!1),this.pendingKeys_.set(i,n)),n.get()},e.make_=function(i,n){if(n===!0&&(n=this.defaultAnnotation_),n!==!1){if(!(i in this.target_)){var r;if((r=this.target_[oe])!=null&&r[i])return;N(1,n.annotationType_,this.name_+"."+i.toString())}for(var o=this.target_;o&&o!==rn;){var a=Fn(o,i);if(a){var l=n.make_(this,i,a,o);if(l===0)return;if(l===1)break}o=Object.getPrototypeOf(o)}Ud(this,n,i)}},e.extend_=function(i,n,r,o){if(o===void 0&&(o=!1),r===!0&&(r=this.defaultAnnotation_),r===!1)return this.defineProperty_(i,n,o);var a=r.extend_(this,i,n,o);return a&&Ud(this,r,i),a},e.defineProperty_=function(i,n,r){r===void 0&&(r=!1),this.keysAtom_;try{Vt();var o=this.delete_(i);if(!o)return o;if(jt(this)){var a=Ft(this,{object:this.proxy_||this.target_,name:i,type:Re,newValue:n.value});if(!a)return null;var l=a.newValue;n.value!==l&&(n=ys({},n,{value:l}))}if(r){if(!Reflect.defineProperty(this.target_,i,n))return!1}else ae(this.target_,i,n);this.notifyPropertyAddition_(i,n.value)}finally{Bt()}return!0},e.defineObservableProperty_=function(i,n,r,o){o===void 0&&(o=!1),this.keysAtom_;try{Vt();var a=this.delete_(i);if(!a)return a;if(jt(this)){var l=Ft(this,{object:this.proxy_||this.target_,name:i,type:Re,newValue:n});if(!l)return null;n=l.newValue}var h=Rd(i),g={configurable:_.safeDescriptors?this.isPlainObject_:!0,enumerable:!0,get:h.get,set:h.set};if(o){if(!Reflect.defineProperty(this.target_,i,g))return!1}else ae(this.target_,i,g);var v=new Ve(n,r,"ObservableObject.key",!1);this.values_.set(i,v),this.notifyPropertyAddition_(i,v.value_)}finally{Bt()}return!0},e.defineComputedProperty_=function(i,n,r){r===void 0&&(r=!1),this.keysAtom_;try{Vt();var o=this.delete_(i);if(!o)return o;if(jt(this)){var a=Ft(this,{object:this.proxy_||this.target_,name:i,type:Re,newValue:void 0});if(!a)return null}n.name||(n.name="ObservableObject.key"),n.context=this.proxy_||this.target_;var l=Rd(i),h={configurable:_.safeDescriptors?this.isPlainObject_:!0,enumerable:!1,get:l.get,set:l.set};if(r){if(!Reflect.defineProperty(this.target_,i,h))return!1}else ae(this.target_,i,h);this.values_.set(i,new he(n)),this.notifyPropertyAddition_(i,void 0)}finally{Bt()}return!0},e.delete_=function(i,n){if(n===void 0&&(n=!1),this.keysAtom_,!Te(this.target_,i))return!0;if(jt(this)){var r=Ft(this,{object:this.proxy_||this.target_,name:i,type:Dd});if(!r)return null}try{var o,a;Vt();var l=Jt(this),h=!1,g=this.values_.get(i),v=void 0;if(!g&&(l||h)){var b;v=(b=Fn(this.target_,i))==null?void 0:b.value}if(n){if(!Reflect.deleteProperty(this.target_,i))return!1}else delete this.target_[i];if(g&&(this.values_.delete(i),g instanceof Ve&&(v=g.value_),gu(g)),this.keysAtom_.reportChanged(),(o=this.pendingKeys_)==null||(a=o.get(i))==null||a.set(i in this.target_),l||h){var x={type:Dd,observableKind:"object",object:this.proxy_||this.target_,debugObjectName:this.name_,oldValue:v,name:i};l&&Zt(this,x)}}finally{Bt()}return!0},e.observe_=function(i,n){return hn(this,i)},e.intercept_=function(i){return un(this,i)},e.notifyPropertyAddition_=function(i,n){var r,o,a=Jt(this),l=!1;if(a||l){var h=a||l?{type:Re,observableKind:"object",debugObjectName:this.name_,object:this.proxy_||this.target_,name:i,newValue:n}:null;a&&Zt(this,h)}(r=this.pendingKeys_)==null||(o=r.get(i))==null||o.set(!0),this.keysAtom_.reportChanged()},e.ownKeys_=function(){return this.keysAtom_.reportObserved(),ir(this.target_)},e.keys_=function(){return this.keysAtom_.reportObserved(),Object.keys(this.target_)},t})();function Ei(t,e){var s;if(Te(t,C))return t;var i=(s=e==null?void 0:e.name)!=null?s:"ObservableObject",n=new xu(t,new Map,String(i),Cp(e));return sr(t,C,n),t}var _f=qe("ObservableObjectAdministration",xu);function Rd(t){return Ld[t]||(Ld[t]={get:function(){return this[C].getObservablePropValue_(t)},set:function(s){return this[C].setObservablePropValue_(t,s)}})}function fn(t){return er(t)?_f(t[C]):!1}function Ud(t,e,s){var i;(i=t.target_[oe])==null||delete i[s]}var yf=Nu(0),mf=(function(){var t=!1,e={};return Object.defineProperty(e,"0",{set:function(){t=!0}}),Object.create(e)[0]=1,t===!1})(),Pr=0,Pu=function(){};function bf(t,e){Object.setPrototypeOf?Object.setPrototypeOf(t.prototype,e):t.prototype.__proto__!==void 0?t.prototype.__proto__=e:t.prototype=e}bf(Pu,Array.prototype);var nd=(function(t,e,s){Jc(i,t);function i(r,o,a,l){var h;return a===void 0&&(a="ObservableArray"),l===void 0&&(l=!1),h=t.call(this)||this,Os(function(){var g=new id(a,o,l,!0);g.proxy_=Or(h),qc(Or(h),C,g),r&&r.length&&h.spliceWithArray(0,0,r),mf&&Object.defineProperty(Or(h),"0",yf)}),h}var n=i.prototype;return n.concat=function(){this[C].atom_.reportObserved();for(var o=arguments.length,a=new Array(o),l=0;l<o;l++)a[l]=arguments[l];return Array.prototype.concat.apply(this.slice(),a.map(function(h){return pn(h)?h.slice():h}))},n[s]=function(){var r=this,o=0;return Gi({next:function(){return o<r.length?{value:r[o++],done:!1}:{done:!0,value:void 0}}})},nr(i,[{key:"length",get:function(){return this[C].getArrayLength_()},set:function(o){this[C].setArrayLength_(o)}},{key:e,get:function(){return"Array"}}]),i})(Pu,Symbol.toStringTag,Symbol.iterator);Object.entries(Yn).forEach(function(t){var e=t[0],s=t[1];e!=="concat"&&sr(nd.prototype,e,s)});function Nu(t){return{enumerable:!1,configurable:!0,get:function(){return this[C].get_(t)},set:function(s){this[C].set_(t,s)}}}function Ef(t){ae(nd.prototype,""+t,Nu(t))}function Lu(t){if(t>Pr){for(var e=Pr;e<t+100;e++)Ef(e);Pr=t}}Lu(1e3);function Tf(t,e,s){return new nd(t,e,s)}function Zr(t,e){if(typeof t=="object"&&t!==null){if(pn(t))return e!==void 0&&N(23),t[C].atom_;if($s(t))return t.atom_;if(We(t)){if(e===void 0)return t.keysAtom_;var s=t.data_.get(e)||t.hasMap_.get(e);return s||N(25,e,Qr(t)),s}if(fn(t)){if(!e)return N(26);var i=t[C].values_.get(e);return i||N(27,e,Qr(t)),i}if(Jl(t)||cn(t)||kn(t))return t}else if(Qt(t)&&kn(t[C]))return t[C];N(28)}function Sf(t,e){if(t||N(29),Jl(t)||cn(t)||kn(t)||We(t)||$s(t))return t;if(t[C])return t[C];N(24,t)}function Qr(t,e){var s;if(e!==void 0)s=Zr(t,e);else{if(lr(t))return t.name;fn(t)||We(t)||$s(t)?s=Sf(t):s=Zr(t)}return s.name_}function Os(t){var e=As(),s=Ql(!0);Vt();try{return t()}finally{Bt(),td(s),Se(e)}}var Md=rn.toString;function Du(t,e,s){return s===void 0&&(s=-1),to(t,e,s)}function to(t,e,s,i,n){if(t===e)return t!==0||1/t===1/e;if(t==null||e==null)return!1;if(t!==t)return e!==e;var r=typeof t;if(r!=="function"&&r!=="object"&&typeof e!="object")return!1;var o=Md.call(t);if(o!==Md.call(e))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+t==""+e;case"[object Number]":return+t!=+t?+e!=+e:+t==0?1/+t===1/e:+t==+e;case"[object Date]":case"[object Boolean]":return+t==+e;case"[object Symbol]":return typeof Symbol<"u"&&Symbol.valueOf.call(t)===Symbol.valueOf.call(e);case"[object Map]":case"[object Set]":s>=0&&s++;break}t=jd(t),e=jd(e);var a=o==="[object Array]";if(!a){if(typeof t!="object"||typeof e!="object")return!1;var l=t.constructor,h=e.constructor;if(l!==h&&!(Qt(l)&&l instanceof l&&Qt(h)&&h instanceof h)&&"constructor"in t&&"constructor"in e)return!1}if(s===0)return!1;s<0&&(s=-1),i=i||[],n=n||[];for(var g=i.length;g--;)if(i[g]===t)return n[g]===e;if(i.push(t),n.push(e),a){if(g=t.length,g!==e.length)return!1;for(;g--;)if(!to(t[g],e[g],s-1,i,n))return!1}else{var v=Object.keys(t),b;if(g=v.length,Object.keys(e).length!==g)return!1;for(;g--;)if(b=v[g],!(Te(e,b)&&to(t[b],e[b],s-1,i,n)))return!1}return i.pop(),n.pop(),!0}function jd(t){return pn(t)?t.slice():mi(t)||We(t)||on(t)||$s(t)?Array.from(t.entries()):t}function Gi(t){return t[Symbol.iterator]=Cf,t}function Cf(){return this}["Symbol","Map","Set"].forEach(function(t){var e=Gc();typeof e[t]>"u"&&N("MobX requires global '"+t+"' to be available or polyfilled")});typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__=="object"&&__MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({spy:Gp,extras:{getDebugName:Qr},$mobx:C});function Af(t){return Nh(t,Xn)}class Ht extends Af(O){}var ot;(function(t){t.CONTAINS_ONE_OF="containsOneOf",t.CONTAINS_ALL_OF="containsAllOf"})(ot||(ot={}));var Z;(function(t){t.ALL_TIME="allTime",t.EXACT_DATE="exactDate",t.RANGE="range"})(Z||(Z={}));var Ee;(function(t){t.CONTAINS="contains",t.STARTS_WITH="startsWith",t.ENDS_WITH="endsWith",t.EQUALS="equals"})(Ee||(Ee={}));var Ce;(function(t){t.OCCURRED_AT="occurredAt",t.CREATED_AT="createdAt",t.DESC="desc"})(Ce||(Ce={}));var pe;(function(t){t.ASC="asc",t.DESC="desc"})(pe||(pe={}));var fe;(function(t){t.BEFORE="before",t.AFTER="after"})(fe||(fe={}));var ce;(function(t){t.MINUTE="minute",t.HOUR="hour",t.DAY="day"})(ce||(ce={}));var Be=(t=>(t.INPUT="input",t.LIST="list",t.MOCK="mock",t.ADMIN="admin",t))(Be||{});const Ru="input";let $n;const $f=new Uint8Array(16);function Of(){if(!$n&&($n=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!$n))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return $n($f)}const ct=[];for(let t=0;t<256;++t)ct.push((t+256).toString(16).slice(1));function If(t,e=0){return ct[t[e+0]]+ct[t[e+1]]+ct[t[e+2]]+ct[t[e+3]]+"-"+ct[t[e+4]]+ct[t[e+5]]+"-"+ct[t[e+6]]+ct[t[e+7]]+"-"+ct[t[e+8]]+ct[t[e+9]]+"-"+ct[t[e+10]]+ct[t[e+11]]+ct[t[e+12]]+ct[t[e+13]]+ct[t[e+14]]+ct[t[e+15]]}const wf=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Fd={randomUUID:wf};function xf(t,e,s){if(Fd.randomUUID&&!t)return Fd.randomUUID();t=t||{};const i=t.random||(t.rng||Of)();return i[6]=i[6]&15|64,i[8]=i[8]&63|128,If(i)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vd="lit-localize-status";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pf=(t,...e)=>({strTag:!0,strings:t,values:e}),Nf=Pf,Lf=t=>typeof t!="string"&&"strTag"in t,Df=(t,e,s)=>{let i=t[0];for(let n=1;n<t.length;n++)i+=e[n-1],i+=t[n];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rf=(t=>Lf(t)?Df(t.strings,t.values):t);let p=Rf;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Uf{constructor(e){this.__litLocalizeEventHandler=s=>{s.detail.status==="ready"&&this.host.requestUpdate()},this.host=e}hostConnected(){window.addEventListener(Vd,this.__litLocalizeEventHandler)}hostDisconnected(){window.removeEventListener(Vd,this.__litLocalizeEventHandler)}}const Mf=t=>t.addController(new Uf(t)),jf=Mf;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Is=()=>(t,e)=>(t.addInitializer(jf),t);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Ff{constructor(){this.settled=!1,this.promise=new Promise((e,s)=>{this._resolve=e,this._reject=s})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let t=0;t<256;t++)(t>>4&15).toString(16)+(t&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Vf=new Ff;Vf.resolve();var re;(function(t){t.BOOLEAN="boolean",t.NUMBER="number",t.TEXT="text",t.SELECT="select"})(re||(re={}));var ps;(function(t){t.PAGINATION="pagination",t.LEXICOLOGY="lexicology",t.AUTO_COMPLETE="autoComplete"})(ps||(ps={}));var V;(function(t){t.PAGINATION_TYPE="paginationType",t.PAGINATION_PAGE_SIZE="paginationPageSize",t.ENTITY_NAME_SINGULAR="entityNameSingular",t.ENTITY_NAME_PLURAL="entityNamePlural",t.TAG_SUGGESTIONS="tagSuggestions"})(V||(V={}));var Dt;(function(t){t.LAZY="lazy",t.NAVIGATION="navigation",t.MORE_BUTTON="moreButton"})(Dt||(Dt={}));var Ae;(function(t){t.DISABLED="disabled",t.ONLY_IN_LIST="onlyInList",t.ALL="all"})(Ae||(Ae={}));const Bf={[V.PAGINATION_TYPE]:{name:V.PAGINATION_TYPE,value:Dt.LAZY,control:{type:re.SELECT,options:Object.values(Dt)},group:ps.PAGINATION},[V.PAGINATION_PAGE_SIZE]:{name:V.PAGINATION_PAGE_SIZE,value:10,control:{type:re.NUMBER,min:1,max:100,step:1},group:ps.PAGINATION},[V.ENTITY_NAME_SINGULAR]:{name:V.ENTITY_NAME_SINGULAR,value:"action",control:{type:re.TEXT},group:ps.LEXICOLOGY},[V.ENTITY_NAME_PLURAL]:{name:V.ENTITY_NAME_PLURAL,value:"action",control:{type:re.TEXT},group:ps.LEXICOLOGY},[V.TAG_SUGGESTIONS]:{name:V.TAG_SUGGESTIONS,value:Ae.DISABLED,control:{type:re.SELECT,options:Object.values(Ae)},group:ps.AUTO_COMPLETE}},Gf={[V.PAGINATION_TYPE]:Dt.LAZY,[V.PAGINATION_PAGE_SIZE]:10,[V.ENTITY_NAME_SINGULAR]:"action",[V.ENTITY_NAME_PLURAL]:"actions",[V.TAG_SUGGESTIONS]:Ae.DISABLED};var ri=(t=>(t.V1="v1",t.V2="v2",t))(ri||{}),Hf=Object.defineProperty,Xf=Object.getOwnPropertyDescriptor,m=(t,e,s,i)=>{for(var n=i>1?void 0:i?Xf(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Hf(e,s,n),n};const Uu={tagging:{[ot.CONTAINS_ALL_OF]:[],[ot.CONTAINS_ONE_OF]:[]},includeUntagged:!0,includeAll:!0,includeAllTagging:!0,time:{type:Z.ALL_TIME},text:[]},Mu={property:Ce.OCCURRED_AT,direction:pe.DESC},ju={type:fe.BEFORE,quantity:1,unit:ce.DAY};class y{constructor(){this.entityConfigs=[],this.listItems=[],this.listEntities=[],this.contextListItems=[],this.contextListEntities={},this.actionSuggestions=[],this.tagSuggestions=[],this.loading=!1,this.listFilter=structuredClone(Uu),this.listSort=structuredClone(Mu),this.listSetting=Gf,this.advancedMode=!1,this.debugMode=!1,this.selectMode=!1,this.editListConfigMode=!1,this.selectListConfigMode=!1,this.selectedActions=[],this.forbidden=!1,this.authToken="",this.lastListUrl="",this.listConfigId="",this.listConfigs=[],this.listContextMode=!1,this.listContext=structuredClone(ju),this.entityListItems=[],this.version=ri.V1,this.collapsablePanelState={},df(this)}get listConfig(){return this.listConfigs.filter(e=>this.listConfigId===e.id)[0]}setActionSuggestions(e){this.actionSuggestions=e}setTagSuggestions(e){this.tagSuggestions=e}addTagSuggestions(e){this.tagSuggestions=[...this.tagSuggestions,...e]}removeTagSuggestions(e){this.tagSuggestions=[...this.tagSuggestions.filter(s=>!e.includes(s))]}setLoading(e){this.loading=e}setListFilterTagging(e,s){this.listFilter.tagging[e]=s}setListFilterIncludeUntagged(e){this.listFilter.includeUntagged=e}setListFilterIncludeAll(e){this.listFilter.includeAll=e}setListFilterTime(e){this.listFilter.time=e}setListFilter(e){this.listFilter=e}setListSetting(e){this.listSetting=e}setListConfigId(e){this.listConfigId&&this.removeTagSuggestions(this.listConfig.filter.tagging[ot.CONTAINS_ALL_OF]),this.listConfigId=e,this.listConfigId&&(this.setListFilter(this.listConfig.filter),this.setListSort(this.listConfig.sort),this.setListSetting(this.listConfig.setting))}setListConfigs(e){this.listConfigs=e}setAdvancedMode(e){this.advancedMode=e}setDebugMode(e){this.debugMode=e}setEditListConfigMode(e){this.editListConfigMode=e}setSelectListConfigMode(e){this.selectListConfigMode=e}setListSort(e){this.listSort=e}setSelectMode(e){this.selectMode=e}setSelectedActions(e){this.selectedActions=e}addActionToSelection(e){this.selectedActions=[...this.selectedActions.filter(s=>s!==e),e],this.selectMode=!0}removeActionFromSelection(e){this.selectedActions=[...this.selectedActions.filter(s=>s!==e)],this.selectMode=this.selectedActions.length>0}toggleActionSelection(e){this.selectedActions.includes(e)?this.removeActionFromSelection(e):this.addActionToSelection(e)}setListItems(e){this.listItems=e}setContextListItems(e){this.contextListItems=e}toggleSelectAll(){this.selectedActions=this.listItems.reduce((e,s)=>this.selectedActions.includes(s.id)?[...e]:[...e,s.id],[])}selectAll(){this.selectedActions=this.listItems.map(e=>e.id)}setListContextMode(e){this.listContextMode=e}setListContext(e){this.listContext=e}setSetting(e){this.listSetting={...this.listSetting,[e.name]:e.value}}setForbidden(e){this.forbidden=e}setAuthToken(e){this.authToken=e}setLastListUrl(e){this.lastListUrl=e}setVersion(e){this.version=e}setListEntities(e){this.listEntities=e}setContextListEntities(e){this.contextListEntities=e}setEntityConfigs(e){this.entityConfigs=e}setCollapsablePanelState(e,s){this.collapsablePanelState[e]=s}setCollapsableState(e){this.collapsablePanelState=e}}m([I],y.prototype,"entityConfigs",2);m([I],y.prototype,"listItems",2);m([I],y.prototype,"listEntities",2);m([I],y.prototype,"contextListItems",2);m([I],y.prototype,"contextListEntities",2);m([I],y.prototype,"actionSuggestions",2);m([I],y.prototype,"tagSuggestions",2);m([I],y.prototype,"loading",2);m([I],y.prototype,"listFilter",2);m([I],y.prototype,"listSort",2);m([I],y.prototype,"listSetting",2);m([I],y.prototype,"advancedMode",2);m([I],y.prototype,"debugMode",2);m([I],y.prototype,"selectMode",2);m([I],y.prototype,"editListConfigMode",2);m([I],y.prototype,"selectListConfigMode",2);m([I],y.prototype,"selectedActions",2);m([I],y.prototype,"forbidden",2);m([I],y.prototype,"authToken",2);m([I],y.prototype,"lastListUrl",2);m([I],y.prototype,"listConfigId",2);m([I],y.prototype,"listConfigs",2);m([I],y.prototype,"listContextMode",2);m([I],y.prototype,"listContext",2);m([I],y.prototype,"entityListItems",2);m([I],y.prototype,"version",2);m([I],y.prototype,"collapsablePanelState",2);m([$],y.prototype,"setActionSuggestions",1);m([$],y.prototype,"setTagSuggestions",1);m([$],y.prototype,"addTagSuggestions",1);m([$],y.prototype,"removeTagSuggestions",1);m([$],y.prototype,"setLoading",1);m([$],y.prototype,"setListFilterTagging",1);m([$],y.prototype,"setListFilterIncludeUntagged",1);m([$],y.prototype,"setListFilterIncludeAll",1);m([$],y.prototype,"setListFilterTime",1);m([$],y.prototype,"setListFilter",1);m([$],y.prototype,"setListSetting",1);m([$],y.prototype,"setListConfigId",1);m([$],y.prototype,"setListConfigs",1);m([$],y.prototype,"setAdvancedMode",1);m([$],y.prototype,"setDebugMode",1);m([$],y.prototype,"setEditListConfigMode",1);m([$],y.prototype,"setSelectListConfigMode",1);m([$],y.prototype,"setListSort",1);m([$],y.prototype,"setSelectMode",1);m([$],y.prototype,"setSelectedActions",1);m([$],y.prototype,"addActionToSelection",1);m([$],y.prototype,"removeActionFromSelection",1);m([$],y.prototype,"toggleActionSelection",1);m([$],y.prototype,"setListItems",1);m([$],y.prototype,"setContextListItems",1);m([$],y.prototype,"toggleSelectAll",1);m([$],y.prototype,"selectAll",1);m([$],y.prototype,"setListContextMode",1);m([$],y.prototype,"setListContext",1);m([$],y.prototype,"setSetting",1);m([$],y.prototype,"setForbidden",1);m([$],y.prototype,"setAuthToken",1);m([$],y.prototype,"setLastListUrl",1);m([$],y.prototype,"setVersion",1);m([$],y.prototype,"setListEntities",1);m([$],y.prototype,"setContextListEntities",1);m([$],y.prototype,"setEntityConfigs",1);m([$],y.prototype,"setCollapsablePanelState",1);m([$],y.prototype,"setCollapsableState",1);const gt=new y,kf={apiUrl:""},Yf=[202,204],zf=[200,201,202,204];class qf{constructor(e){this.config=e,this.authToken=e.authToken}async httpRequest(e,s){let i;const n=new Headers(s.headers);n.append("authorization",this.authToken);const r=new AbortController,o=new URL(e,this.config.baseUrl),a=new Request(o,{...s,headers:n,signal:r.signal});try{const l=await fetch(a);return l.ok&&!Yf.includes(l.status)&&(i=await l.json()),l.status===403&&this.config.errorHandler(),{status:l.status,isOk:zf.includes(l.status),response:i}}catch(l){console.error(`Api encountered an error performing request: ${l}`)}return null}async get(e,s){return await this.httpRequest(e,{method:"get",...s})}async post(e,s,i){return await this.httpRequest(e,{method:"post",headers:{"content-type":"application/json"},body:JSON.stringify(s),...i})}async put(e,s,i){return await this.httpRequest(e,{method:"put",headers:{"content-type":"application/json"},body:JSON.stringify(s),...i})}async delete(e,s){return await this.httpRequest(e,{method:"delete",...s})}setAuthToken(e){this.authToken=e}}const P=new qf({authToken:"",baseUrl:kf.apiUrl,errorHandler:()=>{gt.setForbidden(!0)}});class Wf{async getListConfigs(){const e=await P.get("listConfig");return e?Promise.resolve(e.response.listConfigs):Promise.reject()}async saveListConfig(e){await P.put(`listConfig/${e.id}`,e)}async addListConfig(){const e=await P.post("listConfig",{name:p("Config name")});return e?e.response.id:""}async deleteListConfig(e){return!!await P.delete(`listConfig/${e}`)}async saveSetting(e,s){const i=await P.put(`setting/${e}`,s);return!!(i&&i.isOk)}async addEntityConfig(e){const s=await P.post("entityConfig",e);return!!(s&&s.isOk)}async updateEntityConfig(e){const s=await P.put(`entityConfig/${e.id}`,e);return!!(s&&s.isOk)}async getEntityConfigs(){const e=await P.get("entityConfig");return e&&e.isOk?Promise.resolve(e.response.entityConfigs):Promise.reject()}async deleteEntityConfig(e){const s=await P.delete(`entityConfig/${e}`);return!!(s&&s.isOk)}async deletePropertyConfig(e,s){const i=await P.delete(`propertyConfig/${e}/${s}`);return!!(i&&i.isOk)}async addPropertyConfig(e){const{id:s,entityConfigId:i,...n}=e,r=await P.post(`propertyConfig/${i}`,n);return r&&r.isOk?r.response:null}async updatePropertyConfig(e){const{id:s,entityConfigId:i,...n}=e,r=await P.put(`propertyConfig/${i}/${s}`,n);return r&&r.isOk?r.response:null}}const Kf=new Wf;var D=(t=>(t.ACTIVE_LIST_FILTER_KEY="listFilter",t.LIST_FILTERS_KEY="listFilters",t.VIEW_KEY="view",t.ADVANCED_MODE_KEY="advancedMode",t.DEBUG_MODE_KEY="debugMode",t.LIST_CONFIGS_KEY="listConfigs",t.LIST_CONTEXT_MODE="listContextMode",t.LIST_CONTEXT="listContext",t.ACTIVE_LIST_CONFIG_ID="activeListConfigId",t.AUTH_TOKEN_KEY="authToken",t.VERSION="version",t.WINDOW_SCROLL_POSITION="windowScrollPosition",t.COLLAPSABLE_PANEL_STATE="collapsablePanelState",t))(D||{}),Jf=Object.defineProperty,Zf=Object.getOwnPropertyDescriptor,Xt=(t,e,s,i)=>{for(var n=Zf(e,s),r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=o(e,s,n)||n);return n&&Jf(e,s,n),n};const Bd=[Kf];function kt(){return function(t,e,s){for(let i=0;i<Bd.length;i++){const n=Bd[i];if(Object.getOwnPropertyNames(Object.getPrototypeOf(n)).includes(e)){const o=e;if(!n||!n[o])return;s.value=n[o]}}}}class Mt{async saveFilter(e,s){const i=this.getSavedFilters(),n=await this.digestMessage(JSON.stringify(e));localStorage.setItem(D.LIST_FILTERS_KEY,JSON.stringify([...i.filter(r=>r.id!==n),{filter:e,id:n,name:s}]))}getSavedFilters(){let e=[];try{const s=localStorage.getItem(D.LIST_FILTERS_KEY);s&&(e=JSON.parse(s))}catch(s){console.error(`Encountered an error while trying to load filters from storage: ${JSON.stringify(s)}`)}return e}deleteSavedFilter(e){const s=this.getSavedFilters();localStorage.setItem(D.LIST_FILTERS_KEY,JSON.stringify([...s.filter(i=>i.id!==e)]))}saveActiveFilter(e){localStorage.setItem(D.ACTIVE_LIST_FILTER_KEY,JSON.stringify(e))}saveView(e){localStorage.setItem(D.VIEW_KEY,e)}getSavedView(){let e=Ru;try{const s=localStorage.getItem(D.VIEW_KEY);s&&(e=s)}catch(s){console.error(`Encountered an error while trying to load view: ${JSON.stringify(s)}`)}return e}saveAdvancedMode(e){localStorage.setItem(D.ADVANCED_MODE_KEY,e?"1":"0")}saveDebugMode(e){localStorage.setItem(D.DEBUG_MODE_KEY,e?"1":"0")}getAdvancedMode(){let e=!1;try{const s=localStorage.getItem(D.ADVANCED_MODE_KEY);s&&(e=s==="1")}catch(s){console.error(`Encountered an error while trying to advanced mode: ${JSON.stringify(s)}`)}return e}getDebugMode(){let e=!1;try{const s=localStorage.getItem(D.DEBUG_MODE_KEY);s&&(e=s==="1")}catch(s){console.error(`Encountered an error while trying to debug mode: ${JSON.stringify(s)}`)}return e}async digestMessage(e){const s=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return Array.from(new Uint8Array(s)).map(n=>n.toString(16).padStart(2,"0")).join("")}async getListConfigs(){let e=[];try{const s=localStorage.getItem(D.LIST_CONFIGS_KEY);s&&(e=JSON.parse(s))}catch(s){console.error(`Encountered an error while trying to load list configurations from storage: ${JSON.stringify(s)}`)}return Promise.resolve(e)}async saveListConfig(e){const s=await this.getListConfigs();localStorage.setItem(D.LIST_CONFIGS_KEY,JSON.stringify(s.map(i=>e.id===i.id?e:i)))}async addListConfig(){const e=xf(),s={id:e,name:p("Config Name"),filter:Uu,sort:Mu},i=await this.getListConfigs();return localStorage.setItem(D.LIST_CONFIGS_KEY,JSON.stringify([...i,s])),e}async deleteListConfig(e){const s=await this.getListConfigs();return localStorage.setItem(D.LIST_CONFIGS_KEY,JSON.stringify(s.filter(i=>e!==i.id))),Promise.resolve(!0)}saveListContextMode(e){localStorage.setItem(D.LIST_CONTEXT_MODE,e?"1":"0")}getListContextMode(){let e=!1;try{const s=localStorage.getItem(D.LIST_CONTEXT_MODE);s&&(e=s==="1")}catch(s){console.error(`Encountered an error while trying to load list context mode from storage: ${JSON.stringify(s)}`)}return e}saveListContext(e){localStorage.setItem(D.LIST_CONTEXT,JSON.stringify(e))}getListContext(){let e=ju;try{const s=localStorage.getItem(D.LIST_CONTEXT);s&&(e=JSON.parse(s))}catch(s){console.error(`Encountered an error while trying to load list context from storage: ${JSON.stringify(s)}`)}return e}saveActiveListConfigId(e){localStorage.setItem(D.ACTIVE_LIST_CONFIG_ID,e)}getActiveListConfigId(){let e="";try{const s=localStorage.getItem(D.ACTIVE_LIST_CONFIG_ID);s&&(e=s)}catch(s){console.error(`Encountered an error while trying to load active list config ID from storage: ${JSON.stringify(s)}`)}return e}setAuthToken(e){localStorage.setItem(D.AUTH_TOKEN_KEY,e)}getAuthToken(){let e="";try{const s=localStorage.getItem(D.AUTH_TOKEN_KEY);s&&(e=s)}catch(s){console.error(`Encountered an error while trying to get authToken: ${JSON.stringify(s)}`)}return e}async saveSetting(e,s){return Promise.resolve(!0)}getVersion(){try{const e=localStorage.getItem(D.VERSION);if(e)return e}catch(e){console.error(`Encountered an error while trying to get version from storage: ${JSON.stringify(e)}`)}return ri.V1}saveVersion(e){localStorage.setItem(D.VERSION,e)}setWindowScrollPosition(e,s){localStorage.setItem(D.WINDOW_SCROLL_POSITION,JSON.stringify({x:e,y:s}))}getWindowScrollPosition(){let e={x:0,y:0};try{const s=localStorage.getItem(D.WINDOW_SCROLL_POSITION);s&&(e=JSON.parse(s))}catch(s){console.error(`Encountered an error while trying to load window scroll position from storage: ${JSON.stringify(s)}`)}return e}getCollapsablePanelState(){let e={};try{const s=localStorage.getItem(D.COLLAPSABLE_PANEL_STATE);s&&(e=JSON.parse(s))}catch(s){console.error(`Encountered an error while trying to load collapsable panel state from storage: ${JSON.stringify(s)}`)}return e}setCollapsablePanelState(e){localStorage.setItem(D.COLLAPSABLE_PANEL_STATE,JSON.stringify(e))}async addEntityConfig(e){return Promise.resolve(!0)}async updateEntityConfig(e){return Promise.resolve(!0)}async getEntityConfigs(){return Promise.resolve([])}async deleteEntityConfig(e){return Promise.resolve(!0)}async deletePropertyConfig(e,s){return Promise.resolve(!0)}async addPropertyConfig(e){return Promise.resolve(null)}async updatePropertyConfig(e){return Promise.resolve(null)}}Xt([kt()],Mt.prototype,"getListConfigs");Xt([kt()],Mt.prototype,"saveListConfig");Xt([kt()],Mt.prototype,"addListConfig");Xt([kt()],Mt.prototype,"deleteListConfig");Xt([kt()],Mt.prototype,"saveSetting");Xt([kt()],Mt.prototype,"addEntityConfig");Xt([kt()],Mt.prototype,"updateEntityConfig");Xt([kt()],Mt.prototype,"getEntityConfigs");Xt([kt()],Mt.prototype,"deleteEntityConfig");Xt([kt()],Mt.prototype,"deletePropertyConfig");Xt([kt()],Mt.prototype,"addPropertyConfig");Xt([kt()],Mt.prototype,"updatePropertyConfig");const w=new Mt;var f=(t=>(t.BOOLEAN="boolean",t.NUMBER="number",t.TEXT="text",t.SELECT="select",t.HIDDEN="hidden",t.IMAGE="image",t))(f||{}),eo=(t=>(t.ACTIVE="active",t))(eo||{});const Qf={active:{default:Be.INPUT,control:{type:f.TEXT},description:"The active view"}},H=A`
  :host {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
    --unsynced-color: #666;
    --unsynced-background-color: #c4c4c4;
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  select,
  button {
    font-family: Poppins;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%;
  }
  main {
    margin-top: 1rem;
  }

  fieldset {
    border-radius: 0.5rem;
  }

  .box {
    background-color: #fff;
    border-radius: 8px;
    border: 1px #aaa solid;
  }

  .unsynced {
    color: var(--unsynced-color);
    background-color: var(--unsynced-background-color);
    border: 1px solid var(--unsynced-color);
  }
`;var tg=Object.defineProperty,eg=Object.getOwnPropertyDescriptor,Fu=(t,e,s,i)=>{for(var n=i>1?void 0:i?eg(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&tg(e,s,n),n},so,Gd;const Vu=[{id:Be.INPUT,label:p("New")},{id:Be.LIST,label:p("List")}];[...Vu,(Be.ADMIN,p("Admin"))];let qn=class extends(Gd=Ht,so=eo.ACTIVE,Gd){constructor(){super(...arguments),this.state=gt,this[so]=Qf[eo.ACTIVE].default}get displayViews(){return Vu}setActiveView(t){this.dispatchEvent(new CustomEvent("view-changed",{bubbles:!0,composed:!0,detail:t}))}setVersion(t){const e=t.detail.value;this.state.setVersion(e),w.saveVersion(e)}render(){return c`
      ${this.state.debugMode?c` <ss-select
            @select-changed=${t=>this.setVersion(t)}
            selected=${this.state.version}
            .options=${[{value:ri.V1,label:p("v1 (classic)")},{value:ri.V2,label:p("v2 (experimental)")}]}
          >
          </ss-select>`:S}
      <nav
        class="box"
        style="--num-views: ${this.displayViews.length}"
        data-debug=${this.state.debugMode}
      >
        ${this.displayViews.map(t=>c`<span
              @click="${()=>{this.setActiveView(t.id)}}"
              class=${this.active===t.id?"active":""}
              >${t.label}</span
            >`)}
      </nav>
    `}};qn.styles=[H,A`
      .box {
        overflow: hidden;
      }

      nav span {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        width: calc(100% / var(--num-views));
        text-align: center;
        background-color: #ececec;
        cursor: pointer;
      }

      nav span.active {
        background-color: #fff;
      }
    `];Fu([u()],qn.prototype,so,2);qn=Fu([T("page-nav")],qn);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bu={ATTRIBUTE:1,CHILD:2},Gu=t=>(...e)=>({_$litDirective$:t,values:e});class Hu{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,i){this._$Ct=e,this._$AM=s,this._$Ci=i}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=Gu(class extends Hu{constructor(t){var e;if(super(t),t.type!==Bu.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,n;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(const r in e)e[r]&&!((i=this.nt)!=null&&i.has(r))&&this.st.add(r);return this.render(e)}const s=t.element.classList;for(const r of this.st)r in e||(s.remove(r),this.st.delete(r));for(const r in e){const o=!!e[r];o===this.st.has(r)||(n=this.nt)!=null&&n.has(r)||(o?(s.add(r),this.st.add(r)):(s.remove(r),this.st.delete(r)))}return Ge}});var Fs=(t=>(t.TEXT="text",t.DATE="date",t.DATETIME_LOCAL="datetime-local",t))(Fs||{});class ue{static dateString(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}static dateTime(e){const s=new Date(e*1e3);return`${ue.dateString(s)}T${String(s.getHours()).padStart(2,"0")}:${String(s.getMinutes()).padStart(2,"0")}`}static formatDate(e){return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}static formatDateTime(e){return`${ue.formatDate(e)}T${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}}var Tt=(t=>(t.ACTION_ID="actionId",t.TYPE="type",t.DESC="desc",t.OCCURRED_AT="occurredAt",t.TAGS="tags",t.TAG_VALUE="tagValue",t.PROPERTIES="properties",t))(Tt||{});const ns={actionId:{default:0,control:{type:f.NUMBER},description:"The ID of the action"},type:{default:0,control:{type:f.NUMBER},description:"The type of the action"},desc:{default:"",control:{type:f.TEXT},description:"The description of the action"},occurredAt:{default:"",control:{type:f.TEXT},description:"The occurrence date of the action"},tags:{default:[],control:{type:f.TEXT},description:"The tags of the action"},tagValue:{default:"",control:{type:f.TEXT},description:"The value of the tag"},properties:{default:[],control:{type:f.TEXT},description:"The properties of the action"}};var io=(t=>(t.TAG="tag",t.ACTION="action",t))(io||{});const sg="view-ready";class ig extends CustomEvent{constructor(e){super(sg,{detail:e,bubbles:!0,composed:!0})}}class gn extends Ht{constructor(){super(...arguments),this._ready=!1}set ready(e){this._ready!==e&&(this.dispatchEvent(new ig({})),this._ready=e)}get ready(){return this._ready}sync(e=!1){}}var Hi;(function(t){t.PADDED="padded"})(Hi||(Hi={}));const ng={[Hi.PADDED]:{default:!1,description:"Whether to provide padding around the loader",control:"boolean"}};var rd=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},no,Bs;let Wn=(Bs=class extends O{constructor(){super(...arguments),this[no]=ng[Hi.PADDED].default}get classes(){return{container:!0,padded:this.padded}}render(){return c`<div class=${Q(this.classes)}>
      <span class="loader"></span>
    </div>`}},no=Hi.PADDED,Bs.styles=A`
    .container {
      text-align: center;
      height: 16px;
    }

    .container.padded {
      margin: 1rem;
    }

    .loader {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #000;
      box-shadow:
        32px 0 #000,
        -32px 0 #000;
      position: relative;
      animation: flash 0.5s ease-out infinite alternate;
      transform: skewX(50%);
    }

    @keyframes flash {
      0% {
        background-color: #0002;
        box-shadow:
          32px 0 #0002,
          -32px 0 #000;
      }
      50% {
        background-color: #000;
        box-shadow:
          32px 0 #0002,
          -32px 0 #0002;
      }
      100% {
        background-color: #0002;
        box-shadow:
          32px 0 #000,
          -32px 0 #0002;
      }
    }
  `,Bs);rd([u({type:Boolean})],Wn.prototype,no,void 0);rd([d()],Wn.prototype,"classes",null);Wn=rd([T("ss-loader")],Wn);const Pt=A`
  :host {
    --negative-color: #600;
    --negative-background-color: #ffc4c4;
    --positive-color: #060;
    --positive-background-color: #c4ffc4;
  }

  input[type='text'],
  input[type='date'],
  input[type='datetime-local'],
  input[type='password'],
  input[type='number'],
  select,
  button {
    font-family: Poppins;
    padding: 0.5rem;
    box-sizing: border-box;
    width: 100%;
  }
  main {
    margin-top: 1rem;
  }

  fieldset {
    border-radius: 0.5rem;
  }

  .box {
    background-color: #fff;
    border-radius: 8px;
    border: 1px #aaa solid;
  }
`;var xt;(function(t){t.TEXT="text",t.DISABLED="disabled",t.LOADING="loading",t.POSITIVE="positive",t.NEGATIVE="negative",t.CLASS="class"})(xt||(xt={}));xt.TEXT+"",xt.DISABLED+"",xt.LOADING+"",xt.POSITIVE+"",xt.NEGATIVE+"",xt.CLASS+"";var Ke=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},ro,oo,ao,lo,co,uo,Gs;let $e=(Gs=class extends O{constructor(){super(...arguments),this[ro]="",this[oo]=!1,this[ao]=!1,this[lo]=!1,this[co]=!1,this[uo]="",this.handleClick=e=>{this.dispatchEvent(new CustomEvent("ss-button-clicked",{bubbles:!0,composed:!0}))}}get classes(){const e={loading:this.loading,disabled:this.disabled,positive:this.positive,negative:this.negative};return this.class.split(" ").forEach(s=>{e[s]=!0}),e}render(){return c`
      <button
        class=${Q(this.classes)}
        @click=${this.handleClick}
        ?disabled=${this.disabled}
        part="button"
      >
        ${this.loading?c` <ss-loader></ss-loader> `:this.text?this.text:c`<slot></slot>`}
      </button>
    `}},ro=xt.TEXT,oo=xt.DISABLED,ao=xt.LOADING,lo=xt.POSITIVE,co=xt.NEGATIVE,uo=xt.CLASS,Gs.styles=[Pt,A`
      button {
        border-radius: 0.5rem;

        &.loading {
          min-width: 100px;
        }

        &.positive {
          background-color: var(--positive-background-color);
          color: var(--positive-color);
          border-color: var(--positive-color);
        }

        &.negative {
          background-color: var(--negative-background-color);
          color: var(--negative-color);
          border-color: var(--negative-color);
        }

        &.disabled {
          opacity: 0.5;
        }
      }
    `],Gs);Ke([u()],$e.prototype,ro,void 0);Ke([u({type:Boolean})],$e.prototype,oo,void 0);Ke([u({type:Boolean})],$e.prototype,ao,void 0);Ke([u({type:Boolean})],$e.prototype,lo,void 0);Ke([u({type:Boolean})],$e.prototype,co,void 0);Ke([u()],$e.prototype,uo,void 0);Ke([d()],$e.prototype,"classes",null);$e=Ke([T("ss-button")],$e);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vs=t=>t??S;var Kn;(function(t){t.TEXT="text",t.DATE="date",t.DATETIME_LOCAL="datetime-local",t.PASSWORD="password",t.NUMBER="number"})(Kn||(Kn={}));var M;(function(t){t.TYPE="type",t.VALUE="value",t.AUTO_COMPLETE="autoComplete",t.PLACEHOLDER="placeholder",t.SUGGESTIONS="suggestions",t.MIN="min",t.MAX="max",t.STEP="step"})(M||(M={}));const Pe={[M.TYPE]:{default:Kn.TEXT,description:"What form element type the input behaves as",control:"text"},[M.VALUE]:{default:"",description:"The value as set from the data model",control:"text"},[M.AUTO_COMPLETE]:{default:!1,description:"Should the field provide auto-completion suggestions",control:"boolean"},[M.PLACEHOLDER]:{default:"",description:"Text to display in the field when no value is present",control:"text"},[M.SUGGESTIONS]:{default:[],description:"An array of suggestions used for auto-completion",control:"text"},[M.MIN]:{default:0,description:"The minimum value for a number input",control:"number"},[M.MAX]:{default:100,description:"The maximum value for a number input",control:"number"},[M.STEP]:{default:1,description:"The step value for a number input",control:"number"}},rg="input-changed";class Nr extends CustomEvent{constructor(e){super(rg,{bubbles:!0,composed:!0,detail:e})}}const og="input-submitted";class ag extends CustomEvent{constructor(e){super(og,{bubbles:!0,composed:!0,detail:e})}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:lg}=Oh,Hd=()=>document.createComment(""),Oi=(t,e,s)=>{var r;const i=t._$AA.parentNode,n=e===void 0?t._$AB:e._$AA;if(s===void 0){const o=i.insertBefore(Hd(),n),a=i.insertBefore(Hd(),n);s=new lg(o,a,t,t.options)}else{const o=s._$AB.nextSibling,a=s._$AM,l=a!==t;if(l){let h;(r=s._$AQ)==null||r.call(s,t),s._$AM=t,s._$AP!==void 0&&(h=t._$AU)!==a._$AU&&s._$AP(h)}if(o!==n||l){let h=s._$AA;for(;h!==o;){const g=h.nextSibling;i.insertBefore(h,n),h=g}}}return s},rs=(t,e,s=t)=>(t._$AI(e,s),t),dg={},cg=(t,e=dg)=>t._$AH=e,ug=t=>t._$AH,Lr=t=>{t._$AR(),t._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xd=(t,e,s)=>{const i=new Map;for(let n=e;n<=s;n++)i.set(t[n],n);return i},z=Gu(class extends Hu{constructor(t){if(super(t),t.type!==Bu.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,s){let i;s===void 0?s=e:e!==void 0&&(i=e);const n=[],r=[];let o=0;for(const a of t)n[o]=i?i(a,o):o,r[o]=s(a,o),o++;return{values:r,keys:n}}render(t,e,s){return this.dt(t,e,s).values}update(t,[e,s,i]){const n=ug(t),{values:r,keys:o}=this.dt(e,s,i);if(!Array.isArray(n))return this.ut=o,r;const a=this.ut??(this.ut=[]),l=[];let h,g,v=0,b=n.length-1,x=0,F=r.length-1;for(;v<=b&&x<=F;)if(n[v]===null)v++;else if(n[b]===null)b--;else if(a[v]===o[x])l[x]=rs(n[v],r[x]),v++,x++;else if(a[b]===o[F])l[F]=rs(n[b],r[F]),b--,F--;else if(a[v]===o[F])l[F]=rs(n[v],r[F]),Oi(t,l[F+1],n[v]),v++,F--;else if(a[b]===o[x])l[x]=rs(n[b],r[x]),Oi(t,n[v],n[b]),b--,x++;else if(h===void 0&&(h=Xd(o,x,F),g=Xd(a,v,b)),h.has(a[v]))if(h.has(a[b])){const tt=g.get(o[x]),$t=tt!==void 0?n[tt]:null;if($t===null){const es=Oi(t,n[v]);rs(es,r[x]),l[x]=es}else l[x]=rs($t,r[x]),Oi(t,n[v],$t),n[tt]=null;x++}else Lr(n[b]),b--;else Lr(n[v]),v++;for(;x<=F;){const tt=Oi(t,l[F+1]);rs(tt,r[x]),l[x++]=tt}for(;v<=b;){const tt=n[v++];tt!==null&&Lr(tt)}return this.ut=o,cg(t,l),Ge}}),hg="suggestion-changed";class pg extends CustomEvent{constructor(e){super(hg,{bubbles:!0,composed:!0,detail:e})}}const fg="suggestion-submitted";class gg extends CustomEvent{constructor(e){super(fg,{bubbles:!0,composed:!0,detail:e})}}var It;(function(t){t.INPUT="input",t.MAX_MATCHES="maxMatches",t.MIN_INPUT="minInput",t.SUGGESTIONS="suggestions"})(It||(It={}));const On={[It.INPUT]:{default:"",control:"text",description:"The input value"},[It.MAX_MATCHES]:{default:5,control:"number",description:"The maximum number of suggestions to display"},[It.MIN_INPUT]:{default:1,control:"number",description:"The minimum number of characters to start showing suggestions"},[It.SUGGESTIONS]:{default:[],control:"text",description:"The list of suggestions to display"}};var ws=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},ho,po,fo,go,Hs;let Xe=(Hs=class extends O{constructor(){super(...arguments),this[ho]=On[It.INPUT].default,this[po]=On[It.MIN_INPUT].default,this[fo]=On[It.MAX_MATCHES].default,this[go]=On[It.SUGGESTIONS].default,this.selectedIndex=-1}get show(){return this.suggestions.length>0&&this.input.length>=this.minInput}get maxSelectedIndex(){return this.suggestions.length-1}connectedCallback(){super.connectedCallback(),this.addEventListener("select-up",()=>{this.adjustSelectedIndex(-1)}),this.addEventListener("select-down",()=>{this.adjustSelectedIndex(1)}),this.addEventListener("select",()=>{this.suggestions.length&&this.selectedIndex!==-1?this.sendSelectedEvent(this.suggestions[this.selectedIndex]):this.sendSubmitEvent()})}adjustSelectedIndex(e){let s=this.selectedIndex+e;s<-1&&(s=this.maxSelectedIndex),s>this.maxSelectedIndex&&(s=-1),this.selectedIndex=s}sendSelectedEvent(e){this.dispatchEvent(new pg({value:e}))}sendSubmitEvent(){this.dispatchEvent(new gg({selectedIndex:this.selectedIndex}))}render(){return c`
      <div>
        ${this.show?c` <ul class="box">
              ${z(this.suggestions,e=>e,(e,s)=>c`
                  <li
                    class=${s===this.selectedIndex?"selected":""}
                    @mouseover=${()=>this.selectedIndex=s}
                    @click=${()=>this.sendSelectedEvent(e)}
                  >
                    ${e}
                  </li>
                `)}
            </ul>`:S}
      </div>
    `}},ho=It.INPUT,po=It.MIN_INPUT,fo=It.MAX_MATCHES,go=It.SUGGESTIONS,Hs.styles=[Pt,A`
      div {
        position: relative;
      }

      ul {
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        overflow: hidden;
      }

      li {
        padding: 0.5rem;
        background-color: #fff;
        transition: all 0.2s;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 2rem;
        line-height: 2rem;
        color: #888;
        text-align: left;
      }

      li.selected {
        color: #000;
        background-color: #ddd;
      }
    `],Hs);ws([u()],Xe.prototype,ho,void 0);ws([u({type:Number})],Xe.prototype,po,void 0);ws([u({type:Number})],Xe.prototype,fo,void 0);ws([u({type:Array})],Xe.prototype,go,void 0);ws([d()],Xe.prototype,"selectedIndex",void 0);ws([d()],Xe.prototype,"show",null);Xe=ws([T("ss-input-auto")],Xe);var yt=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},vo,_o,yo,mo,bo,Xu,ku,Yu,Xs;let ut=(Xs=class extends O{constructor(){super(...arguments),this.clickFocusHandler=e=>{},this[vo]=Pe[M.TYPE].default,this[_o]=Pe[M.VALUE].default,this[yo]=Pe[M.AUTO_COMPLETE].default,this[mo]=Pe[M.PLACEHOLDER].default,this[bo]=Pe[M.SUGGESTIONS].default,this._value=this.value,this.hasFocus=!1,this.autoDismissed=!1,this.handleChange=e=>{let s="";return e.target instanceof HTMLInputElement&&(s=e.target.value),this._value=s,e.target instanceof HTMLInputElement&&(e.target.value=this._value),e.preventDefault(),!1},this.handleKeyDown=e=>{if(e.target instanceof HTMLInputElement)switch(e.code){case"Tab":this.autoDismissed=!0;return;case"ArrowUp":this.sendSuggestionUpEvent(e);return;case"ArrowDown":this.sendSuggestionDownEvent(e);return;case"Enter":this.showAutoComplete?this.sendSuggestionSelectEvent():this.sendSubmittedEvent(),e.preventDefault();return}},this.handleInput=e=>{let s="";return e.target instanceof HTMLInputElement&&(s=e.target.value),this.dispatchEvent(new Nr({value:s})),this._value=s,this.autoDismissed=!1,!0},this.handleFocus=e=>{this.hasFocus=!0,this.autoDismissed=!1},this.handleBlur=e=>{setTimeout(()=>{this.hasFocus=!1},200)},this.suggestionSelectHandler=e=>{this.autoDismissed=!0,this.inputField.value=e.detail.value,this.inputField.dispatchEvent(new Nr({value:e.detail.value}))}}get showAutoComplete(){return this.autoComplete&&!this.autoDismissed&&this.value.length>0}connectedCallback(){super.connectedCallback(),this.clickFocusHandler=e=>{e.composedPath().includes(this.container)||(this.autoDismissed=!0),this.type===Kn.NUMBER&&(this.min=Pe[M.MIN].default,this.max=Pe[M.MAX].default,this.step=Pe[M.STEP].default)},window.addEventListener("mousedown",this.clickFocusHandler)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousedown",this.clickFocusHandler)}updated(e){super.updated(e),e.has("value")&&(this.inputField.value=this.value)}focus(){this.inputField.focus()}clear(){this.inputField.value="",this.dispatchEvent(new Nr({value:""}))}sendSuggestionUpEvent(e){this.autoCompleteNode&&(this.autoCompleteNode.dispatchEvent(new CustomEvent("select-up")),e.preventDefault())}sendSuggestionDownEvent(e){this.autoCompleteNode&&(this.autoCompleteNode.dispatchEvent(new CustomEvent("select-down")),e.preventDefault())}sendSuggestionSelectEvent(){this.autoCompleteNode&&this.autoCompleteNode.dispatchEvent(new CustomEvent("select"))}sendSubmittedEvent(){this.inputField.dispatchEvent(new ag({value:this._value}))}handleSubmit(){this.sendSubmittedEvent()}render(){return c`
      <span part="container">
        <input
          part="input"
          type=${this.type}
          value=${this.value}
          @change=${this.handleChange}
          @keydown=${this.handleKeyDown}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          placeholder=${this.placeholder}
          min=${Vs(this.min)}
          max=${Vs(this.max)}
          step=${Vs(this.step)}
          autocomplete="off"
          autocapitalize="off"
        />
        ${this.showAutoComplete?c`
              <ss-input-auto
                input=${this._value}
                .suggestions=${this.suggestions}
                @suggestion-submitted=${this.handleSubmit}
                @suggestion-changed=${this.suggestionSelectHandler}
              ></ss-input-auto>
            `:S}
      </span>
    `}},vo=M.TYPE,_o=M.VALUE,yo=M.AUTO_COMPLETE,mo=M.PLACEHOLDER,bo=M.SUGGESTIONS,Xu=M.MIN,ku=M.MAX,Yu=M.STEP,Xs.styles=[Pt,A`
      input:focus {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
    `],Xs);yt([u()],ut.prototype,vo,void 0);yt([u()],ut.prototype,_o,void 0);yt([u({type:Boolean})],ut.prototype,yo,void 0);yt([u()],ut.prototype,mo,void 0);yt([u({type:Array})],ut.prototype,bo,void 0);yt([u({type:Number,reflect:!0})],ut.prototype,Xu,void 0);yt([u({type:Number,reflect:!0})],ut.prototype,ku,void 0);yt([u({type:Number,reflect:!0})],ut.prototype,Yu,void 0);yt([d()],ut.prototype,"_value",void 0);yt([ft("input")],ut.prototype,"inputField",void 0);yt([ft("ss-input-auto")],ut.prototype,"autoCompleteNode",void 0);yt([ft("span")],ut.prototype,"container",void 0);yt([d()],ut.prototype,"hasFocus",void 0);yt([d()],ut.prototype,"autoDismissed",void 0);yt([d()],ut.prototype,"showAutoComplete",null);ut=yt([T("ss-input")],ut);const vg="select-changed";class _g extends CustomEvent{constructor(e){super(vg,{bubbles:!0,composed:!0,detail:e})}}var Ue;(function(t){t.OPTIONS="options",t.SELECTED="selected"})(Ue||(Ue={}));const kd={[Ue.OPTIONS]:{default:[],description:"The options to display in the select",control:"text"},[Ue.SELECTED]:{default:"",description:"The value of the selected option",control:"text"}};var dr=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},Eo,To,ks;let Xi=(ks=class extends O{constructor(){super(...arguments),this[Eo]=kd[Ue.OPTIONS].default,this[To]=kd[Ue.SELECTED].default}get value(){return this.selectNode.value}handleSelectChanged(){this.dispatchEvent(new _g({value:this.selectNode.value}))}render(){return c`
      <select @change=${this.handleSelectChanged}>
        ${z(this.options,e=>e.value,e=>c`
            <option
              value=${e.value}
              ?selected=${`${this.selected}`==`${e.value}`}
            >
              ${e.label}
            </option>
          `)}
      </select>
    `}},Eo=Ue.OPTIONS,To=Ue.SELECTED,ks.styles=[Pt],ks);dr([u({type:Array})],Xi.prototype,Eo,void 0);dr([u()],Xi.prototype,To,void 0);dr([ft("select")],Xi.prototype,"selectNode",void 0);Xi=dr([T("ss-select")],Xi);const yg="tags-updated";class mg extends CustomEvent{constructor(e){super(yg,{bubbles:!0,composed:!0,detail:e})}}var oi;(function(t){t.VALUE="value",t.ENABLE_SUGGESTIONS="enableSuggestions"})(oi||(oi={}));const bg={[oi.VALUE]:{default:"",control:"text",description:"The input value"},[oi.ENABLE_SUGGESTIONS]:{default:!0,control:"boolean",description:"Enable tag suggestions"}},Eg="tag-input-updated";class Tg extends CustomEvent{constructor(e){super(Eg,{bubbles:!0,composed:!0,detail:e})}}const Sg="tag-added";class Cg extends CustomEvent{constructor(e){super(Sg,{bubbles:!0,composed:!0,detail:e})}}const Ag="tag-suggestions-requested";class $g extends CustomEvent{constructor(e){super(Ag,{bubbles:!0,composed:!0,detail:e})}}var vn=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},So,Ys;let ai=(Ys=class extends O{constructor(){super(...arguments),this.suggestionTimeout=null,this[So]=bg[oi.VALUE].default,this.suggestions=[],this.lastInputHadResults=!0,this.lastInput=""}get showButton(){return this.value.length>0}async firstUpdated(e){var i;super.firstUpdated(e),await this.updateComplete;const s=(i=this.shadowRoot)==null?void 0:i.querySelector("slot");s&&s.addEventListener("slotchange",()=>{this.syncSlotItems()}),this.syncSlotItems()}syncSlotItems(){this.suggestions=[],this.querySelectorAll("data-item").forEach(e=>{this.suggestions.push(e.textContent||"")})}handleSubmitted(){this.save()}async handleChanged(e){this.value=e.detail.value,this.dispatchEvent(new Tg({value:this.value})),this.suggestionTimeout&&clearTimeout(this.suggestionTimeout),this.suggestionTimeout=setTimeout(()=>{this.requestSuggestions()},200)}async requestSuggestions(){this.dispatchEvent(new $g({value:this.value}))}handleSaveClick(e){this.save()}save(){this.sendAddedEvent(),this.value=""}sendAddedEvent(){this.dispatchEvent(new Cg({tag:this.value}))}render(){return c`
      <div class="tag-input">
        <slot id="data-slot"></slot>

        <ss-input
          @input-submitted=${this.handleSubmitted}
          @input-changed=${this.handleChanged}
          placeholder="Tag"
          value=${this.value}
          .suggestions=${this.suggestions}
          autoComplete
        ></ss-input>

        ${this.showButton?c`
              <ss-button text="Add" @click=${this.handleSaveClick}></ss-button>
            `:S}
      </div>
    `}},So=oi.VALUE,Ys.styles=[Pt,A`
      #data-slot {
        display: none;
      }

      .tag-input {
        display: flex;
      }

      ss-input {
        flex-grow: 7;
      }

      ss-button {
        flex-grow: 3;
      }
    `],Ys);vn([u({type:String,reflect:!0})],ai.prototype,So,void 0);vn([d()],ai.prototype,"suggestions",void 0);vn([d()],ai.prototype,"lastInputHadResults",void 0);vn([d()],ai.prototype,"lastInput",void 0);ai=vn([T("tag-input")],ai);var ki;(function(t){t.TAGS="tags"})(ki||(ki={}));const Og={[ki.TAGS]:{default:[],control:"text",description:"The list of tags"}},Ig="tag-deleted";class wg extends CustomEvent{constructor(e){super(Ig,{bubbles:!0,composed:!0,detail:e})}}var zu=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},Co,zs;let Ao=(zs=class extends O{constructor(){super(...arguments),this[Co]=Og[ki.TAGS].default}connectedCallback(){super.connectedCallback()}deleteTag(e){this.dispatchEvent(new wg({tag:e}))}render(){return c`
      <ul class="tag-list" part="list">
        ${z(this.tags,e=>e,e=>c`
            <li part="item">
              ${e}
              <span
                part="delete"
                class="delete"
                @click=${()=>{this.deleteTag(e)}}
                >&#215;</span
              >
            </li>
          `)}
      </ul>
    `}},Co=ki.TAGS,zs.styles=[Pt,A`
      .tag-list {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        display: flex;
        flex-wrap: wrap;
      }

      .tag-list li {
        display: inline-block;
        padding: 0.25rem;
        border-radius: 0.125rem;
        border: 1px #ccc solid;
        background-color: #efefef;
        position: relative;
      }

      .tag-list li .delete {
        display: inline-block;
        background-color: var(--negative-color);
        border-radius: 0.25rem;
        border: 1px rgba(255, 255, 255, 0.5) outset;
        padding: 0.25rem;
        color: #fff;
        font-size: 1.5rem;
        vertical-align: middle;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        cursor: pointer;
      }
    `],zs);zu([u({type:Array})],Ao.prototype,Co,void 0);Ao=zu([T("tag-list")],Ao);var Me;(function(t){t.VALUE="value",t.ENABLE_SUGGESTIONS="enableSuggestions"})(Me||(Me={}));const Yd={[Me.VALUE]:{default:"",control:"text",description:"The input value"},[Me.ENABLE_SUGGESTIONS]:{default:!0,control:"boolean",description:"Enable tag suggestions"}};var _n=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},$o,Oo,qs;let li=(qs=class extends O{constructor(){super(...arguments),this[$o]=Yd[Me.VALUE].default,this[Oo]=Yd[Me.ENABLE_SUGGESTIONS].default,this.tags=[],this.suggestions=[]}connectedCallback(){super.connectedCallback()}setupTagsMutationObserver(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector('slot[name="tags"]');if(!e)return;const s=e.assignedElements(),i=new MutationObserver(()=>{this.syncSlotTags()});s.forEach(r=>{i.observe(r,{childList:!0,subtree:!0,characterData:!0,attributes:!0})})}setupSuggestionsMutationObserver(){var n;const e=(n=this.shadowRoot)==null?void 0:n.querySelector('slot[name="suggestions"]');if(!e)return;const s=e.assignedElements(),i=new MutationObserver(()=>{this.syncSlotSuggestions()});s.forEach(r=>{i.observe(r,{childList:!0,subtree:!0,characterData:!0,attributes:!0})})}async firstUpdated(e){var n,r;super.firstUpdated(e),await this.updateComplete;const s=(n=this.shadowRoot)==null?void 0:n.querySelector('slot[name="tags"]');s&&s.addEventListener("slotchange",()=>{this.syncSlotTags()}),this.setupTagsMutationObserver(),this.setupSuggestionsMutationObserver(),this.syncSlotTags();const i=(r=this.shadowRoot)==null?void 0:r.querySelector('slot[name="suggestions"]');i&&i.addEventListener("slotchange",()=>{this.syncSlotSuggestions()}),this.syncSlotSuggestions()}syncSlotTags(){this.tags=[],this.querySelectorAll('[slot="tags"] data-item').forEach(e=>{this.tags.push(e.textContent||"")})}syncSlotSuggestions(){this.suggestions=[],this.querySelectorAll('[slot="suggestions"] data-item').forEach(e=>{this.suggestions.push(e.textContent||"")})}handleTagAdded(e){this.tags=[...this.tags,e.detail.tag],this.sendUpdatedEvent()}handleDeleted(e){this.tags=this.tags.filter(s=>s!==e.detail.tag),this.sendUpdatedEvent()}handleInputUpdated(e){this.value=e.detail.value}handleSuggestionsUpdated(e){this.suggestions=e.detail.suggestions}sendUpdatedEvent(){this.dispatchEvent(new mg({tags:this.tags}))}render(){return c`
      <fieldset class="tag-manager">
        <legend>${"Tags"}</legend>

        <tag-input
          value=${this.value}
          ?enableSuggestions=${this.enableSuggestions}
          @tag-input-updated=${this.handleInputUpdated}
          @tag-added=${this.handleTagAdded}
          @tag-suggestions-updated=${this.handleSuggestionsUpdated}
        >
          ${z(this.suggestions,e=>e,e=>c` <data-item>${e}</data-item> `)}
        </tag-input>

        ${this.tags.length?c` <tag-list
              .tags=${this.tags}
              @tag-deleted=${e=>{this.handleDeleted(e)}}
            ></tag-list>`:c`<div class="no-tags">${"No tags are set"}</div>`}

        <slot name="tags"></slot>

        <slot name="suggestions"></slot>
      </fieldset>
    `}},$o=Me.VALUE,Oo=Me.ENABLE_SUGGESTIONS,qs.styles=[Pt,A`
      .tag-manager {
        border-radius: 0.25rem;
        border: 1px #ccc solid;
      }

      .no-tags {
        margin-top: 0.5rem;
        color: #666;
        font-size: 0.75rem;
      }

      slot {
        display: none;
      }
    `],qs);_n([u({type:String,reflect:!0})],li.prototype,$o,void 0);_n([u({type:Boolean,reflect:!0})],li.prototype,Oo,void 0);_n([d()],li.prototype,"tags",void 0);_n([d()],li.prototype,"suggestions",void 0);li=_n([T("tag-manager")],li);var xg=Object.defineProperty,Pg=Object.getOwnPropertyDescriptor,od=(t,e,s,i)=>{for(var n=i>1?void 0:i?Pg(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&xg(e,s,n),n};let Yi=class extends O{constructor(){super(...arguments),this.open=!1}get classes(){return{container:!0,open:this.open}}sendConfirmEvent(){this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0}))}sendCancelEvent(){this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0,composed:!0}))}render(){return c`
      <div class=${Q(this.classes)}>
        <div class="overlay"></div>

        <div class="box modal">
          ${p("Are you sure?")}
          <div class="buttons">
            <ss-button
              positive
              @click=${this.sendConfirmEvent}
              text=${p("Yes")}
            ></ss-button>

            <ss-button
              @click=${this.sendCancelEvent}
              text=${p("Cancel")}
            ></ss-button>
          </div>
        </div>
      </div>
    `}};Yi.styles=[H,A`
      .container.open .overlay {
        opacity: 1;
        pointer-events: initial;
      }

      .container.open .modal {
        transform: initial;
        opacity: 1;
      }

      .overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.3);
        opacity: 0;
        pointer-events: none;
      }

      .modal {
        position: fixed;
        z-index: 2;
        width: 80%;
        height: 40%;
        max-height: 320px;
        max-width: 480px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding: 1rem;
        transform: translateY(200%);
        transition: 0.3s;
        opacity: 0;
      }

      .buttons {
        padding: 1rem;
      }

      .buttons ss-button {
        margin-top: 1rem;
        display: block;
      }
    `];od([u({type:Boolean})],Yi.prototype,"open",2);od([d()],Yi.prototype,"classes",1);Yi=od([T("action-confirm-modal"),Is()],Yi);const Ng="action-item-updated";class Lg extends CustomEvent{constructor(e){super(Ng,{bubbles:!0,composed:!0,detail:e})}}const Dg="action-item-deleted";class Rg extends CustomEvent{constructor(e){super(Dg,{bubbles:!0,composed:!0,detail:e})}}const Ug="action-item-canceled";class Mg extends CustomEvent{constructor(e){super(Ug,{bubbles:!0,composed:!0,detail:e})}}var Ot;(function(t){t.MESSAGE_LIFE="messageLife",t.TOP="top",t.BOTTOM="bottom"})(Ot||(Ot={}));const Dr={[Ot.MESSAGE_LIFE]:{default:5e3,control:"number",description:"The time in milliseconds that a message will be displayed"},[Ot.TOP]:{default:!1,control:"boolean",description:"Whether the notification provider is at the top of the screen"},[Ot.BOTTOM]:{default:!1,control:"boolean",description:"Whether the notification provider is at the bottom of the screen"}};var B;(function(t){t.INFO="info",t.SUCCESS="success",t.WARNING="warning",t.ERROR="error"})(B||(B={}));var js;(function(t){t.TOP="top",t.BOTTOM="bottom"})(js||(js={}));var st;(function(t){t.NOTIFICATION_ID="notificationId",t.MESSAGE="message",t.TYPE="type",t.START_TIME="startTime",t.MESSAGE_LIFE="messageLife"})(st||(st={}));const Ii={[st.NOTIFICATION_ID]:{default:0,control:"number",description:"The id of the notification"},[st.MESSAGE]:{default:"",control:"text",description:"The message to display"},[st.TYPE]:{default:B.INFO,control:"text",description:"The type of message to display"},[st.START_TIME]:{default:new Date().getTime(),control:"number",description:"The time the message was created"},[st.MESSAGE_LIFE]:{default:5e3,control:"number",description:"The time in milliseconds that a message will be displayed"}},jg="notification-clicked";class Fg extends CustomEvent{constructor(e){super(jg,{bubbles:!0,composed:!0,detail:e})}}var Ti=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},Io,wo,xo,Po,No,Ws;let Es=(Ws=class extends O{constructor(){super(...arguments),this[Io]=Ii[st.NOTIFICATION_ID].default,this[wo]=Ii[st.MESSAGE].default,this[xo]=Ii[st.TYPE].default,this[Po]=Ii[st.START_TIME].default,this[No]=Ii[st.MESSAGE_LIFE].default}get classes(){return{"notification-message":!0,[this[st.TYPE]]:!0}}render(){return c`
      <div
        @click=${()=>this.dispatchEvent(new Fg({id:this.notificationId}))}
        class=${Q(this.classes)}
        style=${`--message-life: ${this[st.MESSAGE_LIFE]}ms`}
      >
        <div class="time-indicator"></div>
        <div class="content">
          ${this[st.MESSAGE]}
          <slot></slot>
        </div>
      </div>
    `}},Io=st.NOTIFICATION_ID,wo=st.MESSAGE,xo=st.TYPE,Po=st.START_TIME,No=st.MESSAGE_LIFE,Ws.styles=[Pt,A`
      .notification-message {
        position: relative;
        background-color: var(--color, #ddd);
        color: #333;
        text-align: center;
        padding: 0.25rem;
        animation: fade-out var(--message-life, 1000ms) linear forwards;
        margin: 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);

        &.success {
          background-color: var(--color-success, #4caf50);
          color: #fff;
        }

        &.error {
          background-color: var(--color-error, #f44336);
          color: #fff;
        }

        &.info {
          background-color: var(--color-info, #2196f3);
          color: #fff;
        }

        .time-indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 1;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.125),
            rgba(255, 255, 255, 0.25)
          );
          animation: time-elapsed var(--message-life, 1000ms) linear forwards;
        }

        .content {
          position: relative;
          height: 100%;
          width: 100%;
          z-index: 2;
        }
      }

      @keyframes time-elapsed {
        0% {
          width: 0%;
        }
        100% {
          width: 100%;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `],Ws);Ti([u({type:Number})],Es.prototype,Io,void 0);Ti([u()],Es.prototype,wo,void 0);Ti([u()],Es.prototype,xo,void 0);Ti([u({type:Number})],Es.prototype,Po,void 0);Ti([u({type:Number,reflect:!0})],Es.prototype,No,void 0);Es=Ti([T("notification-message")],Es);var xs=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},Lo,Do,Ro,Ks;let ke=(Ks=class extends O{constructor(){super(...arguments),this.notificationId=0,this.notifications=[],this[Lo]=Dr[Ot.MESSAGE_LIFE].default,this[Do]=Dr[Ot.TOP].default,this[Ro]=Dr[Ot.BOTTOM].default}get classes(){return{"notification-provider":!0,top:this.side===js.TOP,bottom:this.side===js.BOTTOM}}get side(){return this[Ot.TOP]?js.TOP:js.BOTTOM}addNotification(e,s){const i=this.notificationId++,n={id:i,message:e,type:s,startTime:new Date,messageLife:this[Ot.MESSAGE_LIFE]};return this.notifications=[...this.notifications,n],setTimeout(()=>{this.removeNotification(i)},this[Ot.MESSAGE_LIFE]),i}removeNotification(e){this.notifications=this.notifications.filter(s=>s.id!==e)}render(){return c`
      <div class=${Q(this.classes)}>
        ${z(this.notifications,e=>e.id,e=>c` <notification-message
              @notification-clicked=${()=>this.removeNotification(e.id)}
              message=${e.message}
              type=${e.type}
              startTime=${e.startTime.getTime()}
              messageLife=${e.messageLife}
            ></notification-message>`)}
      </div>
    `}},Lo=Ot.MESSAGE_LIFE,Do=Ot.TOP,Ro=Ot.BOTTOM,Ks.styles=[Pt,A`
      .notification-provider {
        position: fixed;
        left: 10vw;
        width: 80vw;
        z-index: 1000;

        &.top {
          top: 0;
        }

        &.bottom {
          bottom: 0;
        }
      }
    `],Ks);xs([d()],ke.prototype,"notifications",void 0);xs([u({type:Number,reflect:!0})],ke.prototype,Lo,void 0);xs([u({type:Boolean})],ke.prototype,Do,void 0);xs([u({type:Boolean})],ke.prototype,Ro,void 0);xs([d()],ke.prototype,"classes",null);xs([d()],ke.prototype,"side",null);ke=xs([T("notification-provider")],ke);let In=null;function X(t,e=B.INFO){In||(In=document.createElement("notification-provider"),document.body.appendChild(In)),In.addNotification(t,e)}var Vg=Object.defineProperty,Bg=Object.getOwnPropertyDescriptor,it=(t,e,s,i)=>{for(var n=i>1?void 0:i?Bg(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Vg(e,s,n),n},Uo,Mo,jo,Fo,Vo,Bo,Go,zd;let q=class extends(zd=gn,Go=Tt.ACTION_ID,Bo=Tt.TYPE,Vo=Tt.DESC,Fo=Tt.OCCURRED_AT,jo=Tt.TAGS,Mo=Tt.TAG_VALUE,Uo=Tt.PROPERTIES,zd){constructor(){super(...arguments),this.state=gt,this.minLengthForSuggestion=1,this.suggestionTimeout=null,this.abortController=null,this[Go]=ns[Tt.ACTION_ID].default,this[Bo]=ns[Tt.TYPE].default,this[Vo]=ns[Tt.DESC].default,this[Fo]=ns[Tt.OCCURRED_AT].default,this[jo]=ns[Tt.TAGS].default,this[Mo]=ns[Tt.TAG_VALUE].default,this[Uo]=ns[Tt.PROPERTIES].default,this.initialDesc="",this.initialOccurredAt="",this.initialTags="",this.confirmModalShown=!1,this.advancedMode=!1,this.loading=!1,this.lastInput={[io.ACTION]:{value:"",hadResults:!0},[io.TAG]:{value:"",hadResults:!0}},this.tagSuggestions=[]}get classes(){return{box:!0,"advanced-mode":this.state.advancedMode}}get tagsAndSuggestions(){return Array.from(new Set([...this.tags,...this.state.tagSuggestions]))}get tagSuggestionsEnabled(){return this.state.listConfig.setting[V.TAG_SUGGESTIONS]!==Ae.DISABLED}connectedCallback(){super.connectedCallback(),this.desc=this.desc.trim(),this.occurredAt=ue.formatDateTime(new Date(this.occurredAt)),this.initialDesc=this.desc,this.initialOccurredAt=this.occurredAt,this.initialTags=JSON.stringify(this.tags)}disconnectedCallback(){super.disconnectedCallback(),this.suggestionTimeout&&(clearTimeout(this.suggestionTimeout),this.suggestionTimeout=null),this.abortController&&(this.abortController.abort(),this.abortController=null)}get apiUrl(){return this.actionId?`action/${this.actionId}`:"action"}get hasChanged(){return this.desc.trim()!==this.initialDesc||this.occurredAt!==this.initialOccurredAt||JSON.stringify(this.tagsAndSuggestions)!==this.initialTags}async saveAction(){this.loading=!0;const t=this.desc.trim();try{if(t&&this.hasChanged){const e=this.occurredAt,s=new Date().getTimezoneOffset(),i={desc:t,occurredAt:e,timeZone:s,tags:this.tagsAndSuggestions,properties:this.properties},n=this.actionId?await P.put(this.apiUrl,i):await P.post(this.apiUrl,i);if(this.reset(),this.loading=!1,!n)return;this.dispatchEvent(new Lg({id:this.actionId,desc:t,occurredAt:n.response.occurredAt,tags:this.tags})),X(this.actionId?p("Updated!"):p("Added!"),B.SUCCESS);return}this.dispatchEvent(new Mg({id:this.actionId}))}catch(e){console.error(`Error encountered in when saving action: ${e}`)}this.loading=!1}reset(){this.desc="",this.tagValue="",this.actionId||(this.tags=this.state.listConfig.filter.tagging[ot.CONTAINS_ALL_OF]),this.state.setTagSuggestions([]),this.suggestionTimeout&&(clearTimeout(this.suggestionTimeout),this.suggestionTimeout=null)}async deleteAction(){this.loading=!0;try{await P.delete(this.apiUrl),X(p("Removed!"),B.INFO)}catch(t){console.error(`Error encountered when deleting action: ${t}`)}this.dispatchEvent(new Rg({id:this.actionId})),this.desc="",this.loading=!1}async requestActionSuggestions(){if(!this.lastInput.action.hadResults&&this.desc.startsWith(this.lastInput.action.value)){this.state.setActionSuggestions([]);return}try{this.lastInput.action.hadResults=!1;let t=[];if(this.desc.length>=this.minLengthForSuggestion){const e=await P.get(`actionSuggestion/${this.desc}`);e&&(t=e.response.suggestions)}(t.length||this.desc==="")&&(this.lastInput.action.hadResults=!0),this.state.setActionSuggestions(t)}catch(t){console.error(`Failed to get action suggestions: ${JSON.stringify(t)}`)}this.lastInput.action.value=this.desc}async requestTagSuggestions(){this.abortController&&this.abortController.abort(),this.abortController=new AbortController;const t=this.desc;if(t.length===0||!this.tagSuggestionsEnabled){this.state.setTagSuggestions([]);return}try{const e=await P.get(`tagSuggestion/${t}`,{signal:this.abortController.signal});let s=[];if(e&&(s=e.response.suggestions),t!==this.desc)return;this.state.setTagSuggestions(s.filter(i=>!this.tags.includes(i)))}catch(e){console.error(`Failed to get tag suggestions: ${JSON.stringify(e)}`)}}async handleDescChanged(t){this.desc=t.detail.value,this.suggestionTimeout&&clearTimeout(this.suggestionTimeout),this.suggestionTimeout=setTimeout(()=>{this.syncSuggestions()},150)}syncSuggestions(t=!1){t&&(this.state.setTagSuggestions([]),this.state.setActionSuggestions([])),this.requestTagSuggestions(),this.requestActionSuggestions()}sync(t=!1){this.syncSuggestions(t)}handleDescSubmitted(t){this.saveAction()}handleOccurredAtChanged(t){this.occurredAt=t.detail.value}handleOccurredAtSubmitted(t){this.saveAction()}handleSaveClick(t){this.saveAction()}handleDeleteClick(t){this.confirmModalShown=!0}handleTagsUpdated(t){this.tags=t.detail.tags,this.state.setTagSuggestions(this.state.tagSuggestions.filter(e=>this.tags.includes(e)))}async handleTagSuggestionsRequested(t){const e=t.detail.value;if(!this.lastInput.tag.hadResults&&e.startsWith(this.lastInput.tag.value)||!this.tagSuggestionsEnabled){this.tagSuggestions=[];return}this.lastInput.tag.hadResults=!1,this.lastInput.tag.value=e;let s=[];if(e.length>=this.minLengthForSuggestion){const i=await P.get(`tag/${e}`);i&&(s=i.response.tags)}(s.length||e==="")&&(this.lastInput.tag.hadResults=!0),this.tagSuggestions=s}render(){return c`
      <form class=${Q(this.classes)}>
        <div>
          <ss-input
            @input-submitted=${this.handleDescSubmitted}
            @input-changed=${this.handleDescChanged}
            value=${this.desc}
            .suggestions=${this.state.actionSuggestions}
            autoComplete
          ></ss-input>
        </div>

        <tag-manager
          ?enableSuggestions=${this.tagSuggestionsEnabled}
          value=${this.tagValue}
          @tags-updated=${this.handleTagsUpdated}
          @tag-suggestions-requested=${this.handleTagSuggestionsRequested}
        >
          <div slot="tags">
            ${z(this.tagsAndSuggestions,t=>t,t=>c`<data-item>${t}</data-item>`)}
          </div>

          <div slot="suggestions">
            ${z(this.tagSuggestions,t=>t,t=>c`<data-item>${t}</data-item>`)}
          </div>
        </tag-manager>

        ${this.actionId?c`
              <div class="time">
                <ss-input
                  type=${Fs.DATETIME_LOCAL}
                  @input-submitted=${this.handleOccurredAtSubmitted}
                  @input-changed=${this.handleOccurredAtChanged}
                  value=${this.occurredAt}
                ></ss-input>
              </div>
            `:S}

        <div>
          <ss-button
            ?positive=${!this.actionId||this.hasChanged}
            @click=${this.handleSaveClick}
            text=${this.actionId?this.hasChanged?p("Update"):p("Cancel"):p("Add")}
            ?loading=${this.loading}
          ></ss-button>

          ${this.actionId?c`
                <ss-button
                  negative
                  @click=${this.handleDeleteClick}
                  text=${p("Delete")}
                ></ss-button>

                <action-confirm-modal
                  @confirm=${this.deleteAction}
                  @cancel=${()=>this.confirmModalShown=!1}
                  ?open=${this.confirmModalShown}
                ></action-confirm-modal>
              `:S}
        </div>
      </form>
    `}};q.styles=[H,A`
      form {
        padding: 1rem;
      }

      tag-manager,
      .time,
      .type {
        display: none;
      }

      form.advanced-mode tag-manager,
      form.advanced-mode .time,
      form.advanced-mode .type {
        display: initial;
      }

      div:last-child {
        margin-top: 1rem;
      }

      .type,
      .properties {
        background-color: #ffeed0;
      }
    `];it([u({type:Number})],q.prototype,Go,2);it([u({type:Number})],q.prototype,Bo,2);it([u()],q.prototype,Vo,2);it([u()],q.prototype,Fo,2);it([u({type:Array})],q.prototype,jo,2);it([u()],q.prototype,Mo,2);it([u({type:Array})],q.prototype,Uo,2);it([d()],q.prototype,"initialDesc",2);it([d()],q.prototype,"initialOccurredAt",2);it([d()],q.prototype,"initialTags",2);it([d()],q.prototype,"confirmModalShown",2);it([d()],q.prototype,"advancedMode",2);it([d()],q.prototype,"loading",2);it([d()],q.prototype,"lastInput",2);it([d()],q.prototype,"tagSuggestions",2);it([d()],q.prototype,"classes",1);it([d()],q.prototype,"tagsAndSuggestions",1);it([d()],q.prototype,"tagSuggestionsEnabled",1);it([d()],q.prototype,"hasChanged",1);q=it([T("action-form")],q);var qt;(function(t){t.TITLE="title",t.OPEN="open",t.PANEL_ID="panelId"})(qt||(qt={}));const Rr={[qt.TITLE]:{default:"",description:"The heading in which is always displayed",control:"text"},[qt.OPEN]:{default:!1,description:"Whether the content is in opened state",control:"boolean"},[qt.PANEL_ID]:{default:"",description:"The unique identifier for the panel",control:"text"}},Gg="collapsable-toggled";class Hg extends CustomEvent{constructor(e){super(Gg,{bubbles:!0,composed:!0,detail:e})}}var yn=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},Ho,Xo,ko,Js;let di=(Js=class extends O{constructor(){super(...arguments),this[Ho]=Rr[qt.TITLE].default,this[Xo]=Rr[qt.OPEN].default,this[ko]=Rr[qt.PANEL_ID].default}firstUpdated(e){super.firstUpdated(e),this.panelId===""&&(this.panelId=this.title)}get classes(){return{box:!0,collapsable:!0,open:this.open}}handleIconClick(){this.toggle()}toggle(){this.open=!this.open,this.dispatchEvent(new CustomEvent("toggled",{bubbles:!0,composed:!0,detail:this.open})),this.dispatchEvent(new Hg({panelId:this.panelId,isOpen:this.open}))}render(){return c`
      <div class=${Q(this.classes)}>
        <div class="head">
          <div class="title">${this.title}</div>
          <div class="icon">
            <button @click=${()=>this.handleIconClick()}>
              ${this.open?"-":"+"}
            </button>
          </div>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    `}},Ho=qt.TITLE,Xo=qt.OPEN,ko=qt.PANEL_ID,Js.styles=[Pt,A`
      .collapsable {
        padding: 1rem;
      }

      .head {
        display: flex;
      }

      .title {
        flex-grow: 9;
      }

      .icon {
        flex-grow: 1;
        text-align: right;
      }

      .icon button {
        width: auto;
        padding: 0 0.5rem;
      }

      .body {
        display: none;
        transition: all 0.3s;
        overflow: hidden;
      }

      .collapsable.open .body {
        display: block;
        padding-top: 1rem;
      }
    `],Js);yn([u()],di.prototype,Ho,void 0);yn([u({type:Boolean,reflect:!0})],di.prototype,Xo,void 0);yn([u({type:String,reflect:!0})],di.prototype,ko,void 0);yn([d()],di.prototype,"classes",null);di=yn([T("ss-collapsable")],di);var rt=(t=>(t.TYPE="type",t.ACTION_ID="actionId",t.DESC="desc",t.CREATED_AT="createdAt",t.UPDATED_AT="updatedAt",t.OCCURRED_AT="occurredAt",t.TAGS="tags",t.SELECTED="selected",t.PROPERTIES="properties",t.DEBUG="debug",t))(rt||{});const me={type:{default:"",control:{type:f.TEXT},description:"The type of the action"},actionId:{default:0,control:{type:f.NUMBER},description:"The ID of the action"},desc:{default:"",control:{type:f.TEXT},description:"The description of the action"},createdAt:{default:"",control:{type:f.TEXT},description:"The creation date of the action"},updatedAt:{default:"",control:{type:f.TEXT},description:"The update date of the action"},occurredAt:{default:"",control:{type:f.TEXT},description:"The occurrence date of the action"},tags:{default:[],control:{type:f.TEXT},description:"The tags of the action"},selected:{default:!1,control:{type:f.BOOLEAN},description:"Whether the action is selected"},properties:{default:[],control:{type:f.TEXT},description:"The properties of the action"},debug:{default:!1,control:{type:f.BOOLEAN},description:"Whether debug mode is enabled"}},Xg="pointer-down";class qu extends CustomEvent{constructor(e){super(Xg,{bubbles:!0,composed:!0,detail:e})}}const kg="pointer-up";class Wu extends CustomEvent{constructor(e){super(kg,{bubbles:!0,composed:!0,detail:e})}}const Yg="pointer-long-press";class Ku extends CustomEvent{constructor(e){super(Yg,{bubbles:!0,composed:!0,detail:e})}}var zg=Object.defineProperty,qg=Object.getOwnPropertyDescriptor,Ct=(t,e,s,i)=>{for(var n=i>1?void 0:i?qg(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&zg(e,s,n),n},Yo,zo,qo,Wo,Ko,Jo,Zo,Qo,ta,qd,Ju=(t=>(t.VIEW="view",t.EDIT="edit",t))(Ju||{});const Wd=500;let ht=class extends(qd=O,ta=rt.TYPE,Qo=rt.ACTION_ID,Zo=rt.DESC,Jo=rt.CREATED_AT,Ko=rt.UPDATED_AT,Wo=rt.OCCURRED_AT,qo=rt.TAGS,zo=rt.SELECTED,Yo=rt.DEBUG,qd){constructor(){super(...arguments),this[ta]=me[rt.TYPE].default,this[Qo]=me[rt.ACTION_ID].default,this[Zo]=me[rt.DESC].default,this[Jo]=me[rt.CREATED_AT].default,this[Ko]=me[rt.UPDATED_AT].default,this[Wo]=me[rt.OCCURRED_AT].default,this[qo]=me[rt.TAGS].default,this[zo]=me[rt.SELECTED].default,this[Yo]=me[rt.DEBUG].default,this.mode="view",this.pointerDown=new Date,this.downTimeout=0,this.downActivation=!1}get classes(){return{"action-list-item":!0,selected:this.selected}}get readableTime(){const t=new Date(this.occurredAt);return ue.formatDateTime(t)}setMode(t){this.mode=t}handleMouseDown(t){return this.pointerDown=new Date,this.dispatchEvent(new qu({time:this.pointerDown})),this.downTimeout=setTimeout(()=>{const e=new Date;if(e.getTime()-this.pointerDown.getTime()>Wd){this.dispatchEvent(new Ku({time:e})),this.downActivation=!0;return}},Wd),t.preventDefault(),!1}handleMouseUp(t){return this.downActivation||this.dispatchEvent(new Wu({time:new Date})),this.downActivation=!1,this.downTimeout&&clearTimeout(this.downTimeout),t.preventDefault(),!1}handleTouchStart(t){}handleTouchEnd(t){}render(){return c`
      <div class=${Q(this.classes)}>
        ${this.mode==="edit"?c`
              <action-form
                @action-item-updated=${()=>{this.mode="view"}}
                @action-item-canceled=${()=>{this.mode="view"}}
                actionId=${this.actionId}
                desc=${this.desc}
                occurredAt=${this.occurredAt}
                type=${this.type}
                .tags=${this.tags}
              ></action-form>
            `:c`
              <div
                @mousedown=${this.handleMouseDown}
                @mouseup=${this.handleMouseUp}
                @touchstart=${this.handleTouchStart}
                @touchend=${this.handleTouchEnd}
              >
                <div class="desc">${this.desc}</div>
                <div class="time">${this.readableTime}</div>
              </div>
            `}
      </div>
    `}};ht.styles=A`
    .action-list-item {
      padding: 0.5rem;
      text-align: center;
      transition: all 0.2s;

      &.selected {
        background-color: #fdc;
      }
    }

    .time {
      color: #888;
      font-size: 0.9rem;
    }
  `;Ct([u()],ht.prototype,ta,2);Ct([u({type:Number})],ht.prototype,Qo,2);Ct([u()],ht.prototype,Zo,2);Ct([u()],ht.prototype,Jo,2);Ct([u()],ht.prototype,Ko,2);Ct([u()],ht.prototype,Wo,2);Ct([u({type:Array})],ht.prototype,qo,2);Ct([u({type:Boolean})],ht.prototype,zo,2);Ct([u({type:Boolean})],ht.prototype,Yo,2);Ct([d()],ht.prototype,"mode",2);Ct([d()],ht.prototype,"pointerDown",2);Ct([d()],ht.prototype,"downTimeout",2);Ct([d()],ht.prototype,"downActivation",2);Ct([d()],ht.prototype,"classes",1);ht=Ct([T("action-list-item")],ht);const Wg="list-filter-updated";class Kg extends CustomEvent{constructor(e){super(Wg,{bubbles:!0,composed:!0,detail:e})}}var Yt=(t=>(t.TIME_STR="timeStr",t.TYPE="type",t.DATE="date",t.START="start",t.END="end",t))(Yt||{});const wi={timeStr:{default:"",control:{type:f.TEXT},description:"The time string"},type:{default:Z.ALL_TIME,control:{type:f.TEXT},description:"The type of time filter"},date:{default:"",control:{type:f.TEXT},description:"The date"},start:{default:"",control:{type:f.TEXT},description:"The start date"},end:{default:"",control:{type:f.TEXT},description:"The end date"}},Jg="time-filters-updated";class Zg extends CustomEvent{constructor(e){super(Jg,{bubbles:!0,composed:!0,detail:e})}}var Qg=Object.defineProperty,tv=Object.getOwnPropertyDescriptor,ye=(t,e,s,i)=>{for(var n=i>1?void 0:i?tv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Qg(e,s,n),n},ea,sa,ia,na,ra,Kd;const ev={[Z.ALL_TIME]:p("filterTimeType.allTime"),[Z.EXACT_DATE]:p("filterTimeType.exactDate"),[Z.RANGE]:p("filterTimeType.range")};let Gt=class extends(Kd=O,ra=Yt.TIME_STR,na=Yt.TYPE,ia=Yt.DATE,sa=Yt.START,ea=Yt.END,Kd){constructor(){super(...arguments),this[ra]=wi[Yt.TIME_STR].default,this[na]=wi[Yt.TYPE].default,this[ia]=wi[Yt.DATE].default,this[sa]=wi[Yt.START].default,this[ea]=wi[Yt.END].default,this.time={type:Z.ALL_TIME}}connectedCallback(){super.connectedCallback(),this.date||(this.date=ue.dateString(new Date)),this.start||(this.start=ue.dateString(new Date(new Date().getTime()-864e5))),this.end||(this.end=ue.dateString(new Date))}handleTypeChanged(t){this.type=t.detail.value,this.sendUpdatedEvent()}handleDateChanged(t){this.date=t.detail.value,this.sendUpdatedEvent()}handleStartChanged(t){this.start=t.detail.value,this.sendUpdatedEvent()}handleEndChanged(t){this.end=t.detail.value,this.sendUpdatedEvent()}sendUpdatedEvent(){this.dispatchEvent(new Zg(this.mapContextFromType()))}mapContextFromType(){switch(this.type){case Z.ALL_TIME:return{type:Z.ALL_TIME};case Z.EXACT_DATE:return{type:Z.EXACT_DATE,date:this.date};case Z.RANGE:return{type:Z.RANGE,start:this.start,end:this.end}}}render(){return c`
      <fieldset>
        <legend>${p("Time")}</legend>

        <ss-select
          selected=${this.type}
          @select-changed=${t=>{this.handleTypeChanged(t)}}
          .options=${Object.values(Z).map(t=>({value:t,label:ev[t]}))}
        ></ss-select>

        <div>
          ${this.type===Z.EXACT_DATE?c`
                <ss-input
                  id="date"
                  @input-changed=${this.handleDateChanged}
                  type=${Fs.DATE}
                  value=${this.date}
                ></ss-input>
              `:this.type===Z.RANGE?c`
                  <ss-input
                    id="start"
                    @input-changed=${this.handleStartChanged}
                    type=${Fs.DATE}
                    value=${this.start}
                  ></ss-input>

                  <ss-input
                    id="end"
                    @input-changed=${this.handleEndChanged}
                    type=${Fs.DATE}
                    value=${this.end}
                  ></ss-input>
                `:S}
        </div>
      </fieldset>
    `}};Gt.styles=[H];ye([u()],Gt.prototype,ra,2);ye([u({reflect:!0})],Gt.prototype,na,2);ye([u({reflect:!0})],Gt.prototype,ia,2);ye([u({reflect:!0})],Gt.prototype,sa,2);ye([u({reflect:!0})],Gt.prototype,ea,2);ye([d()],Gt.prototype,"time",2);ye([ft("#date")],Gt.prototype,"dateNode",2);ye([ft("#start")],Gt.prototype,"startNode",2);ye([ft("#end")],Gt.prototype,"endNode",2);Gt=ye([T("time-filters")],Gt);var oa=(t=>(t.FILTERS="filters",t))(oa||{});const sv={filters:{default:[],control:{type:f.TEXT},description:"The list of text filters to display"}},iv="text-filters-updated";class Jd extends CustomEvent{constructor(e){super(iv,{bubbles:!0,composed:!0,detail:e})}}var as=(t=>(t.TYPE="type",t.SUB_STR="subStr",t.INDEX="index",t))(as||{});const Ur={type:{default:Ee.CONTAINS,control:{type:f.TEXT},description:"The type of text filter"},subStr:{default:"",control:{type:f.TEXT},description:"The substring to filter by"},index:{default:-1,control:{type:f.NUMBER},description:"The index of the filter"}},nv="text-filter-updated";class Zd extends CustomEvent{constructor(e){super(nv,{bubbles:!0,composed:!0,detail:e})}}const rv="text-filter-save";class Qd extends CustomEvent{constructor(e){super(rv,{bubbles:!0,composed:!0,detail:e})}}var ov=Object.defineProperty,av=Object.getOwnPropertyDescriptor,cr=(t,e,s,i)=>{for(var n=i>1?void 0:i?av(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&ov(e,s,n),n},aa,la,da,tc;const lv={[Ee.EQUALS]:p("textType.equals"),[Ee.CONTAINS]:p("textType.contains"),[Ee.ENDS_WITH]:p("textType.endsWith"),[Ee.STARTS_WITH]:p("textType.startsWith")};let ci=class extends(tc=O,da=as.TYPE,la=as.SUB_STR,aa=as.INDEX,tc){constructor(){super(...arguments),this[da]=Ur[as.TYPE].default,this[la]=Ur[as.SUB_STR].default,this[aa]=Ur[as.INDEX].default}handleTypeChanged(t){const e=t.detail.value;this.dispatchEvent(new Zd({index:this.index,type:e,subStr:this.subStr}))}handleSubStrChanged(t){const e=t.detail.value;this.dispatchEvent(new Zd({index:this.index,type:this.type,subStr:e}))}handleSubStrSubmitted(t){this.dispatchEvent(new Qd({index:this.index}))}handleButtonClicked(){this.dispatchEvent(new Qd({index:this.index}))}render(){return c`
      <fieldset>
        <ss-select
          selected=${this.type}
          @select-changed=${t=>{this.handleTypeChanged(t)}}
          .options=${Object.values(Ee).map(t=>({value:t,label:lv[t]}))}
        ></ss-select>

        <ss-input
          value=${this.subStr}
          @input-changed=${t=>{this.handleSubStrChanged(t)}}
          @input-submitted=${t=>{this.handleSubStrSubmitted(t)}}
        ></ss-input>

        <ss-button
          text=${this.index===-1?"+":"-"}
          @click=${this.handleButtonClicked}
        ></ss-button>
      </fieldset>
    `}};ci.styles=[H];cr([u()],ci.prototype,da,2);cr([u()],ci.prototype,la,2);cr([u({type:Number})],ci.prototype,aa,2);ci=cr([T("text-filter")],ci);var dv=Object.defineProperty,cv=Object.getOwnPropertyDescriptor,ad=(t,e,s,i)=>{for(var n=i>1?void 0:i?cv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&dv(e,s,n),n},ca,ec;let zi=class extends(ec=O,ca=oa.FILTERS,ec){constructor(){super(...arguments),this[ca]=sv[oa.FILTERS].default,this.newFilter={type:Ee.CONTAINS,subStr:""}}connectedCallback(){super.connectedCallback()}handleFilterUpdated(t){const e=t.detail;if(e.index===-1){this.newFilter={type:e.type,subStr:e.subStr};return}const s=this.filters.map((i,n)=>n===e.index?{type:e.type,subStr:e.subStr}:i);this.dispatchEvent(new Jd({filters:s}))}handleSave(t){const e=t.detail.index===-1?[...this.filters,this.newFilter]:[...this.filters.filter((s,i)=>i!==t.detail.index)];this.dispatchEvent(new Jd({filters:e}))}render(){return c`
      <fieldset>
        <legend>${p("Text")}</legend>

        ${z(this.filters,(t,e)=>`${t.type}/${e}`,(t,e)=>c`
            <text-filter
              index=${e}
              type=${t.type}
              subStr=${t.subStr}
              @text-filter-updated=${this.handleFilterUpdated}
              @text-filter-save=${this.handleSave}
            ></text-filter>
          `)}

        <text-filter
          type=${this.newFilter.type}
          subStr=${this.newFilter.subStr}
          @text-filter-updated=${this.handleFilterUpdated}
          @text-filter-save=${this.handleSave}
        ></text-filter>

        <div></div>
      </fieldset>
    `}};zi.styles=[H];ad([u({type:Array})],zi.prototype,ca,2);ad([d()],zi.prototype,"newFilter",2);zi=ad([T("text-filters")],zi);var uv=Object.defineProperty,hv=Object.getOwnPropertyDescriptor,nt=(t,e,s,i)=>{for(var n=i>1?void 0:i?hv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&uv(e,s,n),n},ua,ha,sc;const pv={[ot.CONTAINS_ALL_OF]:p("filterType.containsAllOf"),[ot.CONTAINS_ONE_OF]:p("filterType.containsOneOf")};let W=class extends(sc=Ht,ha=ot.CONTAINS_ONE_OF,ua=ot.CONTAINS_ALL_OF,sc){constructor(){super(...arguments),this.minLengthForSuggestion=1,this.state=gt,this[ha]=[],this[ua]=[],this.includeUntagged=!1,this.includeAll=!0,this.includeAllTagging=!1,this.time={type:Z.ALL_TIME},this.text=[],this.savedFilters=[],this.saveMode=!1,this.filterName="",this.selectedSavedFilter="",this.lastInput={value:"",hadResults:!0},this.tagSuggestions=[]}get classes(){return{box:!0,"list-filter":!0,all:this.includeAll,"save-mode":this.saveMode,"valid-filter-name":this.filterNameIsValid}}get taggingClasses(){return{tagging:!0,all:this.includeAllTagging}}get filterNameIsValid(){return this.filterName.length>0}get saveButtonIsEnabled(){return!this.saveMode||this.filterNameIsValid}get tagSuggestionsEnabled(){return this.state.listConfig.setting[V.TAG_SUGGESTIONS]!==Ae.DISABLED}get filter(){return{includeAll:this.includeAll,includeUntagged:this.includeUntagged,includeAllTagging:this.includeAllTagging,tagging:{containsOneOf:this.containsOneOf,containsAllOf:this.containsAllOf},time:this.time,text:this.text}}connectedCallback(){super.connectedCallback(),this.sync(),this.savedFilters=w.getSavedFilters()}sync(t=!1){Object.values(ot).forEach(e=>{this[e]=this.state.listFilter.tagging[e]}),this.includeUntagged=this.state.listFilter.includeUntagged,this.includeAll=this.state.listFilter.includeAll,this.includeAllTagging=this.state.listFilter.includeAllTagging,this.state.listFilter.time&&(this.time=this.state.listFilter.time),this.state.listFilter.text&&(this.text=this.state.listFilter.text)}handleIncludeUntaggedChanged(){this.includeUntagged=!this.includeUntagged}handleIncludeAllChanged(){this.includeAll=!this.includeAll}handleIncludeAllTaggingChanged(){this.includeAllTagging=!this.includeAllTagging}handleUpdateClick(t){this.state.setListFilter(this.filter),w.saveActiveFilter(this.state.listFilter),this.dispatchEvent(new Kg({})),X(p("Filter updated!"),B.INFO)}async saveFilter(){if(!this.saveMode){this.saveMode=!0,this.filterNameInput.focus();return}await w.saveFilter(this.filter,this.filterName),this.savedFilters=w.getSavedFilters(),this.filterNameInput.clear(),this.saveMode=!1,X(p("Filter saved!"),B.SUCCESS)}async handleSaveClick(t){await this.saveFilter()}handleFilterNameChanged(t){this.filterName=t.detail.value}handleFilterNameSubmitted(t){this.saveFilter()}handleSavedFilterChanged(t){this.selectedSavedFilter=this.savedFiltersInput.value;const e=this.savedFilters.find(s=>s.id===this.savedFiltersInput.value);e&&(this[ot.CONTAINS_ONE_OF]=e.filter.tagging[ot.CONTAINS_ONE_OF],this[ot.CONTAINS_ALL_OF]=e.filter.tagging[ot.CONTAINS_ALL_OF],this.includeAllTagging=e.filter.includeAllTagging,this.includeUntagged=e.filter.includeUntagged,this.includeAll=e.filter.includeAll,this.time=e.filter.time,this.text=e.filter.text)}handleDeleteSavedFilterClick(t){this.savedFiltersInput.value&&(w.deleteSavedFilter(this.savedFiltersInput.value),this.savedFiltersInput.value="",this.savedFiltersInput.dispatchEvent(new Event("change"))),this.savedFilters=w.getSavedFilters(),X(p("Filter deleted!"),B.INFO)}handleTimeChanged(t){this.time=t.detail}handleTextChanged(t){this.text=t.detail.filters}updateTags(t,e){this[t]=e}async handleTagSuggestionsRequested(t){const e=t.detail.value;if(!this.lastInput.hadResults&&e.startsWith(this.lastInput.value)||!this.tagSuggestionsEnabled){this.tagSuggestions=[];return}this.lastInput.hadResults=!1,this.lastInput.value=e;let s=[];if(e.length>=this.minLengthForSuggestion){const i=await P.get(`tag/${e}`);i&&(s=i.response.tags)}(s.length||e==="")&&(this.lastInput.hadResults=!0),this.tagSuggestions=s}render(){return c`
      <div class=${Q(this.classes)}>
        ${this.savedFilters.length?c`
              <div class="saved-filters">
                <select
                  id="saved-filters"
                  @change=${this.handleSavedFilterChanged}
                >
                  <option value="">${p("Saved filters")}</option>
                  ${z(this.savedFilters,t=>t.id,t=>c`
                      <option value=${t.id}>${t.name}</option>
                    `)}
                </select>

                ${this.selectedSavedFilter?c`
                      <ss-button
                        @click=${this.handleDeleteSavedFilterClick}
                        text=${p("Delete filter")}
                      ></ss-button>
                    `:S}
              </div>
            `:S}

        <div class="all">
          <input
            id="include-all"
            type="checkbox"
            ?checked=${this.includeAll}
            @change=${this.handleIncludeAllChanged}
          />

          <label for="include-all">${p("Include all actions")}</label>
        </div>

        <div class="filters">
          <text-filters
            .filters=${this.text}
            @text-filters-updated=${t=>this.handleTextChanged(t)}
          ></text-filters>

          <fieldset class=${Q(this.taggingClasses)}>
            <legend>${p("Tagging")}</legend>

            <div class="all">
              <input
                id="include-all-tagging"
                type="checkbox"
                ?checked=${this.includeAllTagging}
                @change=${this.handleIncludeAllTaggingChanged}
              />

              <label for="include-all-tagging">${p("Include all")}</label>
            </div>

            <div class="tag-rules">
              ${z(Object.values(ot),t=>t,t=>c`
                  <fieldset>
                    <legend>${pv[t]}</legend>

                    <tag-manager
                      ?enableSuggestions=${this.tagSuggestionsEnabled}
                      @tags-updated=${e=>{this.updateTags(t,e.detail.tags)}}
                      @tag-suggestions-requested=${this.handleTagSuggestionsRequested}
                    >
                      <div slot="tags">
                        ${z(this[t],e=>e,e=>c`<data-item>${e}</data-item>`)}
                      </div>

                      <div slot="suggestions">
                        ${z(this.tagSuggestions,e=>e,e=>c`<data-item>${e}</data-item>`)}
                      </div>
                    </tag-manager>
                  </fieldset>
                `)}
              <div>
                <input
                  id="include-untagged"
                  type="checkbox"
                  ?checked=${this.includeUntagged}
                  @change=${this.handleIncludeUntaggedChanged}
                />

                <label for="include-untagged"
                  >${p("Include actions without tags")}</label
                >
              </div>
            </div>
          </fieldset>

          <time-filters
            type=${this.time.type}
            date=${this.time.type===Z.EXACT_DATE?this.time.date:""}
            start=${this.time.type===Z.RANGE?this.time.start:""}
            end=${this.time.type===Z.RANGE?this.time.end:""}
            @time-filters-updated=${t=>this.handleTimeChanged(t)}
          ></time-filters>
        </div>

        <ss-button
          @click=${t=>{this.handleUpdateClick(t)}}
          text=${p("Use filter")}
        ></ss-button>

        <div class="save">
          <ss-input
            @input-changed=${t=>{this.handleFilterNameChanged(t)}}
            @input-submitted=${t=>{this.handleFilterNameSubmitted(t)}}
            id="filter-name"
            placeholder=${p("Filter name")}
          ></ss-input>

          <ss-button
            @click=${t=>{this.handleSaveClick(t)}}
            text=${p("Save filter")}
            ?disabled=${!this.saveButtonIsEnabled}
          ></ss-button>
        </div>
      </div>
    `}};W.styles=[H,A`
      .list-filter {
        padding: 1rem;
      }

      .list-filter.all .filters,
      .tagging.all .tag-rules {
        opacity: 0.3;
        pointer-events: none;
      }

      .save {
        position: relative;
      }

      .save ss-input {
        position: absolute;
        bottom: 0%;
        width: 100%;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
      }

      .list-filter.save-mode .save ss-input {
        bottom: 100%;
        opacity: 1;
        pointer-events: initial;
      }
    `];nt([d()],W.prototype,ha,2);nt([d()],W.prototype,ua,2);nt([d()],W.prototype,"includeUntagged",2);nt([d()],W.prototype,"includeAll",2);nt([d()],W.prototype,"includeAllTagging",2);nt([d()],W.prototype,"time",2);nt([d()],W.prototype,"text",2);nt([d()],W.prototype,"savedFilters",2);nt([d()],W.prototype,"saveMode",2);nt([d()],W.prototype,"filterName",2);nt([d()],W.prototype,"selectedSavedFilter",2);nt([d()],W.prototype,"lastInput",2);nt([d()],W.prototype,"tagSuggestions",2);nt([ft("#filter-name")],W.prototype,"filterNameInput",2);nt([ft("#saved-filters")],W.prototype,"savedFiltersInput",2);nt([d()],W.prototype,"classes",1);nt([d()],W.prototype,"taggingClasses",1);nt([d()],W.prototype,"filterNameIsValid",1);nt([d()],W.prototype,"saveButtonIsEnabled",1);W=nt([T("list-filter")],W);const fv="list-sort-updated";class ic extends CustomEvent{constructor(e){super(fv,{bubbles:!0,composed:!0,detail:e})}}var gv=Object.getOwnPropertyDescriptor,vv=(t,e,s,i)=>{for(var n=i>1?void 0:i?gv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=o(n)||n);return n};const _v={[Ce.CREATED_AT]:p("sortProperty.createdAt"),[Ce.DESC]:p("sortProperty.desc"),[Ce.OCCURRED_AT]:p("sortProperty.occurredAt")},yv={[pe.ASC]:p("sortDirection.asc"),[pe.DESC]:p("sortDirection.desc")};let pa=class extends Ht{constructor(){super(...arguments),this.state=gt}handlePropertyChanged(t){const s={property:t.detail.value,direction:this.state.listSort.direction};this.state.setListSort(s),this.dispatchEvent(new ic({sort:s}))}handleDirectionChanged(t){const e=t.detail.value,s={property:this.state.listSort.property,direction:e};this.state.setListSort(s),this.dispatchEvent(new ic({sort:s}))}render(){return c`
      <div class="box">
        <div>${p("Sort by")}</div>
        <div>
          <ss-select
            selected=${this.state.listSort.property}
            @select-changed=${t=>{this.handlePropertyChanged(t)}}
            .options=${Object.values(Ce).map(t=>({value:t,label:_v[t]}))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listSort.direction}
            @select-changed=${t=>{this.handleDirectionChanged(t)}}
            .options=${Object.values(pe).map(t=>({value:t,label:yv[t]}))}
          >
          </ss-select>
        </div>
      </div>
    `}};pa.styles=[H,A`
      .box {
        padding: 1rem;
      }
    `];pa=vv([T("list-sort"),Is()],pa);const mv="list-context-updated";class bv extends CustomEvent{constructor(e){super(mv,{bubbles:!0,composed:!0,detail:e})}}var Ev=Object.defineProperty,Tv=Object.getOwnPropertyDescriptor,ld=(t,e,s,i)=>{for(var n=i>1?void 0:i?Tv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Ev(e,s,n),n};const Sv={[ce.MINUTE]:[1,2,3,4,5,6,7,8,9,10,15,20,25,30,40,45,50,55,60],[ce.HOUR]:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],[ce.DAY]:[1,2,3,4,5,6,7]},Cv={[ce.MINUTE]:p("contextUnit.minute"),[ce.HOUR]:p("contextUnit.hour"),[ce.DAY]:p("contextUnit.day")},Av={[fe.BEFORE]:p("contextType.before"),[fe.AFTER]:p("contextUnit.after")};let qi=class extends Ht{constructor(){super(...arguments),this.state=gt}get quantities(){return Sv[this.state.listContext.unit]}_handleToggleEnabled(t){const e=!this.state.listContextMode;this.state.setListContextMode(e),w.saveListContextMode(e)}_handleTypeChanged(t){this.setListContext({...this.state.listContext,type:t.detail.value})}_handleQuantityChanged(t){this.setListContext({...this.state.listContext,quantity:t.detail.value})}_handleUnitChanged(t){this.setListContext({...this.state.listContext,unit:t.detail.value})}setListContext(t){this.state.setListContext(t),w.saveListContext(t)}_handleUpdateClick(){this.dispatchEvent(new bv({listContext:this.state.listContext}))}get classes(){return{box:!0,enabled:this.state.listContextMode}}render(){return c`
      <div class=${Q(this.classes)}>
        <div>
          <input
            type="checkbox"
            @change=${t=>{this._handleToggleEnabled(t)}}
            ?checked=${this.state.listContextMode}
          />
          ${p("Include context")}
        </div>

        <div class="input">
          <ss-select
            selected=${this.state.listContext.type}
            @select-changed=${t=>{this._handleTypeChanged(t)}}
            .options=${Object.values(fe).map(t=>({value:t,label:Av[t]}))}
          >
          </ss-select>

          <ss-select
            selected=${`${this.state.listContext.quantity}`}
            @select-changed=${t=>{this._handleQuantityChanged(t)}}
            .options=${this.quantities.map(t=>({value:`${t}`,label:`${t}`}))}
          >
          </ss-select>

          <ss-select
            selected=${this.state.listContext.unit}
            @select-changed=${t=>{this._handleUnitChanged(t)}}
            .options=${Object.values(ce).map(t=>({value:t,label:Cv[t]}))}
          >
          </ss-select>

          <ss-button
            @click=${()=>{this._handleUpdateClick()}}
            text=${p("useContext")}
          ></ss-button>
        </div>
      </div>
    `}};qi.styles=[H,A`
      .box {
        padding: 1rem;

        .input {
          opacity: 0.3;
          pointer-events: none;
        }

        &.enabled {
          .input {
            opacity: 1;
            pointer-events: initial;
          }
        }
      }
    `];ld([d()],qi.prototype,"quantities",1);ld([d()],qi.prototype,"classes",1);qi=ld([T("list-context")],qi);var ls=(t=>(t.START="start",t.TOTAL="total",t.PER_PAGE="perPage",t))(ls||{});const Mr={start:{default:1,control:{type:f.NUMBER},description:"The current starting offset in the list"},total:{default:10,control:{type:f.NUMBER},description:"The total number of items in the list"},perPage:{default:0,control:{type:f.NUMBER},description:"The number of items to be displayed per page"}},$v="page-changed";class jr extends CustomEvent{constructor(e){super($v,{bubbles:!0,composed:!0,detail:e})}}var Ov=Object.defineProperty,Iv=Object.getOwnPropertyDescriptor,Je=(t,e,s,i)=>{for(var n=i>1?void 0:i?Iv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Ov(e,s,n),n},fa,ga,va,nc;let ge=class extends(nc=O,va=ls.START,ga=ls.TOTAL,fa=ls.PER_PAGE,nc){constructor(){super(...arguments),this[va]=Mr[ls.START].default,this[ga]=Mr[ls.TOTAL].default,this[fa]=Mr[ls.PER_PAGE].default,this.maxPagesToShow=0}get pages(){return Math.ceil(this.total/this.perPage)}get page(){return Math.ceil(this.start/this.perPage)+1}get quickPages(){if(this.pages===1)return[1];const t=[];if(this.pages<=this.maxPagesToShow)for(let e=1;e<=this.pages;e++)t.push(e);else{t.push(1);const e=Math.max(2,this.page-2),s=Math.min(this.pages-1,this.page+2);e>2&&t.push(0);for(let i=e;i<=s;i++)t.push(i);s<this.pages-1&&t.push(0),t.push(this.pages)}return t}prevPage(){if(this.page>1){const t=this.start-this.perPage;this.dispatchEvent(new jr({start:t<0?0:t}))}}nextPage(){this.page+1<=this.pages&&this.dispatchEvent(new jr({start:this.start+this.perPage}))}goToPage(t){this.dispatchEvent(new jr({start:(t-1)*this.perPage}))}render(){return this.pages>1?c`
          <div class="paginator box">
            <div class="left">
              <button text="" @click=${this.prevPage}>&#x21e6;</button>
            </div>

            <div class="center">
              <div class="pages">
                ${this.quickPages.map(t=>t===0?c`<span>...</span>`:c`<button
                        class=${Q({"quick-page":!0,active:t===this.page})}
                        @click=${()=>this.goToPage(t)}
                      >
                        ${t}
                      </button>`)}
              </div>
            </div>

            <div class="right">
              <button text="" @click=${this.nextPage}>&#x21e8;</button>
            </div>
          </div>
        `:S}};ge.styles=[H,A`
      :host {
        display: block;
      }
      .paginator {
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25rem;
      }

      .pages {
        display: flex;
        gap: 0.25rem;
      }

      .quick-page {
        color: #777;

        &.active {
          color: #000;
          font-weight: bold;
        }
      }

      button {
        cursor: pointer;
        border-radius: 8px;
        border: 1px #aaa solid;
        transition: all 0.2s;

        &:hover {
          background-color: #ccc;
        }
      }
      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
    `];Je([u({type:Number})],ge.prototype,va,2);Je([u({type:Number})],ge.prototype,ga,2);Je([u({type:Number})],ge.prototype,fa,2);Je([d()],ge.prototype,"maxPagesToShow",2);Je([d()],ge.prototype,"pages",1);Je([d()],ge.prototype,"page",1);Je([d()],ge.prototype,"quickPages",1);ge=Je([T("list-paginator")],ge);class wv{constructor(e=300){this.wait=e,this.timerId=null}debounce(e,...s){this.timerId&&clearTimeout(this.timerId),this.timerId=setTimeout(()=>{e(...s),this.timerId=null},this.wait)}cancel(){this.timerId&&(clearTimeout(this.timerId),this.timerId=null)}}var Un=(t=>(t.LIST_CONFIG_ID="listConfigId",t))(Un||{});const xv={listConfigId:{default:"",control:{type:f.TEXT},description:"The ID of the list configuration the settings are for"}};var Pi=(t=>(t.NAME="name",t.VALUE="value",t))(Pi||{});const rc={name:{default:"",control:{type:f.TEXT},description:"The name of the setting"},value:{default:!1,control:{type:f.BOOLEAN},description:"The value of the setting"}},Pv="setting-updated";class ur extends CustomEvent{constructor(e){super(Pv,{bubbles:!0,composed:!0,detail:e})}}const Nv="toggle-changed";class Lv extends CustomEvent{constructor(e){super(Nv,{bubbles:!0,composed:!0,detail:e})}}var je;(function(t){t.ON="on",t.HIGHLIGHT_TIME="highlightTime"})(je||(je={}));const oc={[je.ON]:{default:!1,description:"Whether the toggle is in enabled state",control:"boolean"},[je.HIGHLIGHT_TIME]:{default:350,description:"Time in milliseconds to highlight the toggle when clicked",control:"number"}};var mn=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},_a,ya,Zs;let ui=(Zs=class extends O{constructor(){super(...arguments),this[_a]=oc[je.ON].default,this[ya]=oc[je.HIGHLIGHT_TIME].default,this.highlight=!1}get classes(){return{toggle:!0,on:this.on,highlight:this.highlight}}handleClick(){this.highlight=!0;const e=!this.on;this.on=e,this.dispatchEvent(new Lv({on:e})),setTimeout(()=>{this.highlight=!1},this.highlightTime)}render(){return c`
      <span
        part="container"
        class=${Q(this.classes)}
        @click=${this.handleClick}
        style="--highlight-time: ${this.highlightTime}ms"
      >
        <span part="indicator" class="ball"></span>
      </span>
    `}},_a=je.ON,ya=je.HIGHLIGHT_TIME,Zs.styles=A`
    .toggle {
      display: inline-block;
      height: 3rem;
      width: 6rem;
      border-radius: 1.5rem;
      background: linear-gradient(#777, #999);
      position: relative;
      transition: all 0.1s;
      cursor: pointer;

      &:hover {
        scale: 1.05;
      }

      &.highlight {
        animation: highlight var(--highlight-time) ease-in-out;
      }
    }

    .toggle::before {
      content: '';
      position: absolute;
      height: 2.4rem;
      width: 5.4rem;
      top: 0.3rem;
      left: 0.3rem;

      background: linear-gradient(#ccc, #aaa);
      border-radius: 1.2rem;
    }

    .toggle.on {
      .ball {
        opacity: 1;
      }
    }

    .toggle.on .ball {
      left: 3.5rem;
    }

    .ball {
      opacity: 0.35;
      position: absolute;
      display: inline-block;
      height: 2rem;
      width: 2rem;
      left: 0.5rem;
      top: 0.5rem;
      background: linear-gradient(45deg, #555, #777);
      border-radius: 1rem;
      border: 2px #222 solid;
      box-sizing: border-box;
      transition: all 0.3s;
    }

    @keyframes highlight {
      0% {
        box-shadow: 0 0 0px rgba(0, 0, 0, 0);
      }
      50% {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      100% {
        box-shadow: 0 0 0px rgba(0, 0, 0, 0);
      }
    }
  `,Zs);mn([u({type:Boolean,reflect:!0})],ui.prototype,_a,void 0);mn([u({type:Number,reflect:!0})],ui.prototype,ya,void 0);mn([d()],ui.prototype,"highlight",void 0);mn([d()],ui.prototype,"classes",null);ui=mn([T("ss-toggle")],ui);var Dv=Object.defineProperty,Rv=Object.getOwnPropertyDescriptor,dd=(t,e,s,i)=>{for(var n=i>1?void 0:i?Rv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Dv(e,s,n),n},ma,ba,ac;let Wi=class extends(ac=O,ba=Pi.NAME,ma=Pi.VALUE,ac){constructor(){super(...arguments),this[ba]=rc[Pi.NAME].default,this[ma]=rc[Pi.VALUE].default}handleToggleChanged(t){this.dispatchEvent(new ur({name:this.name,value:t.detail.on}))}render(){return c`
      <div class="boolean-setting">
        <label>${this.name}</label>

        <ss-toggle
          on=${this.value}
          @toggle-changed=${this.handleToggleChanged}
        ></ss-toggle>
      </div>
    `}};Wi.styles=[H,A`
      .boolean-setting {
        padding: 1rem;
      }
    `];dd([u()],Wi.prototype,ba,2);dd([u({type:Boolean})],Wi.prototype,ma,2);Wi=dd([T("boolean-setting"),Is()],Wi);var zt=(t=>(t.NAME="name",t.VALUE="value",t.MIN="min",t.MAX="max",t.STEP="step",t))(zt||{});const xi={name:{default:"",control:{type:f.TEXT},description:"The name of the setting"},value:{default:0,control:{type:f.NUMBER},description:"The value of the setting"},min:{default:0,control:{type:f.NUMBER},description:"The minimum value of the setting"},max:{default:100,control:{type:f.NUMBER},description:"The maximum value of the setting"},step:{default:1,control:{type:f.NUMBER},description:"The step value of the setting"}};var Uv=Object.defineProperty,Mv=Object.getOwnPropertyDescriptor,Si=(t,e,s,i)=>{for(var n=i>1?void 0:i?Mv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Uv(e,s,n),n},Ea,Ta,Sa,Ca,Aa,lc;let Ye=class extends(lc=O,Aa=zt.NAME,Ca=zt.VALUE,Sa=zt.MIN,Ta=zt.MAX,Ea=zt.STEP,lc){constructor(){super(...arguments),this[Aa]=xi[zt.NAME].default,this[Ca]=xi[zt.VALUE].default,this[Sa]=xi[zt.MIN].default,this[Ta]=xi[zt.MAX].default,this[Ea]=xi[zt.STEP].default}handleInputChanged(t){this.dispatchEvent(new ur({name:this.name,value:parseInt(t.detail.value)}))}render(){return c`
      <div class="number-setting">
        <label>${this.name}</label>

        <ss-input
          type="number"
          value=${this.value}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          @input-changed=${this.handleInputChanged}
        ></ss-input>
      </div>
    `}};Ye.styles=[H,A`
      .number-setting {
        padding: 1rem;
      }
    `];Si([u()],Ye.prototype,Aa,2);Si([u({type:Number})],Ye.prototype,Ca,2);Si([u({type:Number})],Ye.prototype,Sa,2);Si([u({type:Number})],Ye.prototype,Ta,2);Si([u({type:Number})],Ye.prototype,Ea,2);Ye=Si([T("number-setting"),Is()],Ye);var ds=(t=>(t.NAME="name",t.VALUE="value",t.OPTIONS="options",t))(ds||{});const Fr={name:{default:"",control:{type:f.TEXT},description:"The name of the setting"},value:{default:"",control:{type:f.TEXT},description:"The value of the setting"},options:{default:[],control:{type:f.TEXT},description:"The options of the setting"}};var jv=Object.defineProperty,Fv=Object.getOwnPropertyDescriptor,hr=(t,e,s,i)=>{for(var n=i>1?void 0:i?Fv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&jv(e,s,n),n},$a,Oa,Ia,dc;let hi=class extends(dc=O,Ia=ds.NAME,Oa=ds.VALUE,$a=ds.OPTIONS,dc){constructor(){super(...arguments),this[Ia]=Fr[ds.NAME].default,this[Oa]=Fr[ds.VALUE].default,this[$a]=Fr[ds.OPTIONS].default}handleSelectChanged(t){this.dispatchEvent(new ur({name:this.name,value:t.detail.value}))}render(){return c`
      <div class="select-setting">
        <label>${this.name}</label>

        <ss-select
          @select-changed=${this.handleSelectChanged}
          selected=${this.value}
          .options=${this.options.map(t=>({label:t,value:t}))}
        ></ss-select>
      </div>
    `}};hi.styles=[H,A`
      .select-setting {
        padding: 1rem;
      }
    `];hr([u()],hi.prototype,Ia,2);hr([u()],hi.prototype,Oa,2);hr([u({type:Array})],hi.prototype,$a,2);hi=hr([T("select-setting"),Is()],hi);var Ni=(t=>(t.NAME="name",t.VALUE="value",t))(Ni||{});const cc={name:{default:"",control:{type:f.TEXT},description:"The name of the setting"},value:{default:"",control:{type:f.TEXT},description:"The value of the setting"}};var Vv=Object.defineProperty,Bv=Object.getOwnPropertyDescriptor,cd=(t,e,s,i)=>{for(var n=i>1?void 0:i?Bv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Vv(e,s,n),n},wa,xa,uc;let Ki=class extends(uc=O,xa=Ni.NAME,wa=Ni.VALUE,uc){constructor(){super(...arguments),this[xa]=cc[Ni.NAME].default,this[wa]=cc[Ni.VALUE].default}handleInputChanged(t){this.dispatchEvent(new ur({name:this.name,value:t.detail.value}))}render(){return c`
      <div class="text-setting">
        <label>${this.name}</label>

        <ss-input
          @input-changed=${this.handleInputChanged}
          value=${this.value}
        ></ss-input>
      </div>
    `}};Ki.styles=[H,A`
      .text-setting {
        padding: 1rem;
      }
    `];cd([u()],Ki.prototype,xa,2);cd([u()],Ki.prototype,wa,2);Ki=cd([T("text-setting"),Is()],Ki);var Gv=Object.defineProperty,Hv=Object.getOwnPropertyDescriptor,Zu=(t,e,s,i)=>{for(var n=i>1?void 0:i?Hv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Gv(e,s,n),n},Pa,hc;let Na=class extends(hc=Ht,Pa=Un.LIST_CONFIG_ID,hc){constructor(){super(...arguments),this.state=gt,this.saveDebouncer=new wv(300),this[Pa]=xv[Un.LIST_CONFIG_ID].default}renderSetting(t){switch(t.control.type){case re.NUMBER:return c`<number-setting
          name=${t.name}
          value=${this.state.listConfig.setting[t.name]}
          min=${Vs(t.control.min)}
          max=${Vs(t.control.max)}
          step=${Vs(t.control.step)}
          @setting-updated=${this.handleSettingUpdated}
        ></number-setting>`;case re.SELECT:return c`<select-setting
          name=${t.name}
          value=${this.state.listConfig.setting[t.name]}
          .options=${t.control.options}
          @setting-updated=${this.handleSettingUpdated}
        ></select-setting>`;case re.TEXT:return c`<text-setting
          name=${t.name}
          value=${this.state.listConfig.setting[t.name]}
          @setting-updated=${this.handleSettingUpdated}
        ></text-setting>`}}async handleSettingUpdated(t){this.saveDebouncer.cancel(),this.saveDebouncer.debounce(async()=>{const e=t.detail;if(await w.saveSetting(this[Un.LIST_CONFIG_ID],e)){this.state.setSetting(e),X(p("Setting updated"),B.SUCCESS);return}X(p("Failed to update setting"),B.ERROR)})}render(){return c`
      <form>
        ${Object.values(Bf).map(t=>this.renderSetting(t))}
      </form>
    `}};Zu([u()],Na.prototype,Pa,2);Na=Zu([T("setting-form"),Is()],Na);var Xv=Object.defineProperty,kv=Object.getOwnPropertyDescriptor,mt=(t,e,s,i)=>{for(var n=i>1?void 0:i?kv(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Xv(e,s,n),n};let at=class extends gn{constructor(){super(...arguments),this.state=gt,this.scrollHandler=()=>this.handleScroll(),this.start=0,this.total=0,this.loading=!1,this.filterIsOpen=!1,this.settingIsOpen=!1,this.sortIsOpen=!1,this.contextIsOpen=!1,this.actionContextIsOpen=new Map}get perPage(){return this.state.listSetting[V.PAGINATION_PAGE_SIZE]}get totalShown(){return this.start+this.perPage}get reachedEnd(){return this.totalShown>=this.total}get sortIsDefault(){return this.state.listSort.direction===pe.DESC&&this.state.listSort.property===Ce.OCCURRED_AT}get lazyLoaderIsVisible(){const t=this.lazyLoader.getBoundingClientRect(),e=window.innerHeight||document.documentElement.clientHeight;return t.bottom<=e}get paginationType(){return this.state.listSetting[V.PAGINATION_TYPE]??Dt.LAZY}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this.scrollHandler),this.state.lastListUrl!==this.getUrl()&&(this.state.setListItems([]),this.state.setContextListItems([])),this.load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.scrollHandler)}sync(t=!1){t&&(this.start=0),this.listFilter.sync(),this.load()}handleItemDeleted(t){this.state.setListItems(this.state.listItems.filter(e=>e.id!==t.detail.id))}handleItemUpdated(t){const e=this.state.listItems.map(s=>s.id===t.detail.id?{...s,desc:t.detail.desc,occurredAt:t.detail.occurredAt,tags:t.detail.tags}:s).sort((s,i)=>this.state.listSort.direction===pe.DESC?i[this.state.listSort.property].localeCompare(s[this.state.listSort.property]):s[this.state.listSort.property].localeCompare(i[this.state.listSort.property]));this.state.setListItems(e)}handleScroll(){this.paginationType===Dt.LAZY&&this.lazyLoaderIsVisible&&!this.loading&&!this.reachedEnd&&this.load(!0)}getUrl(t=!1){t&&(this.start+=this.perPage);const e={perPage:`${this.perPage}`,...this.start>0?{start:`${this.start}`}:{},...this.state.listFilter.includeAll?{}:{filter:JSON.stringify(this.state.listFilter)},...this.sortIsDefault?{}:{sort:JSON.stringify(this.state.listSort)},...this.state.listContextMode?{context:JSON.stringify(this.state.listContext)}:{}};return`action${Object.keys(e).length?`?${new URLSearchParams(e)}`:""}`}async load(t=!1){this.loading=!0;try{const e=this.getUrl(t);this.state.setLastListUrl(e);const s=await P.get(e);s&&(s.response.actions&&this.state.setListItems(t?[...this.state.listItems,...s.response.actions]:[...s.response.actions]),s.response.context&&(this.state.setContextListItems({...this.state.contextListItems,...s.response.context}),this.actionContextIsOpen=new Map,Object.keys(s.response.context).forEach(i=>{this.actionContextIsOpen.set(parseInt(i),!1)})),s.response.total&&(this.total=s.response.total))}catch(e){console.error(`Failed to get list: ${JSON.stringify(e)}`)}finally{this.ready=!0,this.loading=!1}}handleFilterUpdated(t){this.filterIsOpen=!1,this.load()}handleSortUpdated(t){this.load()}handleSettingUpdated(t){this.load()}handleContextUpdated(t){this.load()}handlePageChanged(t){this.start=t.detail.start,this.load()}toggleSetting(){this.settingIsOpen=!this.settingIsOpen}toggleFilter(){this.filterIsOpen=!this.filterIsOpen}toggleSort(){this.sortIsOpen=!this.sortIsOpen}toggleContext(){this.contextIsOpen=!this.contextIsOpen}toggleActionContext(t){this.actionContextIsOpen.get(t)?this.actionContextIsOpen.set(t,!1):this.actionContextIsOpen.set(t,!0),this.requestUpdate()}handlePointerLongPress(t){const e=t.target;this.state.toggleActionSelection(e.actionId)}handlePointerUp(t){const e=t.target;if(!this.state.selectMode){e.setMode(Ju.EDIT);return}this.state.toggleActionSelection(e.actionId)}renderContextActions(t,e){var s;return this.state.listContext.type===t&&((s=this.state.contextListItems[e.id])!=null&&s.length)?c`
          <ss-collapsable
            title=${p("Show context")}
            @toggled=${()=>{this.toggleActionContext(e.id)}}
            ?open=${this.actionContextIsOpen.get(e.id)}
          >
            ${this.state.contextListItems[e.id].map(i=>c`
                <action-list-item
                  ?debug=${this.state.debugMode}
                  actionId=${i.id}
                  type=${i.type}
                  desc=${i.desc}
                  occurredAt=${i.occurredAt}
                  .tags=${i.tags}
                  ?selected=${this.state.selectedActions.includes(i.id)}
                  @pointer-long-press=${this.handlePointerLongPress}
                  @pointer-up=${this.handlePointerUp}
                ></action-list-item>
              `)}
          </ss-collapsable>
        `:S}render(){return c`
      <ss-collapsable
        title=${p("Settings")}
        ?open=${this.settingIsOpen}
        @toggled=${this.toggleSetting}
      >
        <setting-form
          listConfigId=${this.state.listConfigId}
          @setting-updated=${this.handleSettingUpdated}
        ></setting-form>
      </ss-collapsable>

      <ss-collapsable
        title=${p("Filter")}
        ?open=${this.filterIsOpen}
        @toggled=${this.toggleFilter}
      >
        <div class="filter-body">
          <list-filter
            @filter-updated=${this.handleFilterUpdated}
          ></list-filter>
        </div>
      </ss-collapsable>

      <ss-collapsable
        title=${p("Sort")}
        ?open=${this.sortIsOpen}
        @toggled=${this.toggleSort}
      >
        <list-sort @list-sort-updated=${this.handleSortUpdated}></list-sort>
      </ss-collapsable>

      ${this.state.listFilter.includeAll?S:c`
            <ss-collapsable
              title=${p("Context")}
              ?open=${this.contextIsOpen}
              @toggled=${this.toggleContext}
            >
              <list-context
                @list-context-updated=${this.handleContextUpdated}
              ></list-context>
            </ss-collapsable>
          `}

      <div class="box list-items">
        ${this.loading?c` <ss-loader padded></ss-loader> `:S}
        ${this.state.listItems.length?z(this.state.listItems,t=>t.id,t=>c`
                ${this.renderContextActions(fe.AFTER,t)}
                <action-list-item
                  ?debug=${this.state.debugMode}
                  actionId=${t.id}
                  type=${t.type}
                  desc=${t.desc}
                  occurredAt=${t.occurredAt}
                  .tags=${t.tags}
                  ?selected=${this.state.selectedActions.includes(t.id)}
                  @pointer-long-press=${this.handlePointerLongPress}
                  @pointer-up=${this.handlePointerUp}
                  @action-item-deleted=${this.handleItemDeleted}
                  @action-item-updated=${this.handleItemUpdated}
                ></action-list-item>
                ${this.renderContextActions(fe.BEFORE,t)}
              `):this.loading?S:c` <div class="no-actions">${p("No actions found")}</div>`}
        <div id="lazy-loader"></div>
      </div>
      ${this.paginationType===Dt.NAVIGATION?c`
            <list-paginator
              @page-changed=${this.handlePageChanged}
              start=${this.start}
              total=${this.total}
              perPage=${this.perPage}
            ></list-paginator>
          `:this.paginationType===Dt.MORE_BUTTON&&!this.reachedEnd?c`
              <div class="more box">
                <ss-button
                  text=${p("Load more")}
                  @click=${()=>this.load(!0)}
                  ?loading=${this.loading}
                  ?disabled=${this.loading}
                ></ss-button>
              </div>
            `:S}
    `}};at.styles=[H,A`
      ss-collapsable {
        display: block;
        margin-top: 1rem;
      }

      .list-items {
        margin-top: 1rem;
        overflow: hidden;
      }

      .no-actions {
        padding: 1rem;
      }

      .more {
        margin-top: 1rem;
      }
    `];mt([ft("#lazy-loader")],at.prototype,"lazyLoader",2);mt([ft("list-filter")],at.prototype,"listFilter",2);mt([d()],at.prototype,"start",2);mt([d()],at.prototype,"total",2);mt([d()],at.prototype,"loading",2);mt([d()],at.prototype,"filterIsOpen",2);mt([d()],at.prototype,"settingIsOpen",2);mt([d()],at.prototype,"sortIsOpen",2);mt([d()],at.prototype,"contextIsOpen",2);mt([d()],at.prototype,"actionContextIsOpen",2);mt([d()],at.prototype,"perPage",1);mt([d()],at.prototype,"totalShown",1);mt([d()],at.prototype,"reachedEnd",1);mt([d()],at.prototype,"sortIsDefault",1);mt([d()],at.prototype,"paginationType",1);at=mt([T("action-list")],at);var R;(function(t){t.BOOLEAN="boolean",t.IMAGE="image",t.INT="int",t.LONG_TEXT="longText",t.SHORT_TEXT="shortText"})(R||(R={}));var Ji;(function(t){t.TEXT="text",t.IMAGE="image",t.NUMBER="number",t.HIDDEN="hidden"})(Ji||(Ji={}));const Oe={entityConfigId:0,id:0,userId:"",name:"",prefix:"",suffix:"",required:0,repeat:1,allowed:1,dataType:R.SHORT_TEXT,renderType:Ji.TEXT,defaultValue:""},Qu={id:0,userId:"",name:"",description:"",properties:[]};var St=(t=>(t.ENTITY_ID="entityId",t.TYPE="type",t.DESC="desc",t.OCCURRED_AT="occurredAt",t.TAGS="tags",t.TAG_VALUE="tagValue",t.PROPERTIES="properties",t))(St||{});const os={entityId:{default:0,control:{type:f.NUMBER},description:"The ID of the entity"},type:{default:0,control:{type:f.NUMBER},description:"The type of the entity"},desc:{default:"",control:{type:f.TEXT},description:"The description of the entity"},occurredAt:{default:"",control:{type:f.TEXT},description:"The occurrence date of the entity"},tags:{default:[],control:{type:f.TEXT},description:"The tags of the entity"},tagValue:{default:"",control:{type:f.TEXT},description:"The value of the tag"},properties:{default:[],control:{type:f.TEXT},description:"The properties of the entity"}};var La=(t=>(t.TAG="tag",t.ACTION="action",t))(La||{});const Yv="entity-item-updated";class zv extends CustomEvent{constructor(e){super(Yv,{bubbles:!0,composed:!0,detail:e})}}const qv="entity-item-deleted";class Wv extends CustomEvent{constructor(e){super(qv,{bubbles:!0,composed:!0,detail:e})}}const Kv="entity-item-canceled";class Jv extends CustomEvent{constructor(e){super(Kv,{bubbles:!0,composed:!0,detail:e})}}const Zv="property-changed";class ud extends CustomEvent{constructor(e){super(Zv,{detail:e})}}var cs=(t=>(t.INSTANCE_ID="instanceId",t.VALUE="value",t.PLACEHOLDER="placeholder",t.LABEL="label",t.PROPERTY_CONFIG="propertyConfig",t))(cs||{});const pc={instanceId:{default:0,control:{type:f.NUMBER},description:"The instance ID of the text field"},value:{default:"",control:{type:f.TEXT},description:"The value of the text field"},placeholder:{default:"",control:{type:f.TEXT},description:"The placeholder text for the text field"},label:{default:"",control:{type:f.TEXT},description:"The label text for the text field"},propertyConfig:{default:{...Oe,dataType:R.SHORT_TEXT,defaultValue:""},control:{type:f.TEXT},description:"The property configuration for the text field"}};var Qv=Object.defineProperty,t_=Object.getOwnPropertyDescriptor,pr=(t,e,s,i)=>{for(var n=i>1?void 0:i?t_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Qv(e,s,n),n},Da,Ra,fc;let Zi=class extends(fc=O,Ra=cs.INSTANCE_ID,Da=cs.VALUE,fc){constructor(){super(...arguments),this[Ra]=pc[cs.INSTANCE_ID].default,this.propertyConfig=Oe,this[Da]=pc[cs.VALUE].default}handleInputChanged(t){const e=t.detail.value;this.dispatchEvent(new ud({propertyId:this.propertyConfig.id,instanceId:this[cs.INSTANCE_ID],dataType:this.propertyConfig.dataType,value:e}))}render(){return c`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        <ss-input
          value=${this[cs.VALUE]}
          @input-changed=${this.handleInputChanged}
        ></ss-input>
      </div>
    `}};pr([u({type:Number})],Zi.prototype,Ra,2);pr([u({type:Object})],Zi.prototype,"propertyConfig",2);pr([u({type:String})],Zi.prototype,Da,2);Zi=pr([T("text-field")],Zi);var us=(t=>(t.INSTANCE_ID="instanceId",t.VALUE="value",t.PLACEHOLDER="placeholder",t.LABEL="label",t.PROPERTY_CONFIG="propertyConfig",t))(us||{});const gc={instanceId:{default:0,control:{type:f.NUMBER},description:"The instance ID of the input field"},value:{default:0,control:{type:f.NUMBER},description:"The value of the input field"},placeholder:{default:"",control:{type:f.TEXT},description:"The placeholder text for the input field"},label:{default:"",control:{type:f.TEXT},description:"The label text for the input field"},propertyConfig:{default:Oe,control:{type:f.TEXT},description:"The property configuration for the input field"}};var e_=Object.defineProperty,s_=Object.getOwnPropertyDescriptor,fr=(t,e,s,i)=>{for(var n=i>1?void 0:i?s_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&e_(e,s,n),n},Ua,Ma,vc;let Qi=class extends(vc=O,Ma=us.INSTANCE_ID,Ua=us.VALUE,vc){constructor(){super(...arguments),this[Ma]=gc[us.INSTANCE_ID].default,this.propertyConfig=Oe,this[Ua]=gc[us.VALUE].default}handleInputChanged(t){const e=parseInt(t.detail.value);isNaN(e)||this.dispatchEvent(new ud({propertyId:this.propertyConfig.id,instanceId:this[us.INSTANCE_ID],dataType:this.propertyConfig.dataType,value:e}))}render(){return c`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        <ss-input
          type="number"
          value=${this[us.VALUE]}
          @input-changed=${this.handleInputChanged}
        ></ss-input>
      </div>
    `}};fr([u({type:Number})],Qi.prototype,Ma,2);fr([u({type:Object})],Qi.prototype,"propertyConfig",2);fr([u({type:Number})],Qi.prototype,Ua,2);Qi=fr([T("int-field")],Qi);var ie=(t=>(t.INSTANCE_ID="instanceId",t.VALUE="value",t.PLACEHOLDER="placeholder",t.LABEL="label",t.PROPERTY_CONFIG="propertyConfig",t.SRC="src",t.ALT="alt",t))(ie||{});const wn={instanceId:{default:0,control:{type:f.NUMBER},description:"The instance ID of the image field"},value:{default:{src:"",alt:""},control:{type:f.IMAGE,src:"",alt:""},description:"The value of the image field"},placeholder:{default:"",control:{type:f.TEXT},description:"The placeholder text for the image field"},label:{default:"",control:{type:f.TEXT},description:"The label text for the image field"},propertyConfig:{default:Oe,control:{type:f.TEXT},description:"The property configuration for the image field"},src:{default:"",control:{type:f.TEXT},description:"The source URL for the image field"},alt:{default:"",control:{type:f.TEXT},description:"The alt text for the image field"}};var i_=Object.defineProperty,n_=Object.getOwnPropertyDescriptor,Ci=(t,e,s,i)=>{for(var n=i>1?void 0:i?n_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&i_(e,s,n),n},ja,Fa,Va,Ba,_c;let Ts=class extends(_c=O,Ba=ie.INSTANCE_ID,Va=ie.VALUE,Fa=ie.SRC,ja=ie.ALT,_c){constructor(){super(...arguments),this[Ba]=wn[ie.INSTANCE_ID].default,this.propertyConfig=Oe,this[Va]=wn[ie.VALUE].default,this[Fa]=wn[ie.SRC].default,this[ja]=wn[ie.ALT].default}handleValueChanged(t){this.dispatchEvent(new ud({propertyId:this.propertyConfig.id,instanceId:this[ie.INSTANCE_ID],dataType:this.propertyConfig.dataType,value:t}))}handleSrcChanged(t){this.handleValueChanged({src:t.detail.value,alt:this.alt})}handleAltChanged(t){this.handleValueChanged({src:this.src,alt:t.detail.value})}render(){return c`
      <div class="property">
        <label for=${`property-${this.propertyConfig.id}`}
          >${this.propertyConfig.name}</label
        >
        <ss-input
          type="text"
          value=${this.src}
          placeholder="Image URL"
          @input-changed=${this.handleSrcChanged}
        ></ss-input>

        <ss-input
          type="text"
          value=${this.alt}
          placeholder="Image Alt Text"
          @input-changed=${this.handleAltChanged}
        ></ss-input>
      </div>
    `}};Ci([u({type:Number})],Ts.prototype,Ba,2);Ci([u({type:Object})],Ts.prototype,"propertyConfig",2);Ci([u({type:Object})],Ts.prototype,Va,2);Ci([u({type:String})],Ts.prototype,Fa,2);Ci([u({type:String})],Ts.prototype,ja,2);Ts=Ci([T("image-field")],Ts);var r_=Object.defineProperty,o_=Object.getOwnPropertyDescriptor,K=(t,e,s,i)=>{for(var n=i>1?void 0:i?o_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&r_(e,s,n),n},Ga,Ha,Xa,ka,Ya,za,qa,yc;let k=class extends(yc=gn,qa=St.ENTITY_ID,za=St.TYPE,Ya=St.DESC,ka=St.OCCURRED_AT,Xa=St.TAGS,Ha=St.TAG_VALUE,Ga=St.PROPERTIES,yc){constructor(){super(...arguments),this.state=gt,this.minLengthForSuggestion=1,this.suggestionTimeout=null,this.abortController=null,this[qa]=os[St.ENTITY_ID].default,this[za]=os[St.TYPE].default,this[Ya]=os[St.DESC].default,this[ka]=os[St.OCCURRED_AT].default,this[Xa]=os[St.TAGS].default,this[Ha]=os[St.TAG_VALUE].default,this[Ga]=os[St.PROPERTIES].default,this.initialDesc="",this.initialOccurredAt="",this.initialTags="",this.confirmModalShown=!1,this.advancedMode=!1,this.loading=!1,this.lastInput={[La.ACTION]:{value:"",hadResults:!0},[La.TAG]:{value:"",hadResults:!0}},this.tagSuggestions=[]}get classes(){return{box:!0,"advanced-mode":this.state.advancedMode}}get tagsAndSuggestions(){return Array.from(new Set([...this.tags,...this.state.tagSuggestions]))}get tagSuggestionsEnabled(){return this.state.listConfig.setting[V.TAG_SUGGESTIONS]!==Ae.DISABLED}get entityConfig(){return this.state.entityConfigs.find(t=>t.id===this.type)}get canAddProperty(){return this.entityConfig?this.entityConfig.properties.some(t=>this.propertyAtMax(t.id)):!1}connectedCallback(){super.connectedCallback(),this.desc=this.desc.trim(),this.occurredAt=ue.formatDateTime(new Date(this.occurredAt)),this.initialDesc=this.desc,this.initialOccurredAt=this.occurredAt,this.initialTags=JSON.stringify(this.tags)}disconnectedCallback(){super.disconnectedCallback(),this.suggestionTimeout&&(clearTimeout(this.suggestionTimeout),this.suggestionTimeout=null),this.abortController&&(this.abortController.abort(),this.abortController=null)}get apiUrl(){return this.entityId?`entity/${this.entityId}`:"entity"}get hasChanged(){return this.desc.trim()!==this.initialDesc||this.occurredAt!==this.initialOccurredAt||JSON.stringify(this.tagsAndSuggestions)!==this.initialTags}propertyAtMax(t){if(!this.entityConfig)return!0;const e=this.entityConfig.properties.find(s=>s.id===t);return e?this.numberOfPropertiesWithType(t)>=e.repeat:!0}numberOfPropertiesWithType(t){return this.properties.filter(e=>e.propertyId===t).length||0}async saveAction(){this.loading=!0;const t=this.desc.trim();try{if(t&&this.hasChanged){const e=this.occurredAt,s=new Date().getTimezoneOffset(),i={desc:t,occurredAt:e,timeZone:s,tags:this.tagsAndSuggestions,properties:this.properties},n=this.entityId?await P.put(this.apiUrl,i):await P.post(this.apiUrl,i);if(this.reset(),this.loading=!1,!n)return;this.dispatchEvent(new zv({id:this.entityId,desc:t,tags:this.tags})),X(this.entityId?p("Updated!"):p("Added!"),B.SUCCESS);return}this.dispatchEvent(new Jv({id:this.entityId}))}catch(e){console.error(`Error encountered in when saving action: ${e}`)}this.loading=!1}reset(){this.desc="",this.tagValue="",this.entityId||(this.tags=this.state.listConfig.filter.tagging[ot.CONTAINS_ALL_OF]),this.state.setTagSuggestions([]),this.suggestionTimeout&&(clearTimeout(this.suggestionTimeout),this.suggestionTimeout=null)}async deleteAction(){this.loading=!0;try{await P.delete(this.apiUrl),X(p("Removed!"),B.INFO)}catch(t){console.error(`Error encountered when deleting action: ${t}`)}this.dispatchEvent(new Wv({id:this.entityId})),this.desc="",this.loading=!1}async requestActionSuggestions(){if(!this.lastInput.action.hadResults&&this.desc.startsWith(this.lastInput.action.value)){this.state.setActionSuggestions([]);return}try{this.lastInput.action.hadResults=!1;let t=[];if(this.desc.length>=this.minLengthForSuggestion){const e=await P.get(`actionSuggestion/${this.desc}`);e&&(t=e.response.suggestions)}(t.length||this.desc==="")&&(this.lastInput.action.hadResults=!0),this.state.setActionSuggestions(t)}catch(t){console.error(`Failed to get action suggestions: ${JSON.stringify(t)}`)}this.lastInput.action.value=this.desc}async requestTagSuggestions(){this.abortController&&this.abortController.abort(),this.abortController=new AbortController;const t=this.desc;if(t.length===0||!this.tagSuggestionsEnabled){this.state.setTagSuggestions([]);return}try{const e=await P.get(`tagSuggestion/${t}`,{signal:this.abortController.signal});let s=[];if(e&&(s=e.response.suggestions),t!==this.desc)return;this.state.setTagSuggestions(s.filter(i=>!this.tags.includes(i)))}catch(e){console.error(`Failed to get tag suggestions: ${JSON.stringify(e)}`)}}syncSuggestions(t=!1){t&&(this.state.setTagSuggestions([]),this.state.setActionSuggestions([])),this.requestTagSuggestions(),this.requestActionSuggestions()}sync(t=!1){this.syncSuggestions(t)}handleSaveClick(t){this.saveAction()}handleDeleteClick(t){this.confirmModalShown=!0}handleTagsUpdated(t){this.tags=t.detail.tags,this.state.setTagSuggestions(this.state.tagSuggestions.filter(e=>this.tags.includes(e)))}async handleTagSuggestionsRequested(t){const e=t.detail.value;if(!this.lastInput.tag.hadResults&&e.startsWith(this.lastInput.tag.value)||!this.tagSuggestionsEnabled){this.tagSuggestions=[];return}this.lastInput.tag.hadResults=!1,this.lastInput.tag.value=e;let s=[];if(e.length>=this.minLengthForSuggestion){const i=await P.get(`tag/${e}`);i&&(s=i.response.tags)}(s.length||e==="")&&(this.lastInput.tag.hadResults=!0),this.tagSuggestions=s}handleTypeChanged(t){this.type=parseInt(t.detail.value)}handlePropertyUpdated(t){const e=t.detail,s=this.properties.findIndex(i=>i.propertyId===e.propertyId);s>-1?this.properties[s]=e:this.properties.push(e)}handlePropertyChanged(t){console.log("Property changed:",t.detail);const e=t.detail.id,s=t.detail.value;this.properties=this.properties.map(i=>i.propertyId===e?{...i,value:s}:i)}addProperty(){console.log("addProperty")}renderPropertyField(t){switch(t.dataType){case R.IMAGE:return c`<image-field
          src=${t.defaultValue.src}
          alt=${t.defaultValue.alt}
          .propertyConfig=${t}
          @property-changed=${this.handlePropertyChanged}
        ></image-field>`;case R.SHORT_TEXT:return c`<text-field
          value=${t.defaultValue}
          .propertyConfig=${t}
          @property-changed=${this.handlePropertyChanged}
        ></text-field>`;case R.LONG_TEXT:return c`<text-field
          value=${t.defaultValue}
          .propertyConfig=${t}
          @property-changed=${this.handlePropertyChanged}
        ></text-field>`;case R.INT:return c`<int-field
          value=${t.defaultValue}
          .propertyConfig=${t}
          @property-changed=${this.handlePropertyChanged}
        ></int-field>`}return S}render(){return c`
      <form class=${Q(this.classes)}>
        <div class="type">
          <ss-select
            selected=${this.type}
            @select-changed=${this.handleTypeChanged}
            .options=${[{label:"Select an entity",value:"0"},...this.state.entityConfigs.map(t=>({label:t.name,value:t.id}))]}
          ></ss-select>
        </div>

        <div class="properties">
          ${this.properties.length?z(this.properties,t=>t.propertyId,t=>c`<item-property-form
                    propertyId=${t.propertyId}
                    .value=${t.value}
                    @item-property-updated=${this.handlePropertyUpdated}
                  ></item-property-form>`):S}
          ${this.entityConfig?z(this.entityConfig.properties,t=>t.id,t=>c`${this.renderPropertyField(t)}`):S}
        </div>

        <tag-manager
          ?enableSuggestions=${this.tagSuggestionsEnabled}
          value=${this.tagValue}
          @tags-updated=${this.handleTagsUpdated}
          @tag-suggestions-requested=${this.handleTagSuggestionsRequested}
        >
          <div slot="tags">
            ${z(this.tagsAndSuggestions,t=>t,t=>c`<data-item>${t}</data-item>`)}
          </div>

          <div slot="suggestions">
            ${z(this.tagSuggestions,t=>t,t=>c`<data-item>${t}</data-item>`)}
          </div>
        </tag-manager>

        <div class="buttons">
          <ss-button ?disabled=${this.canAddProperty} @click=${this.addProperty}
            >${p("Add Property")}</ss-button
          >

          <ss-button
            ?positive=${!this.entityId||this.hasChanged}
            @click=${this.handleSaveClick}
            text=${this.entityId?this.hasChanged?p("Update"):p("Cancel"):p("Add")}
            ?loading=${this.loading}
          ></ss-button>

          ${this.entityId?c`
                <ss-button
                  negative
                  @click=${this.handleDeleteClick}
                  text=${p("Delete")}
                ></ss-button>

                <action-confirm-modal
                  @confirm=${this.deleteAction}
                  @cancel=${()=>this.confirmModalShown=!1}
                  ?open=${this.confirmModalShown}
                ></action-confirm-modal>
              `:S}
        </div>
      </form>
    `}};k.styles=[H,A`
      form {
        padding: 1rem;
      }

      tag-manager,
      .time,
      .type {
        display: none;
      }

      form.advanced-mode tag-manager,
      form.advanced-mode .time,
      form.advanced-mode .type {
        display: initial;
      }

      div:last-child {
        margin-top: 1rem;
      }
    `];K([u({type:Number})],k.prototype,qa,2);K([u({type:Number})],k.prototype,za,2);K([u()],k.prototype,Ya,2);K([u()],k.prototype,ka,2);K([u({type:Array})],k.prototype,Xa,2);K([u()],k.prototype,Ha,2);K([u({type:Array})],k.prototype,Ga,2);K([d()],k.prototype,"initialDesc",2);K([d()],k.prototype,"initialOccurredAt",2);K([d()],k.prototype,"initialTags",2);K([d()],k.prototype,"confirmModalShown",2);K([d()],k.prototype,"advancedMode",2);K([d()],k.prototype,"loading",2);K([d()],k.prototype,"lastInput",2);K([d()],k.prototype,"tagSuggestions",2);K([d()],k.prototype,"classes",1);K([d()],k.prototype,"tagsAndSuggestions",1);K([d()],k.prototype,"tagSuggestionsEnabled",1);K([d()],k.prototype,"entityConfig",1);K([d()],k.prototype,"canAddProperty",1);K([d()],k.prototype,"hasChanged",1);k=K([T("entity-form")],k);var J=(t=>(t.TYPE="type",t.ENTITY_ID="entityId",t.DESC="desc",t.CREATED_AT="createdAt",t.UPDATED_AT="updatedAt",t.OCCURRED_AT="occurredAt",t.TAGS="tags",t.SELECTED="selected",t.PROPERTIES="properties",t.DEBUG="debug",t))(J||{});const se={type:{default:"",control:{type:f.TEXT},description:"The type of the entity"},entityId:{default:0,control:{type:f.NUMBER},description:"The ID of the entity"},desc:{default:"",control:{type:f.TEXT},description:"The description of the entity"},createdAt:{default:"",control:{type:f.TEXT},description:"The creation date of the entity"},updatedAt:{default:"",control:{type:f.TEXT},description:"The update date of the entity"},occurredAt:{default:"",control:{type:f.TEXT},description:"The occurrence date of the entity"},tags:{default:[],control:{type:f.TEXT},description:"The tags of the entity"},selected:{default:!1,control:{type:f.BOOLEAN},description:"Whether the entity is selected"},properties:{default:[],control:{type:f.TEXT},description:"The properties of the entity"},debug:{default:!1,control:{type:f.BOOLEAN},description:"Whether debug mode is enabled"}};var th=(t=>(t.TEXT="text",t.NUMBER="number",t.BOOLEAN="boolean",t))(th||{}),eh=(t=>(t.PLAIN_TEXT="plainText",t.RICH_TEXT="richText",t.IMAGE="image",t.VIDEO="video",t.HIDDEN="hidden",t))(eh||{});const a_=[{id:1,name:"weight",dataType:"number",controlType:"number",renderType:"plainText",repeat:1,min:1,max:1,defaultValue:0,valuePrefix:"",valueSuffix:"kg"},{id:2,name:"reps",dataType:"number",controlType:"number",renderType:"plainText",repeat:1,min:1,max:1,defaultValue:0,valuePrefix:"",valueSuffix:""},{id:3,name:"image",dataType:"text",controlType:"text",renderType:"image",repeat:1,min:1,max:1,defaultValue:"",valuePrefix:"",valueSuffix:""},{id:4,name:"hidden",dataType:"boolean",controlType:"boolean",renderType:"hidden",repeat:1,min:1,max:1,defaultValue:!1,valuePrefix:"",valueSuffix:""},{id:5,name:"title",dataType:"text",controlType:"text",renderType:"plainText",repeat:1,min:1,max:1,defaultValue:"",valuePrefix:"",valueSuffix:""},{id:6,name:"artist",dataType:"text",controlType:"text",renderType:"plainText",repeat:1,min:1,max:1,defaultValue:"",valuePrefix:"",valueSuffix:""},{id:7,name:"year",dataType:"number",controlType:"number",renderType:"plainText",repeat:1,min:1,max:1,defaultValue:1982,valuePrefix:"",valueSuffix:""},{id:8,name:"platform",dataType:"text",controlType:"text",renderType:"plainText",repeat:1,min:1,max:1,defaultValue:"",valuePrefix:"",valueSuffix:"s"}],l_=[{propertyId:2,value:20},{propertyId:1,value:100},{propertyId:3,value:"https://m.media-amazon.com/images/I/81aRr8wQi4L._AC_UL320_.jpg"},{propertyId:4,value:!1}],d_=t=>a_.find(e=>e.id===t);var c_=Object.defineProperty,u_=Object.getOwnPropertyDescriptor,bt=(t,e,s,i)=>{for(var n=i>1?void 0:i?u_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&c_(e,s,n),n},Wa,Ka,Ja,Za,Qa,tl,el,sl,il,nl,mc,sh=(t=>(t.VIEW="view",t.EDIT="edit",t))(sh||{});const bc=500;let lt=class extends(mc=O,nl=J.TYPE,il=J.ENTITY_ID,sl=J.DESC,el=J.CREATED_AT,tl=J.UPDATED_AT,Qa=J.OCCURRED_AT,Za=J.TAGS,Ja=J.SELECTED,Ka=J.PROPERTIES,Wa=J.DEBUG,mc){constructor(){super(...arguments),this[nl]=se[J.TYPE].default,this[il]=se[J.ENTITY_ID].default,this[sl]=se[J.DESC].default,this[el]=se[J.CREATED_AT].default,this[tl]=se[J.UPDATED_AT].default,this[Qa]=se[J.OCCURRED_AT].default,this[Za]=se[J.TAGS].default,this[Ja]=se[J.SELECTED].default,this[Ka]=se[J.PROPERTIES].default,this[Wa]=se[J.DEBUG].default,this.mode="view",this.pointerDown=new Date,this.downTimeout=0,this.downActivation=!1}get classes(){return{"action-list-item":!0,selected:this.selected}}get readableTime(){const t=new Date(this.occurredAt);return ue.formatDateTime(t)}setMode(t){this.mode=t}handleMouseDown(t){return this.pointerDown=new Date,this.dispatchEvent(new qu({time:this.pointerDown})),this.downTimeout=setTimeout(()=>{const e=new Date;if(e.getTime()-this.pointerDown.getTime()>bc){this.dispatchEvent(new Ku({time:e})),this.downActivation=!0;return}},bc),t.preventDefault(),!1}handleMouseUp(t){return this.downActivation||this.dispatchEvent(new Wu({time:new Date})),this.downActivation=!1,this.downTimeout&&clearTimeout(this.downTimeout),t.preventDefault(),!1}handleTouchStart(t){}handleTouchEnd(t){}renderProperties(){return this.properties.map(t=>{const e=d_(t.propertyId);if(!e||e.renderType==="hidden")return S;let s=e.defaultValue;switch(e.dataType){case th.NUMBER:s=t.value;break;default:s=t.value;break}return e.renderType===eh.IMAGE?this.renderImageProperty(t):c`
        <div class="property">
          <span>${e.name}</span>
          ${e.valuePrefix?c`<span class="property-prefix"
                >${e.valuePrefix}</span
              >`:S}<span class="property-value">${s}</span
          >${e.valueSuffix?c`<span class="property-suffix"
                >${e.valueSuffix}</span
              >`:S}
        </div>
      `})}renderImageProperty(t){return c` <span class="property image"
      ><img src=${t.value}
    /></span>`}render(){return c`
      <div class=${Q(this.classes)}>
        ${this.mode==="edit"?c`
              <action-form
                @action-item-updated=${()=>{this.mode="view"}}
                @action-item-canceled=${()=>{this.mode="view"}}
                entityId=${this.entityId}
                desc=${this.desc}
                occurredAt=${this.occurredAt}
                type=${this.type}
                .tags=${this.tags}
              ></action-form>
            `:c`
              <div
                @mousedown=${this.handleMouseDown}
                @mouseup=${this.handleMouseUp}
                @touchstart=${this.handleTouchStart}
                @touchend=${this.handleTouchEnd}
              >
                ${S}

                <div class="desc">${this.desc}</div>
                <div class="time">${this.readableTime}</div>
              </div>
            `}
      </div>
    `}};lt.styles=A`
    .action-list-item {
      padding: 0.5rem;
      text-align: center;
      transition: all 0.2s;

      &.selected {
        background-color: #fdc;
      }
    }

    .time {
      color: #888;
      font-size: 0.9rem;
    }

    .properties {
      background-color: #ffeed0;
    }
  `;bt([u()],lt.prototype,nl,2);bt([u({type:Number})],lt.prototype,il,2);bt([u()],lt.prototype,sl,2);bt([u()],lt.prototype,el,2);bt([u()],lt.prototype,tl,2);bt([u()],lt.prototype,Qa,2);bt([u({type:Array})],lt.prototype,Za,2);bt([u({type:Boolean})],lt.prototype,Ja,2);bt([u({type:Array})],lt.prototype,Ka,2);bt([u({type:Boolean})],lt.prototype,Wa,2);bt([d()],lt.prototype,"mode",2);bt([d()],lt.prototype,"pointerDown",2);bt([d()],lt.prototype,"downTimeout",2);bt([d()],lt.prototype,"downActivation",2);bt([d()],lt.prototype,"classes",1);lt=bt([T("entity-list-item")],lt);var h_=Object.defineProperty,p_=Object.getOwnPropertyDescriptor,Et=(t,e,s,i)=>{for(var n=i>1?void 0:i?p_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&h_(e,s,n),n};let dt=class extends gn{constructor(){super(...arguments),this.state=gt,this.scrollHandler=()=>this.handleScroll(),this.start=0,this.total=0,this.loading=!1,this.filterIsOpen=!1,this.settingIsOpen=!1,this.sortIsOpen=!1,this.contextIsOpen=!1,this.actionContextIsOpen=new Map}get perPage(){return this.state.listSetting[V.PAGINATION_PAGE_SIZE]}get totalShown(){return this.start+this.perPage}get reachedEnd(){return this.totalShown>=this.total}get sortIsDefault(){return this.state.listSort.direction===pe.DESC&&this.state.listSort.property===Ce.OCCURRED_AT}get lazyLoaderIsVisible(){const t=this.lazyLoader.getBoundingClientRect(),e=window.innerHeight||document.documentElement.clientHeight;return t.bottom<=e}get paginationType(){return this.state.listSetting[V.PAGINATION_TYPE]??Dt.LAZY}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this.scrollHandler),this.state.lastListUrl!==this.getUrl()&&(this.state.setListItems([]),this.state.setContextListItems([])),this.load()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.scrollHandler)}sync(t=!1){t&&(this.start=0),this.listFilter.sync(),this.load()}handleItemDeleted(t){this.state.setListItems(this.state.listItems.filter(e=>e.id!==t.detail.id))}handleItemUpdated(t){const e=this.state.listItems.map(s=>s.id===t.detail.id?{...s,desc:t.detail.desc,occurredAt:t.detail.occurredAt,tags:t.detail.tags}:s).sort((s,i)=>this.state.listSort.direction===pe.DESC?i[this.state.listSort.property].localeCompare(s[this.state.listSort.property]):s[this.state.listSort.property].localeCompare(i[this.state.listSort.property]));this.state.setListItems(e)}handleScroll(){this.paginationType===Dt.LAZY&&this.lazyLoaderIsVisible&&!this.loading&&!this.reachedEnd&&this.load(!0)}getUrl(t=!1){t&&(this.start+=this.perPage);const e={perPage:`${this.perPage}`,...this.start>0?{start:`${this.start}`}:{},...this.state.listFilter.includeAll?{}:{filter:JSON.stringify(this.state.listFilter)},...this.sortIsDefault?{}:{sort:JSON.stringify(this.state.listSort)},...this.state.listContextMode?{context:JSON.stringify(this.state.listContext)}:{}};return`entity${Object.keys(e).length?`?${new URLSearchParams(e)}`:""}`}async load(t=!1){this.loading=!0;try{const e=this.getUrl(t);this.state.setLastListUrl(e);const s=await P.get(e);s&&(s.response.entities&&this.state.setListEntities(t?[...this.state.listEntities,...s.response.entities]:[...s.response.entities]),s.response.context&&(this.state.setContextListEntities({...this.state.contextListEntities,...s.response.context}),this.actionContextIsOpen=new Map,Object.keys(s.response.context).forEach(i=>{this.actionContextIsOpen.set(parseInt(i),!1)})),s.response.total&&(this.total=s.response.total))}catch(e){console.error(`Failed to get list: ${JSON.stringify(e)}`)}finally{this.ready=!0,this.loading=!1}}handleFilterUpdated(t){this.filterIsOpen=!1,this.load()}handleSortUpdated(t){this.load()}handleSettingUpdated(t){this.load()}handleContextUpdated(t){this.load()}handlePageChanged(t){this.start=t.detail.start,this.load()}toggleSetting(){this.settingIsOpen=!this.settingIsOpen}toggleFilter(){this.filterIsOpen=!this.filterIsOpen}toggleSort(){this.sortIsOpen=!this.sortIsOpen}toggleContext(){this.contextIsOpen=!this.contextIsOpen}toggleActionContext(t){this.actionContextIsOpen.get(t)?this.actionContextIsOpen.set(t,!1):this.actionContextIsOpen.set(t,!0),this.requestUpdate()}handlePointerLongPress(t){const e=t.target;this.state.toggleActionSelection(e.entityId)}handlePointerUp(t){const e=t.target;if(!this.state.selectMode){e.setMode(sh.EDIT);return}this.state.toggleActionSelection(e.entityId)}renderContextActions(t,e){var s;return this.state.listContext.type===t&&((s=this.state.contextListItems[e.id])!=null&&s.length)?c`
          <ss-collapsable
            title=${p("Show context")}
            @toggled=${()=>{this.toggleActionContext(e.id)}}
            ?open=${this.actionContextIsOpen.get(e.id)}
          >
            ${this.state.contextListItems[e.id].map(i=>c`
                <action-list-item
                  ?debug=${this.state.debugMode}
                  actionId=${i.id}
                  type=${i.type}
                  desc=${i.desc}
                  occurredAt=${i.occurredAt}
                  .tags=${i.tags}
                  ?selected=${this.state.selectedActions.includes(i.id)}
                  @pointer-long-press=${this.handlePointerLongPress}
                  @pointer-up=${this.handlePointerUp}
                ></action-list-item>
              `)}
          </ss-collapsable>
        `:S}render(){return c`
      <ss-collapsable
        title=${p("Settings")}
        ?open=${this.settingIsOpen}
        @toggled=${this.toggleSetting}
      >
        <setting-form
          listConfigId=${this.state.listConfigId}
          @setting-updated=${this.handleSettingUpdated}
        ></setting-form>
      </ss-collapsable>

      <ss-collapsable
        title=${p("Filter")}
        ?open=${this.filterIsOpen}
        @toggled=${this.toggleFilter}
      >
        <div class="filter-body">
          <list-filter
            @filter-updated=${this.handleFilterUpdated}
          ></list-filter>
        </div>
      </ss-collapsable>

      <ss-collapsable
        title=${p("Sort")}
        ?open=${this.sortIsOpen}
        @toggled=${this.toggleSort}
      >
        <list-sort @list-sort-updated=${this.handleSortUpdated}></list-sort>
      </ss-collapsable>

      ${this.state.listFilter.includeAll?S:c`
            <ss-collapsable
              title=${p("Context")}
              ?open=${this.contextIsOpen}
              @toggled=${this.toggleContext}
            >
              <list-context
                @list-context-updated=${this.handleContextUpdated}
              ></list-context>
            </ss-collapsable>
          `}

      <div class="box list-items">
        ${this.loading?c` <ss-loader padded></ss-loader> `:S}
        ${this.state.listItems.length?z(this.state.listItems,t=>t.id,t=>c`
                ${this.renderContextActions(fe.AFTER,t)}
                <entity-list-item
                  ?debug=${this.state.debugMode}
                  actionId=${t.id}
                  type=${t.type}
                  desc=${t.desc}
                  occurredAt=${t.occurredAt}
                  .tags=${t.tags}
                  ?selected=${this.state.selectedActions.includes(t.id)}
                  .properties=${l_}
                  @pointer-long-press=${this.handlePointerLongPress}
                  @pointer-up=${this.handlePointerUp}
                  @action-item-deleted=${this.handleItemDeleted}
                  @action-item-updated=${this.handleItemUpdated}
                ></entity-list-item>
                ${this.renderContextActions(fe.BEFORE,t)}
              `):this.loading?S:c` <div class="no-actions">${p("No actions found")}</div>`}
        <div id="lazy-loader"></div>
      </div>
      ${this.paginationType===Dt.NAVIGATION?c`
            <list-paginator
              @page-changed=${this.handlePageChanged}
              start=${this.start}
              total=${this.total}
              perPage=${this.perPage}
            ></list-paginator>
          `:this.paginationType===Dt.MORE_BUTTON&&!this.reachedEnd?c`
              <div class="more box">
                <ss-button
                  text=${p("Load more")}
                  @click=${()=>this.load(!0)}
                  ?loading=${this.loading}
                  ?disabled=${this.loading}
                ></ss-button>
              </div>
            `:S}
    `}};dt.styles=[H,A`
      ss-collapsable {
        display: block;
        margin-top: 1rem;
      }

      .list-items {
        margin-top: 1rem;
        overflow: hidden;
      }

      .no-actions {
        padding: 1rem;
      }

      .more {
        margin-top: 1rem;
      }
    `];Et([ft("#lazy-loader")],dt.prototype,"lazyLoader",2);Et([ft("list-filter")],dt.prototype,"listFilter",2);Et([d()],dt.prototype,"start",2);Et([d()],dt.prototype,"total",2);Et([d()],dt.prototype,"loading",2);Et([d()],dt.prototype,"filterIsOpen",2);Et([d()],dt.prototype,"settingIsOpen",2);Et([d()],dt.prototype,"sortIsOpen",2);Et([d()],dt.prototype,"contextIsOpen",2);Et([d()],dt.prototype,"actionContextIsOpen",2);Et([d()],dt.prototype,"perPage",1);Et([d()],dt.prototype,"totalShown",1);Et([d()],dt.prototype,"reachedEnd",1);Et([d()],dt.prototype,"sortIsDefault",1);Et([d()],dt.prototype,"paginationType",1);dt=Et([T("entity-list")],dt);var ih=Symbol.for("immer-nothing"),Ec=Symbol.for("immer-draftable"),Rt=Symbol.for("immer-state");function Wt(t,...e){throw new Error(`[Immer] minified error nr: ${t}. Full error at: https://bit.ly/3cXEKWf`)}var pi=Object.getPrototypeOf;function fi(t){return!!t&&!!t[Rt]}function Ss(t){var e;return t?nh(t)||Array.isArray(t)||!!t[Ec]||!!((e=t.constructor)!=null&&e[Ec])||bn(t)||vr(t):!1}var f_=Object.prototype.constructor.toString();function nh(t){if(!t||typeof t!="object")return!1;const e=pi(t);if(e===null)return!0;const s=Object.hasOwnProperty.call(e,"constructor")&&e.constructor;return s===Object?!0:typeof s=="function"&&Function.toString.call(s)===f_}function Jn(t,e){gr(t)===0?Reflect.ownKeys(t).forEach(s=>{e(s,t[s],t)}):t.forEach((s,i)=>e(i,s,t))}function gr(t){const e=t[Rt];return e?e.type_:Array.isArray(t)?1:bn(t)?2:vr(t)?3:0}function rl(t,e){return gr(t)===2?t.has(e):Object.prototype.hasOwnProperty.call(t,e)}function rh(t,e,s){const i=gr(t);i===2?t.set(e,s):i===3?t.add(s):t[e]=s}function g_(t,e){return t===e?t!==0||1/t===1/e:t!==t&&e!==e}function bn(t){return t instanceof Map}function vr(t){return t instanceof Set}function hs(t){return t.copy_||t.base_}function ol(t,e){if(bn(t))return new Map(t);if(vr(t))return new Set(t);if(Array.isArray(t))return Array.prototype.slice.call(t);const s=nh(t);if(e===!0||e==="class_only"&&!s){const i=Object.getOwnPropertyDescriptors(t);delete i[Rt];let n=Reflect.ownKeys(i);for(let r=0;r<n.length;r++){const o=n[r],a=i[o];a.writable===!1&&(a.writable=!0,a.configurable=!0),(a.get||a.set)&&(i[o]={configurable:!0,writable:!0,enumerable:a.enumerable,value:t[o]})}return Object.create(pi(t),i)}else{const i=pi(t);if(i!==null&&s)return{...t};const n=Object.create(i);return Object.assign(n,t)}}function hd(t,e=!1){return _r(t)||fi(t)||!Ss(t)||(gr(t)>1&&Object.defineProperties(t,{set:{value:xn},add:{value:xn},clear:{value:xn},delete:{value:xn}}),Object.freeze(t),e&&Object.values(t).forEach(s=>hd(s,!0))),t}function xn(){Wt(2)}function _r(t){return Object.isFrozen(t)}var v_={};function Cs(t){const e=v_[t];return e||Wt(0,t),e}var tn;function oh(){return tn}function __(t,e){return{drafts_:[],parent_:t,immer_:e,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function Tc(t,e){e&&(Cs("Patches"),t.patches_=[],t.inversePatches_=[],t.patchListener_=e)}function al(t){ll(t),t.drafts_.forEach(y_),t.drafts_=null}function ll(t){t===tn&&(tn=t.parent_)}function Sc(t){return tn=__(tn,t)}function y_(t){const e=t[Rt];e.type_===0||e.type_===1?e.revoke_():e.revoked_=!0}function Cc(t,e){e.unfinalizedDrafts_=e.drafts_.length;const s=e.drafts_[0];return t!==void 0&&t!==s?(s[Rt].modified_&&(al(e),Wt(4)),Ss(t)&&(t=Zn(e,t),e.parent_||Qn(e,t)),e.patches_&&Cs("Patches").generateReplacementPatches_(s[Rt].base_,t,e.patches_,e.inversePatches_)):t=Zn(e,s,[]),al(e),e.patches_&&e.patchListener_(e.patches_,e.inversePatches_),t!==ih?t:void 0}function Zn(t,e,s){if(_r(e))return e;const i=e[Rt];if(!i)return Jn(e,(n,r)=>Ac(t,i,e,n,r,s)),e;if(i.scope_!==t)return e;if(!i.modified_)return Qn(t,i.base_,!0),i.base_;if(!i.finalized_){i.finalized_=!0,i.scope_.unfinalizedDrafts_--;const n=i.copy_;let r=n,o=!1;i.type_===3&&(r=new Set(n),n.clear(),o=!0),Jn(r,(a,l)=>Ac(t,i,n,a,l,s,o)),Qn(t,n,!1),s&&t.patches_&&Cs("Patches").generatePatches_(i,s,t.patches_,t.inversePatches_)}return i.copy_}function Ac(t,e,s,i,n,r,o){if(fi(n)){const a=r&&e&&e.type_!==3&&!rl(e.assigned_,i)?r.concat(i):void 0,l=Zn(t,n,a);if(rh(s,i,l),fi(l))t.canAutoFreeze_=!1;else return}else o&&s.add(n);if(Ss(n)&&!_r(n)){if(!t.immer_.autoFreeze_&&t.unfinalizedDrafts_<1)return;Zn(t,n),(!e||!e.scope_.parent_)&&typeof i!="symbol"&&(bn(s)?s.has(i):Object.prototype.propertyIsEnumerable.call(s,i))&&Qn(t,n)}}function Qn(t,e,s=!1){!t.parent_&&t.immer_.autoFreeze_&&t.canAutoFreeze_&&hd(e,s)}function m_(t,e){const s=Array.isArray(t),i={type_:s?1:0,scope_:e?e.scope_:oh(),modified_:!1,finalized_:!1,assigned_:{},parent_:e,base_:t,draft_:null,copy_:null,revoke_:null,isManual_:!1};let n=i,r=pd;s&&(n=[i],r=en);const{revoke:o,proxy:a}=Proxy.revocable(n,r);return i.draft_=a,i.revoke_=o,a}var pd={get(t,e){if(e===Rt)return t;const s=hs(t);if(!rl(s,e))return b_(t,s,e);const i=s[e];return t.finalized_||!Ss(i)?i:i===Vr(t.base_,e)?(Br(t),t.copy_[e]=cl(i,t)):i},has(t,e){return e in hs(t)},ownKeys(t){return Reflect.ownKeys(hs(t))},set(t,e,s){const i=ah(hs(t),e);if(i!=null&&i.set)return i.set.call(t.draft_,s),!0;if(!t.modified_){const n=Vr(hs(t),e),r=n==null?void 0:n[Rt];if(r&&r.base_===s)return t.copy_[e]=s,t.assigned_[e]=!1,!0;if(g_(s,n)&&(s!==void 0||rl(t.base_,e)))return!0;Br(t),dl(t)}return t.copy_[e]===s&&(s!==void 0||e in t.copy_)||Number.isNaN(s)&&Number.isNaN(t.copy_[e])||(t.copy_[e]=s,t.assigned_[e]=!0),!0},deleteProperty(t,e){return Vr(t.base_,e)!==void 0||e in t.base_?(t.assigned_[e]=!1,Br(t),dl(t)):delete t.assigned_[e],t.copy_&&delete t.copy_[e],!0},getOwnPropertyDescriptor(t,e){const s=hs(t),i=Reflect.getOwnPropertyDescriptor(s,e);return i&&{writable:!0,configurable:t.type_!==1||e!=="length",enumerable:i.enumerable,value:s[e]}},defineProperty(){Wt(11)},getPrototypeOf(t){return pi(t.base_)},setPrototypeOf(){Wt(12)}},en={};Jn(pd,(t,e)=>{en[t]=function(){return arguments[0]=arguments[0][0],e.apply(this,arguments)}});en.deleteProperty=function(t,e){return en.set.call(this,t,e,void 0)};en.set=function(t,e,s){return pd.set.call(this,t[0],e,s,t[0])};function Vr(t,e){const s=t[Rt];return(s?hs(s):t)[e]}function b_(t,e,s){var n;const i=ah(e,s);return i?"value"in i?i.value:(n=i.get)==null?void 0:n.call(t.draft_):void 0}function ah(t,e){if(!(e in t))return;let s=pi(t);for(;s;){const i=Object.getOwnPropertyDescriptor(s,e);if(i)return i;s=pi(s)}}function dl(t){t.modified_||(t.modified_=!0,t.parent_&&dl(t.parent_))}function Br(t){t.copy_||(t.copy_=ol(t.base_,t.scope_.immer_.useStrictShallowCopy_))}var E_=class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(e,s,i)=>{if(typeof e=="function"&&typeof s!="function"){const r=s;s=e;const o=this;return function(l=r,...h){return o.produce(l,g=>s.call(this,g,...h))}}typeof s!="function"&&Wt(6),i!==void 0&&typeof i!="function"&&Wt(7);let n;if(Ss(e)){const r=Sc(this),o=cl(e,void 0);let a=!0;try{n=s(o),a=!1}finally{a?al(r):ll(r)}return Tc(r,i),Cc(n,r)}else if(!e||typeof e!="object"){if(n=s(e),n===void 0&&(n=e),n===ih&&(n=void 0),this.autoFreeze_&&hd(n,!0),i){const r=[],o=[];Cs("Patches").generateReplacementPatches_(e,n,r,o),i(r,o)}return n}else Wt(1,e)},this.produceWithPatches=(e,s)=>{if(typeof e=="function")return(o,...a)=>this.produceWithPatches(o,l=>e(l,...a));let i,n;return[this.produce(e,s,(o,a)=>{i=o,n=a}),i,n]},typeof(t==null?void 0:t.autoFreeze)=="boolean"&&this.setAutoFreeze(t.autoFreeze),typeof(t==null?void 0:t.useStrictShallowCopy)=="boolean"&&this.setUseStrictShallowCopy(t.useStrictShallowCopy)}createDraft(t){Ss(t)||Wt(8),fi(t)&&(t=T_(t));const e=Sc(this),s=cl(t,void 0);return s[Rt].isManual_=!0,ll(e),s}finishDraft(t,e){const s=t&&t[Rt];(!s||!s.isManual_)&&Wt(9);const{scope_:i}=s;return Tc(i,e),Cc(void 0,i)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}applyPatches(t,e){let s;for(s=e.length-1;s>=0;s--){const n=e[s];if(n.path.length===0&&n.op==="replace"){t=n.value;break}}s>-1&&(e=e.slice(s+1));const i=Cs("Patches").applyPatches_;return fi(t)?i(t,e):this.produce(t,n=>i(n,e))}};function cl(t,e){const s=bn(t)?Cs("MapSet").proxyMap_(t,e):vr(t)?Cs("MapSet").proxySet_(t,e):m_(t,e);return(e?e.scope_:oh()).drafts_.push(s),s}function T_(t){return fi(t)||Wt(10,t),lh(t)}function lh(t){if(!Ss(t)||_r(t))return t;const e=t[Rt];let s;if(e){if(!e.modified_)return e.base_;e.finalized_=!0,s=ol(t,e.scope_.immer_.useStrictShallowCopy_)}else s=ol(t,!0);return Jn(s,(i,n)=>{rh(s,i,lh(n))}),e&&(e.finalized_=!1),s}var S_=new E_,De=S_.produce,Lt=(t=>(t.ENTITY_CONFIG_ID="entityConfigId",t.NAME="name",t.DESCRIPTION="description",t.PROPERTIES="properties",t))(Lt||{});const Pn={entityConfigId:{default:0,control:{type:f.NUMBER},description:"The unique identifier for the entity"},name:{default:"",control:{type:f.TEXT},description:"The name of the entity"},description:{default:"",control:{type:f.TEXT},description:"A brief description of the entity"},properties:{default:[],control:{type:f.TEXT},description:"The properties of the entity"}};var E=(t=>(t.DATA_TYPE="dataType",t.RENDER_TYPE="renderType",t.ENTITY_CONFIG_ID="entityConfigId",t.PROPERTY_CONFIG_ID="propertyConfigId",t.NAME="name",t.REPEAT="repeat",t.ALLOWED="allowed",t.REQUIRED="required",t.PREFIX="prefix",t.SUFFIX="suffix",t.DEFAULT_VALUE="defaultValue",t))(E||{});const vt={dataType:{default:R.SHORT_TEXT,control:{type:f.SELECT,options:Object.values(R)},description:"The data type of the property"},renderType:{default:Ji.TEXT,control:{type:f.SELECT,options:Object.values(Ji)},description:"The render type of the property"},entityConfigId:{default:0,control:{type:f.HIDDEN},description:"The ID of the entity config"},propertyConfigId:{default:0,control:{type:f.HIDDEN},description:"The ID of the property"},name:{default:"",control:{type:f.TEXT},description:"The name of the property"},required:{default:0,control:{type:f.NUMBER},description:"How many of this property are required"},repeat:{default:0,control:{type:f.NUMBER},description:"How many times this property can be repeated"},allowed:{default:0,control:{type:f.NUMBER},description:"How many of this property are allowed"},prefix:{default:"",control:{type:f.TEXT},description:"The prefix of the property"},suffix:{default:"",control:{type:f.TEXT},description:"The suffix of the property"},defaultValue:{default:"",control:{type:f.TEXT},description:"The default value of the property"}},C_="property-config-updated";class A_ extends CustomEvent{constructor(e){super(C_,{detail:e,bubbles:!0,composed:!0})}}const $_="property-config-added";class O_ extends CustomEvent{constructor(e){super($_,{detail:e,bubbles:!0,composed:!0})}}const I_="property-config-deleted";class w_ extends CustomEvent{constructor(e){super(I_,{detail:e,bubbles:!0,composed:!0})}}var wt;(function(t){t.OPEN="open",t.MESSAGE="message",t.ACCEPT_TEXT="acceptText",t.DECLINE_TEXT="declineText"})(wt||(wt={}));const Nn={[wt.OPEN]:{default:!1,control:"boolean",description:"Whether the pop-up is open or not"},[wt.MESSAGE]:{default:"Are you sure?",control:"text",description:"The message to display in the pop-up"},[wt.ACCEPT_TEXT]:{default:"Accept",control:"text",description:"Text for the accept button"},[wt.DECLINE_TEXT]:{default:"Decline",control:"text",description:"Text for the decline button"}},x_="confirmation-accepted";class P_ extends CustomEvent{constructor(e){super(x_,{bubbles:!0,composed:!0,detail:e})}}const N_="confirmation-declined";class L_ extends CustomEvent{constructor(e){super(N_,{bubbles:!0,composed:!0,detail:e})}}var et;(function(t){t.OPEN="open",t.CLOSE_BUTTON="closeButton",t.CLOSE_ON_OUTSIDE_CLICK="closeOnOutsideClick",t.CLOSE_ON_ESC="closeOnEsc"})(et||(et={}));const Ln={[et.OPEN]:{default:!1,control:"boolean",description:"Whether the pop-up is open or not"},[et.CLOSE_BUTTON]:{default:!1,control:"boolean",description:"Whether to show the close button"},[et.CLOSE_ON_OUTSIDE_CLICK]:{default:!1,control:"boolean",description:"Whether to close the pop-up when clicking outside of it"},[et.CLOSE_ON_ESC]:{default:!1,control:"boolean",description:"Whether to close the pop-up when pressing the ESC key"}},D_="pop-up-closed";class Gr extends CustomEvent{constructor(e){super(D_,{bubbles:!0,composed:!0,detail:e})}}var Ze=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},ul,hl,pl,fl,Qs;let Ie=(Qs=class extends O{constructor(){super(...arguments),this[ul]=Ln[et.OPEN].default,this[hl]=Ln[et.CLOSE_BUTTON].default,this[pl]=Ln[et.CLOSE_ON_OUTSIDE_CLICK].default,this[fl]=Ln[et.CLOSE_ON_ESC].default,this.newlyOpened=!1,this.handleClickOutside=e=>{!this.newlyOpened&&this[et.CLOSE_ON_OUTSIDE_CLICK]&&this[et.OPEN]&&!e.composedPath().includes(this.container)&&this.dispatchEvent(new Gr({}))},this.handleKeyDown=e=>{this[et.CLOSE_ON_ESC]&&e.key==="Escape"&&this.dispatchEvent(new Gr({}))}}get classes(){return{"pop-up":!0,open:this.open}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("click",this.handleClickOutside)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("click",this.handleClickOutside)}updated(e){super.updated(e),e.has(et.OPEN)&&(this[et.OPEN]?(this.newlyOpened=!0,setTimeout(()=>{this.newlyOpened=!1},100)):this.newlyOpened=!1)}render(){return c`
      <div class=${Q(this.classes)} part="container">
        <div class="inner">
          ${this[et.CLOSE_BUTTON]?c`
                <div
                  class="close-button"
                  @click=${()=>{this.dispatchEvent(new Gr({}))}}
                >
                  &#215;
                </div>
              `:S}
          <slot></slot>
        </div>
      </div>
    `}},ul=et.OPEN,hl=et.CLOSE_BUTTON,pl=et.CLOSE_ON_OUTSIDE_CLICK,fl=et.CLOSE_ON_ESC,Qs.styles=[Pt,A`
      :host {
        display: block;
      }

      .pop-up {
        display: none;
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #666;

        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 5rem rgba(0, 0, 0, 0.75);

        &.open {
          display: block;
        }

        .inner {
          padding: 3rem;
          position: relative;
          width: 100%;
          height: 100%;
          box-sizing: border-box;

          .close-button {
            position: absolute;
            top: 0rem;
            right: 0.5rem;
            font-size: 1.5rem;
            cursor: pointer;
          }
        }
      }
    `],Qs);Ze([u({type:Boolean})],Ie.prototype,ul,void 0);Ze([u({type:Boolean})],Ie.prototype,hl,void 0);Ze([u({type:Boolean})],Ie.prototype,pl,void 0);Ze([u({type:Boolean})],Ie.prototype,fl,void 0);Ze([d()],Ie.prototype,"newlyOpened",void 0);Ze([ft(".pop-up")],Ie.prototype,"container",void 0);Ze([d()],Ie.prototype,"classes",null);Ie=Ze([T("pop-up")],Ie);var Ps=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},gl,vl,_l,yl,ti;let ze=(ti=class extends O{constructor(){super(...arguments),this[gl]=Nn[wt.OPEN].default,this[vl]=Nn[wt.MESSAGE].default,this[_l]=Nn[wt.ACCEPT_TEXT].default,this[yl]=Nn[wt.DECLINE_TEXT].default,this.newlyOpened=!1}get classes(){return{"confirmation-modal":!0,open:this.open}}accept(){this.dispatchEvent(new P_({})),this.close()}decline(){this.dispatchEvent(new L_({})),this.close()}close(){this.open=!1}render(){return c`
      <div class=${Q(this.classes)} part="container">
        <pop-up
          ?open=${this.open}
          closeButton
          closeOnOutsideClick
          closeOnEsc
          @pop-up-closed=${this.decline}
        >
          <div class="message" part="message">${this.message}</div>
          <div class="buttons" part="buttons">
            <ss-button positive @click=${this.accept} part="accept-button"
              >${this.acceptText}</ss-button
            >
            <ss-button negative @click=${this.decline} part="decline-button"
              >${this.declineText}</ss-button
            >
          </div>
        </pop-up>
      </div>
    `}},gl=wt.OPEN,vl=wt.MESSAGE,_l=wt.ACCEPT_TEXT,yl=wt.DECLINE_TEXT,ti.styles=[Pt,A`
      :host {
        display: block;
      }

      .confirmation-modal {
        display: none;
        position: fixed;
        width: 50vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 1px solid #666;

        z-index: 1000;
        border-radius: 0.5rem;
        box-shadow: 0 0 5rem rgba(0, 0, 0, 0.75);

        &.open {
          display: block;
        }

        .message {
          padding: 1rem;
        }

        .buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
          padding: 0.5rem;
        }
      }
    `],ti);Ps([u({type:Boolean,reflect:!0})],ze.prototype,gl,void 0);Ps([u()],ze.prototype,vl,void 0);Ps([u()],ze.prototype,_l,void 0);Ps([u()],ze.prototype,yl,void 0);Ps([d()],ze.prototype,"newlyOpened",void 0);Ps([d()],ze.prototype,"classes",null);ze=Ps([T("confirmation-modal")],ze);var R_=Object.defineProperty,U_=Object.getOwnPropertyDescriptor,At=(t,e,s,i)=>{for(var n=i>1?void 0:i?U_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&R_(e,s,n),n},ml,bl,El,Tl,Sl,Cl,Al,$l,Ol,Il,wl,$c;let pt=class extends($c=O,wl=E.DATA_TYPE,Il=E.RENDER_TYPE,Ol=E.ENTITY_CONFIG_ID,$l=E.PROPERTY_CONFIG_ID,Al=E.NAME,Cl=E.REQUIRED,Sl=E.REPEAT,Tl=E.ALLOWED,El=E.PREFIX,bl=E.SUFFIX,ml=E.DEFAULT_VALUE,$c){constructor(){super(...arguments),this.propertyConfig=Oe,this[wl]=vt[E.DATA_TYPE].default,this[Il]=vt[E.RENDER_TYPE].default,this[Ol]=vt[E.ENTITY_CONFIG_ID].default,this[$l]=vt[E.PROPERTY_CONFIG_ID].default,this[Al]=vt[E.NAME].default,this[Cl]=vt[E.REQUIRED].default,this[Sl]=vt[E.REPEAT].default,this[Tl]=vt[E.ALLOWED].default,this[El]=vt[E.PREFIX].default,this[bl]=vt[E.SUFFIX].default,this[ml]=vt[E.DEFAULT_VALUE].default,this.confirmationModalIsOpen=!1}connectedCallback(){super.connectedCallback(),this.propertyConfig=De(this.updatedPropertyConfig,t=>t)}willUpdate(t){if(super.willUpdate(t),t.has("propertyConfig")){const e=t.get("propertyConfig");e&&this.dataType!==e.dataType&&this.handleDataTypeChange()}}get visibleFields(){return Object.values(E).filter(t=>vt[t].control.type!==f.HIDDEN)}validate(){return[]}handleDataTypeChange(t=this.dataType){const e={...this.propertyConfig};switch(t){case R.BOOLEAN:e.defaultValue=!1;break;case R.IMAGE:e.defaultValue={src:"",alt:""};break;case R.INT:e.defaultValue=0;break;case R.SHORT_TEXT:case R.LONG_TEXT:e.defaultValue="";break}this.propertyConfig=e}updateField(t,e){let s=e;vt[t].control.type===f.NUMBER&&(s=Number(s)||0);const i=De(this.propertyConfig,n=>({...n,[t]:s}));this.propertyConfig=i}get updatedPropertyConfig(){const t={id:this[E.PROPERTY_CONFIG_ID],entityConfigId:this[E.ENTITY_CONFIG_ID],renderType:this[E.RENDER_TYPE],name:this[E.NAME],required:this[E.REQUIRED],repeat:this[E.REPEAT],allowed:this[E.ALLOWED],prefix:this[E.PREFIX],suffix:this[E.SUFFIX],dataType:R.BOOLEAN,defaultValue:!1,userId:""};switch(this[E.DATA_TYPE]){case R.IMAGE:return{...t,dataType:R.IMAGE,defaultValue:this[E.DEFAULT_VALUE]};case R.INT:return{...t,dataType:R.INT,defaultValue:Number(this[E.DEFAULT_VALUE])||0};case R.BOOLEAN:return{...t,dataType:R.BOOLEAN,defaultValue:!!this[E.DEFAULT_VALUE]};case R.SHORT_TEXT:return{...t,dataType:R.SHORT_TEXT,defaultValue:this[E.DEFAULT_VALUE]};case R.LONG_TEXT:return{...t,dataType:R.LONG_TEXT,defaultValue:this[E.DEFAULT_VALUE]}}return t}async save(){if(this[E.PROPERTY_CONFIG_ID]){const t=await w.updatePropertyConfig(this.propertyConfig);t&&(X(p("Property configuration updated successfully.")),this.dispatchEvent(new A_(t)))}else{const t=await w.addPropertyConfig(this.propertyConfig);t&&(X(p("Property configuration added successfully.")),this.dispatchEvent(new O_(t)))}}async delete(){this.confirmationModalIsOpen=!1,await w.deletePropertyConfig(this[E.ENTITY_CONFIG_ID],this[E.PROPERTY_CONFIG_ID])&&(X(p("Property configuration deleted successfully.")),this.dispatchEvent(new w_(this[E.PROPERTY_CONFIG_ID])))}get inSync(){if(!this[E.PROPERTY_CONFIG_ID])return!1;const t=JSON.stringify(this.updatedPropertyConfig),e=JSON.stringify(this.propertyConfig);return t===e}renderDefaultValueField(){switch(this.propertyConfig[E.DATA_TYPE]){case R.BOOLEAN:return c` <ss-toggle
          ?on=${this.propertyConfig[E.DEFAULT_VALUE]}
          @toggle-changed=${t=>{this.updateField(E.DEFAULT_VALUE,t.detail.on)}}
        ></ss-toggle>`;case R.IMAGE:return c` <image-field
          src=${this.propertyConfig[E.DEFAULT_VALUE].src}
          alt=${this.propertyConfig[E.DEFAULT_VALUE].alt}
          @property-changed=${t=>{this.updateField(E.DEFAULT_VALUE,t.detail.value)}}
        ></image-field>`;case R.INT:return c`
          <ss-input
            type="number"
            .value=${this.propertyConfig[E.DEFAULT_VALUE]}
            @input-changed=${t=>{this.updateField(E.DEFAULT_VALUE,parseInt(t.detail.value))}}
          ></ss-input>
        `;default:return c`
          <ss-input
            type="text"
            .value=${this.propertyConfig[E.DEFAULT_VALUE]}
            @input-changed=${t=>{this.updateField(E.DEFAULT_VALUE,t.detail.value)}}
          ></ss-input>
        `}}renderField(t){if(t===E.DEFAULT_VALUE)return this.renderDefaultValueField();switch(vt[t].control.type){case f.SELECT:return c`
          <ss-select
            .options=${vt[t].control.options.map(e=>({label:p(e),value:e}))}
            selected=${this[t]}
            @select-changed=${e=>{this.updateField(t,e.detail.value),t===E.DATA_TYPE&&this.handleDataTypeChange(e.detail.value)}}
          ></ss-select>
        `;case f.NUMBER:case f.TEXT:return c`
          <ss-input
            type=${vt[t].control.type}
            value=${this[t]}
            @input-changed=${e=>{this.updateField(t,e.detail.value)}}
          ></ss-input>
        `}}render(){return c`
      <fieldset class="entity-config-form">
        <legend>${p("Property Configuration")}</legend>

      ${this.visibleFields.map(t=>c` <div class="field">
            <label for=${t}>${p(t)}</label>
            ${this.renderField(t)}
          </div>`)}
        </div>
      </fieldset>
      <div class="buttons">
        <ss-button positive ?disabled=${this.inSync} @click=${()=>{this.save()}}>
          ${p("Save")}
        </ss-button>
        <ss-button negative ?disabled=${!this[E.PROPERTY_CONFIG_ID]} @click=${()=>{this.confirmationModalIsOpen=!0}}>
          ${p("Delete")}
        </ss-button>
      </div>
      <confirmation-modal 
        ?open=${this.confirmationModalIsOpen}
        @confirmation-accepted=${this.delete}
        @confirmation-declined=${()=>{this.confirmationModalIsOpen=!1}}></confirmation-modal>

      `}};pt.styles=A`
    :host {
      display: block;
      padding: 1rem;
    }

    fieldset {
      border-radius: 0.5rem;
    }

    .buttons {
      padding: 0.5rem 0;

      ss-button {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  `;At([d()],pt.prototype,"propertyConfig",2);At([u({type:String})],pt.prototype,wl,2);At([u({type:String})],pt.prototype,Il,2);At([u({type:Number})],pt.prototype,Ol,2);At([u({type:Number})],pt.prototype,$l,2);At([u({type:String})],pt.prototype,Al,2);At([u({type:Number})],pt.prototype,Cl,2);At([u({type:Number})],pt.prototype,Sl,2);At([u({type:Number})],pt.prototype,Tl,2);At([u({type:String})],pt.prototype,El,2);At([u({type:String})],pt.prototype,bl,2);At([u()],pt.prototype,ml,2);At([d()],pt.prototype,"confirmationModalIsOpen",2);At([d()],pt.prototype,"updatedPropertyConfig",1);pt=At([T("property-config-form")],pt);var M_=Object.defineProperty,j_=Object.getOwnPropertyDescriptor,Qe=(t,e,s,i)=>{for(var n=i>1?void 0:i?j_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&M_(e,s,n),n},xl,Pl,Nl,Ll,Oc;let ve=class extends(Oc=O,Ll=Lt.ENTITY_CONFIG_ID,Nl=Lt.NAME,Pl=Lt.DESCRIPTION,xl=Lt.PROPERTIES,Oc){constructor(){super(...arguments),this.entityConfig=Qu,this.confirmationModalIsOpen=!1,this.open=!1,this[Ll]=Pn[Lt.ENTITY_CONFIG_ID].default,this[Nl]=Pn[Lt.NAME].default,this[Pl]=Pn[Lt.DESCRIPTION].default,this[xl]=Pn[Lt.PROPERTIES].default}connectedCallback(){super.connectedCallback(),this.entityConfig={userId:"",id:this[Lt.ENTITY_CONFIG_ID],name:this[Lt.NAME],description:this[Lt.DESCRIPTION],properties:this[Lt.PROPERTIES]}}updateName(t){this.entityConfig={...this.entityConfig,name:t}}updateDescription(t){this.entityConfig={...this.entityConfig,description:t}}validate(){const t=[];return this.entityConfig.name||t.push(p("entityConfigNameRequired")),t}async save(){if(this.validate().length>0){X(p("entityConfigValidationFailed"),B.ERROR);return}let e;if(this.entityConfig.id?e=await w.updateEntityConfig(this.entityConfig):e=await w.addEntityConfig(this.entityConfig),!e){X(p("failedToSaveEntityConfig"),B.ERROR);return}X(p("entityConfigSaved"),B.SUCCESS)}async delete(){if(!await w.deleteEntityConfig(this.entityConfig.id)){X(p("failedToDeleteEntityConfig"),B.ERROR);return}X(p("entityConfigDeleted"),B.SUCCESS)}addPropertyToTop(){const t=De(Oe,s=>s),e=De(this.entityConfig,s=>{s.properties.unshift(t)});this.entityConfig=e}addPropertyToBottom(){const t=De(this.entityConfig,e=>{e.properties.push(Oe)});this.entityConfig=t}updateProperty(t,e){const s=De(this.entityConfig,i=>{i.properties[t]=e});this.entityConfig=s}deleteProperty(t){const e=De(this.entityConfig,s=>{s.properties.splice(t,1)});this.entityConfig=e}toggle(t){this.open=t.detail.isOpen}render(){return c`
      <ss-collapsable
        title=${this.entityConfig.name||p("Entity Configuration")}
        ?open=${this.open}
        panelId=${`entityConfigForm-${this.entityConfig.id}`}
        @collapsable-toggled=${this.toggle}
      >
        <div class="entity-config-form">
          <div class="field">
            <label for="entity-name">${p("Entity Name")}</label>

            <ss-input
              id="entity-name"
              .value=${this.entityConfig.name}
              @input-changed=${t=>this.updateName(t.detail.value)}
            ></ss-input>
          </div>

          <div class="field">
            <label for="entity-description">${p("Entity Description")}</label>

            <ss-input
              id="entity-description"
              .value=${this.entityConfig.description}
              @input-changed=${t=>this.updateDescription(t.detail.value)}
            ></ss-input>
          </div>

          <div class="buttons">
            <ss-button positive @click=${this.save}>${p("Save")}</ss-button>

            <ss-button
              negative
              @click=${()=>{this.confirmationModalIsOpen=!0}}
              >${p("Delete")}</ss-button
            >
          </div>

          <div class="properties">
            <ss-button @click=${this.addPropertyToTop}
              >${p("Add Property")}</ss-button
            >

            ${z(this.entityConfig.properties,t=>t.id,(t,e)=>c`
                <property-config-form
                  entityConfigId=${this.entityConfig.id}
                  propertConfigId=${t.id}
                  dataType=${t.dataType}
                  renderType=${t.renderType}
                  propertyConfigId=${t.id}
                  name=${t.name}
                  required=${t.required}
                  repeat=${t.repeat}
                  allowed=${t.allowed}
                  prefix=${t.prefix}
                  suffix=${t.suffix}
                  .defaultValue=${t.defaultValue}
                  @property-config-updated=${s=>this.updateProperty(e,s.detail)}
                  @property-config-added=${s=>this.updateProperty(e,s.detail)}
                  @property-config-deleted=${()=>{this.deleteProperty(e)}}
                ></property-config-form>
              `)}
            ${this.entityConfig.properties.length>0?c` <ss-button @click=${this.addPropertyToBottom}
                  >${p("Add Property")}</ss-button
                >`:S}
          </div>
        </div>
      </ss-collapsable>

      <confirmation-modal
        ?open=${this.confirmationModalIsOpen}
        @confirmation-accepted=${this.delete}
        @confirmation-declined=${()=>{this.confirmationModalIsOpen=!1}}
      ></confirmation-modal>
    `}};ve.styles=A`
    :host {
      display: block;
      padding: 1rem;
    }

    .field {
      margin-bottom: 1rem;
    }

    .buttons {
      padding: 0.5rem 0;

      ss-button {
        display: block;
        margin-bottom: 0.5rem;
      }
    }

    property-config-form {
      display: block;
      margin-bottom: 1rem;
    }
  `;Qe([d()],ve.prototype,"entityConfig",2);Qe([d()],ve.prototype,"confirmationModalIsOpen",2);Qe([u({type:Boolean,reflect:!0})],ve.prototype,"open",2);Qe([u({type:Number})],ve.prototype,Ll,2);Qe([u({type:String})],ve.prototype,Nl,2);Qe([u({type:String})],ve.prototype,Pl,2);Qe([u({type:Array})],ve.prototype,xl,2);ve=Qe([T("entity-config-form")],ve);var F_=Object.getOwnPropertyDescriptor,V_=(t,e,s,i)=>{for(var n=i>1?void 0:i?F_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=o(n)||n);return n};let Dl=class extends gn{constructor(){super(...arguments),this.state=gt}connectedCallback(){super.connectedCallback(),this.loadEntityConfigs()}async loadEntityConfigs(){const t=await w.getEntityConfigs();t&&this.state.setEntityConfigs(t),this.ready=!0}addEntityConfig(){const t=De(Qu,e=>e);this.state.setEntityConfigs([...this.state.entityConfigs,t])}isPanelOpen(t){return t?this.state.collapsablePanelState[`entityConfigForm-${t}`]||!1:!0}render(){return c`
      <div class="admin-dashboard box">
        ${this.state.entityConfigs.map(t=>c`
            <entity-config-form
              entityConfigId=${t.id}
              name=${t.name}
              description=${t.description}
              .properties=${of(t.properties)}
              ?open=${this.isPanelOpen(t.id)}
            ></entity-config-form>
          `)}

        <div class="buttons">
          <ss-button @click=${this.addEntityConfig}>
            ${p("Add Entity Config")}
          </ss-button>
        </div>
      </div>
    `}};Dl.styles=[H,A`
      .buttons {
        padding: 1rem;
      }
    `];Dl=V_([T("admin-dashboard")],Dl);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B_=Symbol.for(""),G_=t=>{if((t==null?void 0:t.r)===B_)return t==null?void 0:t._$litStatic$},Ic=new Map,H_=t=>(e,...s)=>{const i=s.length;let n,r;const o=[],a=[];let l,h=0,g=!1;for(;h<i;){for(l=e[h];h<i&&(r=s[h],(n=G_(r))!==void 0);)l+=n+e[++h],g=!0;h!==i&&a.push(r),o.push(l),h++}if(h===i&&o.push(e[i]),g){const v=o.join("$$lit$$");(e=Ic.get(v))===void 0&&(o.raw=o,Ic.set(v,e=o)),s=a}return t(e,...s)},X_=H_(c),k_="user-logged-out";class Y_ extends CustomEvent{constructor(e){super(k_,{bubbles:!0,composed:!0,detail:e})}}var z_=Object.defineProperty,q_=Object.getOwnPropertyDescriptor,fd=(t,e,s,i)=>{for(var n=i>1?void 0:i?q_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&z_(e,s,n),n};let sn=class extends Ht{constructor(){super(...arguments),this.state=gt,this.username="",this.password=""}async logout(){await P.get("logout")&&(w.setAuthToken(""),P.setAuthToken(""),this.state.setAuthToken(""),this.state.setForbidden(!0),X(p("You are now logged out."),B.INFO),this.dispatchEvent(new Y_({})))}render(){return c`
      <div>
        <button @click=${this.logout}>${p("Logout")}</button>
      </div>
    `}};sn.styles=[H,A`
      .box {
        padding: 1rem;
        margin-bottom: 1rem;
      }
    `];fd([d()],sn.prototype,"username",2);fd([d()],sn.prototype,"password",2);sn=fd([T("user-pane")],sn);var W_=Object.defineProperty,K_=Object.getOwnPropertyDescriptor,yr=(t,e,s,i)=>{for(var n=i>1?void 0:i?K_(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&W_(e,s,n),n};let gi=class extends Ht{constructor(){super(...arguments),this.state=gt,this.open=!1,this.mouseIn=!1}get classes(){return{widget:!0,open:this.open}}handleToggleAdvancedChanged(t){this.state.setAdvancedMode(t.detail.on),w.saveAdvancedMode(t.detail.on)}handleToggleDebugChanged(t){this.state.setDebugMode(t.detail.on),w.saveDebugMode(t.detail.on)}handleToggleOpen(){this.open=!this.open}handleOpen(){this.open=!0}handleMouseEnter(){this.mouseIn=!0,this.timeout&&clearTimeout(this.timeout)}handleMouseLeave(){this.mouseIn=!1,this.timeout=setTimeout(()=>{this.open=!1},500)}render(){return X_`
      <div
        class=${Q(this.classes)}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <div class="head" @click=${this.handleToggleOpen}>
          <div class="left"></div>

          <div class="center">
            <div class="handle"></div>
          </div>

          <div class="right"></div>
        </div>

        <div class="body" @mouseenter=${this.handleOpen}>
          <div class="user">
            <user-pane></user-pane>
          </div>

          <div class="option">
            <h4>${p("Advanced mode")}</h4>
            <ss-toggle
              @toggle-changed=${this.handleToggleAdvancedChanged}
              ?on=${this.state.advancedMode}
            ></ss-toggle>
          </div>

          <div class="option">
            <h4>${p("Debug mode")}</h4>
            <ss-toggle
              @toggle-changed=${this.handleToggleDebugChanged}
              ?on=${this.state.debugMode}
            ></ss-toggle>
          </div>
        </div>
      </div>
    `}};gi.styles=[H,A`
      :host {
        --background-color: #ccc;
        --border-color: #999;
        --head-height: 2rem;
      }

      .widget {
        position: fixed;
        z-index: 1000;
        bottom: 0;
        left: 5%;
        width: 90%;
        opacity: 0.6;
        transition: all 0.2s;
        transform: translateY(88%);

        @media (hover: hover) {
          &:hover {
            opacity: 0.9;
            transform: translateY(86%);
            //bottom: -4rem;

            .head {
              .handle {
                transform: translateY(-50%) scale(1.125);
                box-shadow: 0 0 5px #000;
              }
            }
          }
        }

        &.open {
          opacity: 1;
          bottom: 0;
          transform: translateY(0%);

          .head {
            cursor: s-resize;
          }
        }
      }

      .head {
        z-index: 2;
        position: relative;
        height: var(--head-height);
        margin: auto;
        cursor: n-resize;
        display: flex;

        .left,
        .right {
          width: var(--head-height);
          height: var(--head-height);
          position: relative;
          overflow: hidden;

          &::before {
            z-index: 0;
            position: absolute;
            top: 0.4rem;
            content: '';
            width: calc(var(--head-height) / 1.42 * 2);
            height: calc(var(--head-height) / 1.42 * 2);
            background-color: var(--background-color);
            transform: rotate(45deg);
            border-radius: 0px;
          }

          &.left::before {
            left: 10px;
            border-left: 1px var(--border-color) solid;
          }

          &.right::before {
            right: 10px;
            border-top: 1px var(--border-color) solid;
          }
        }

        .center {
          border-top: 1px var(--border-color) solid;
          position: relative;
          background-color: var(--background-color);
          flex-grow: 10;
          height: var(--head-height);
        }

        .handle {
          position: absolute;
          left: 10%;
          top: 50%;
          width: 80%;
          border-radius: 0.25rem;
          height: 0.25rem;
          background-color: #666;
          transform: translateY(-50%);
          border: 1px #444 solid;
          transition: all 0.2s;
        }
      }

      .body {
        transition: all 0.3s;
        position: relative;
        z-index: 3;
        background-color: var(--background-color);
        width: 100%;
        margin: auto;
        border-left: 1px var(--border-color) solid;
        border-right: 1px var(--border-color) solid;
        box-sizing: border-box;
        margin-top: -2px;

        .user {
          padding: 1rem;
        }

        .option {
          display: flex;
          padding: 1rem;
          flex-direction: row;
          justify-content: space-between;

          h4 {
            margin: 0;
            line-height: 3rem;
            height: 3rem;
          }
        }
      }
    `];yr([d()],gi.prototype,"open",2);yr([d()],gi.prototype,"mouseIn",2);yr([d()],gi.prototype,"classes",1);gi=yr([T("floating-widget")],gi);const J_="user-logged-in";class Z_ extends CustomEvent{constructor(e){super(J_,{bubbles:!0,composed:!0,detail:e})}}var Q_=Object.defineProperty,ty=Object.getOwnPropertyDescriptor,mr=(t,e,s,i)=>{for(var n=i>1?void 0:i?ty(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Q_(e,s,n),n};let vi=class extends Ht{constructor(){super(...arguments),this.state=gt,this.username="",this.password="",this.loading=!1}handleUsernameChanged(t){this.username=t.detail.value}handleUsernameSubmitted(t){this.login()}handlePasswordChanged(t){this.password=t.detail.value}handlePasswordSubmitted(t){this.login()}async login(){this.loading=!0;const t=await P.post("login",{username:this.username,password:this.password});if(t&&t.status!==401){w.setAuthToken(t.response.authToken),P.setAuthToken(t.response.authToken),this.state.setAuthToken(t.response.authToken),this.state.setForbidden(!1),X(p("You are now logged in."),B.SUCCESS),this.dispatchEvent(new Z_({}));return}X(p("Incorrect username and password combination."),B.ERROR),this.loading=!1}render(){return c`
      <form>
        <ss-input
          id="username"
          placeholder=${p("Username")}
          @input-submitted=${this.handleUsernameSubmitted}
          @input-changed=${this.handleUsernameChanged}
          value=${this.username}
        ></ss-input>

        <ss-input
          id="password"
          placeholder=${p("Password")}
          type="password"
          @input-submitted=${this.handlePasswordSubmitted}
          @input-changed=${this.handlePasswordChanged}
          value=${this.password}
        ></ss-input>

        <ss-button
          @click=${this.login}
          text=${p("Login")}
          ?loading=${this.loading}
        ></ss-button>
      </form>
    `}};vi.styles=[H,A`
      .box {
        padding: 1rem;
        margin-bottom: 1rem;
      }
    `];mr([d()],vi.prototype,"username",2);mr([d()],vi.prototype,"password",2);mr([d()],vi.prototype,"loading",2);vi=mr([T("login-form")],vi);var ey=Object.getOwnPropertyDescriptor,sy=(t,e,s,i)=>{for(var n=i>1?void 0:i?ey(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=o(n)||n);return n};let Rl=class extends O{render(){return c`
      <div class="box forbidden">
        <div class="message">${p("You need to login to view this.")}</div>

        <div class="login-form">
          <login-form></login-form>
        </div>
      </div>
    `}};Rl.styles=[H,A`
      .forbidden {
        text-align: center;

        .message {
          padding: 1rem;
        }

        .login-form {
          padding: 1rem;
        }
      }
    `];Rl=sy([T("forbidden-notice")],Rl);var Kt;(function(t){t.DELETE="delete",t.REPLACE_TAGS="replaceTags",t.ADD_TAGS="addTags",t.REMOVE_TAGS="removeTags"})(Kt||(Kt={}));const iy=[Kt.ADD_TAGS,Kt.REMOVE_TAGS,Kt.REPLACE_TAGS],ny={[Kt.ADD_TAGS]:p("operationType.addTags"),[Kt.DELETE]:p("operationType.delete"),[Kt.REMOVE_TAGS]:p("operationType.removeTags"),[Kt.REPLACE_TAGS]:p("operationType.replaceTags")},ry="operation-performed";class oy extends CustomEvent{constructor(e){super(ry,{bubbles:!0,composed:!0,detail:e})}}var ay=Object.defineProperty,ly=Object.getOwnPropertyDescriptor,we=(t,e,s,i)=>{for(var n=i>1?void 0:i?ly(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&ay(e,s,n),n};let te=class extends Ht{constructor(){super(...arguments),this.minLengthForSuggestion=1,this.state=gt,this.operationType=Kt.ADD_TAGS,this.tagValue="",this.tags=[],this.loading=!1,this.lastInput={value:"",hadResults:!0},this.tagSuggestions=[]}get tagSuggestionsEnabled(){return this.state.listConfig.setting[V.TAG_SUGGESTIONS]!==Ae.DISABLED}get showTagManager(){return iy.includes(this.operationType)}get classes(){return{box:!0,"bulk-manager":!0,shown:this.state.selectedActions.length>0}}handleTypeChanged(t){const e=t.detail.value;this.operationType=e}async handlePerformOperation(){await P.post("operation",{operation:{tags:this.tags,type:this.operationType},actions:this.state.selectedActions}),this.state.setSelectedActions([]),this.state.setSelectMode(!1),X(p("The operation has been performed successfully."),B.INFO),this.dispatchEvent(new oy({type:this.operationType,actions:this.state.selectedActions}))}handleTagsUpdated(t){this.tags=t.detail.tags}async handleTagSuggestionsRequested(t){const e=t.detail.value;if(!this.lastInput.hadResults&&e.startsWith(this.lastInput.value)||!this.tagSuggestionsEnabled){this.tagSuggestions=[];return}this.lastInput.hadResults=!1,this.lastInput.value=e;let s=[];if(e.length>=this.minLengthForSuggestion){const i=await P.get(`tag/${e}`);i&&(s=i.response.tags)}(s.length||e==="")&&(this.lastInput.hadResults=!0),this.tagSuggestions=s}handleSelectAll(){this.state.toggleSelectAll()}render(){return c`
      <div class=${Q(this.classes)}>
        <ss-select
          selected=${this.operationType}
          @select-changed=${this.handleTypeChanged}
          .options=${Object.values(Kt).map(t=>({value:t,label:ny[t]}))}
        ></ss-select>

        ${this.showTagManager?c`
              <tag-manager
                ?enableSuggestions=${this.tagSuggestionsEnabled}
                value=${this.tagValue}
                @tags-updated=${this.handleTagsUpdated}
                @tag-suggestions-requested=${this.handleTagSuggestionsRequested}
              >
                <div slot="tags">
                  ${z(this.tags,t=>t,t=>c`<data-item>${t}</data-item>`)}
                </div>

                <div slot="suggestions">
                  ${z(this.tagSuggestions,t=>t,t=>c`<data-item>${t}</data-item>`)}
                </div>
              </tag-manager>
            `:S}

        <div class="number-selected">
          ${this.state.selectedActions.length===1?p("1 item selected"):p(Nf`${this.state.selectedActions.length.toString()} items selected`)}
        </div>

        <div class="select-all">
          <ss-button
            text=${p("Select all")}
            @click=${this.handleSelectAll}
          ></ss-button>
        </div>

        <ss-button
          text=${p("Perform operation")}
          @click=${this.handlePerformOperation}
        ></ss-button>
      </div>
    `}};te.styles=[H,A`
      .bulk-manager {
        position: sticky;
        top: 0;
        left: 0;
        padding: 1rem;
        box-shadow: 0 0 10px #000;
        display: none;

        &.shown {
          display: block;
        }
      }

      .number-selected,
      .select-all {
        text-align: center;
        color: #555;
        padding: 1rem;
      }
    `];we([d()],te.prototype,"operationType",2);we([d()],te.prototype,"tagValue",2);we([d()],te.prototype,"tags",2);we([d()],te.prototype,"loading",2);we([d()],te.prototype,"lastInput",2);we([d()],te.prototype,"tagSuggestions",2);we([d()],te.prototype,"showTagManager",1);we([d()],te.prototype,"classes",1);te=we([T("bulk-manager")],te);var dy=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let wc=class extends O{render(){return c`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
          fill="currentColor"
        />
      </svg>
    `}};wc=dy([T("svg-profile")],wc);var cy=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let xc=class extends O{render(){return c`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1.71,12.29a1,1,0,0,1,0,1.42,1,1,0,0,1-1.42,0l-3-3a1,1,0,0,1,0-1.42l3-3a1,1,0,0,1,1.42,1.42L11.41,12Z"
          fill="currentColor"
        ></path>
      </svg>
    `}};xc=cy([T("svg-arrow-circle-left")],xc);var uy=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Pc=class extends O{render(){return c`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm2.71,10.71-3,3a1,1,0,0,1-1.42,0,1,1,0,0,1,0-1.42L12.59,12l-2.3-2.29a1,1,0,0,1,1.42-1.42l3,3A1,1,0,0,1,14.71,12.71Z"
          fill="currentColor"
        ></path>
      </svg>
    `}};Pc=uy([T("svg-arrow-circle-right")],Pc);var hy=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Nc=class extends O{render(){return c`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM18.4158 9.70405C18.8055 9.31268 18.8041 8.67952 18.4127 8.28984L17.7041 7.58426C17.3127 7.19458 16.6796 7.19594 16.2899 7.58731L10.5183 13.3838L7.19723 10.1089C6.80398 9.72117 6.17083 9.7256 5.78305 10.1189L5.08092 10.8309C4.69314 11.2241 4.69758 11.8573 5.09083 12.2451L9.82912 16.9174C10.221 17.3039 10.8515 17.301 11.2399 16.911L18.4158 9.70405Z"
          fill="currentColor"
        />
      </svg>
    `}};Nc=hy([T("svg-valid-circle")],Nc);var py=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Lc=class extends O{render(){return c`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM7.75736 7.05025C8.14788 6.65973 8.78105 6.65973 9.17157 7.05025L12 9.87868L14.8284 7.05025C15.219 6.65973 15.8521 6.65973 16.2426 7.05025L16.9497 7.75736C17.3403 8.14788 17.3403 8.78105 16.9497 9.17157L14.1213 12L16.9497 14.8284C17.3403 15.219 17.3403 15.8521 16.9497 16.2426L16.2426 16.9497C15.8521 17.3403 15.219 17.3403 14.8284 16.9497L12 14.1213L9.17157 16.9497C8.78105 17.3403 8.14788 17.3403 7.75736 16.9497L7.05025 16.2426C6.65973 15.8521 6.65973 15.219 7.05025 14.8284L9.87868 12L7.05025 9.17157C6.65973 8.78105 6.65973 8.14788 7.05025 7.75736L7.75736 7.05025Z"
          fill="currentColor"
        />
      </svg>
    `}};Lc=py([T("svg-invalid-circle")],Lc);var fy=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Dc=class extends O{render(){return c`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M841.36,187.993L736.009,82.64c-6.51-6.51-16.622-7.735-24.499-2.968l-54.938,33.252
		c-26.704-14.917-55.296-26.858-85.328-35.375l-15.326-62.326C553.719,6.284,545.702,0,536.496,0h-148.99
		c-9.206,0-17.223,6.284-19.421,15.224L352.759,77.55c-30.032,8.517-58.624,20.458-85.328,35.375l-54.938-33.252
		c-7.876-4.767-17.989-3.542-24.499,2.968L82.642,187.993c-6.51,6.51-7.735,16.622-2.968,24.498l33.252,54.938
		c-14.917,26.704-26.857,55.296-35.375,85.328l-62.326,15.326c-8.94,2.199-15.224,10.216-15.224,19.422v148.99
		c0,9.206,6.284,17.223,15.224,19.421l62.326,15.326c8.517,30.032,20.458,58.624,35.375,85.328l-33.252,54.938
		c-4.767,7.876-3.542,17.988,2.968,24.498L187.993,841.36c6.51,6.509,16.622,7.734,24.499,2.968l54.938-33.252
		c26.704,14.917,55.295,26.856,85.328,35.375l15.326,62.326c2.198,8.939,10.215,15.224,19.421,15.224h148.99
		c9.206,0,17.223-6.284,19.421-15.224l15.326-62.326c30.032-8.518,58.624-20.458,85.328-35.375l54.938,33.252
		c7.876,4.767,17.989,3.542,24.499-2.968l105.353-105.353c6.51-6.51,7.734-16.622,2.968-24.498l-33.252-54.938
		c14.917-26.704,26.856-55.296,35.375-85.328l62.326-15.326C917.716,553.72,924,545.703,924,536.497v-148.99
		c0-9.206-6.284-17.223-15.224-19.421L846.45,352.76c-8.518-30.032-20.458-58.624-35.375-85.328l33.252-54.938
		C849.095,204.615,847.87,194.502,841.36,187.993z M462.001,670.481c-115.141,0-208.48-93.341-208.48-208.481
		c0-115.141,93.34-208.481,208.48-208.481S670.482,346.859,670.482,462C670.482,577.14,577.142,670.481,462.001,670.481z"
          fill="currentColor"
        />
      </svg>
    `}};Dc=fy([T("svg-gear")],Dc);var gy=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};let Rc=class extends O{render(){return c`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11H8Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
          fill="currentColor"
        />
      </svg>
    `}};Rc=gy([T("svg-delete")],Rc);var ne;(function(t){t.PROFILE="profile",t.ARROW_CIRCLE_LEFT="arrowCircleLeft",t.ARROW_CIRCLE_RIGHT="arrowCircleRight",t.VALID_CIRCLE="validCircle",t.INVALID_CIRCLE="invalidCircle",t.GEAR="gear",t.DELETE="delete"})(ne||(ne={}));var _t;(function(t){t.NAME="name",t.SIZE="size",t.COLOR="color"})(_t||(_t={}));const Hr={[_t.NAME]:{default:ne.PROFILE,description:"The name of the icon to display",control:"text"},[_t.SIZE]:{default:24,description:"The size of the icon in pixels",control:"number"},[_t.COLOR]:{default:"#000",description:"The color of the icon",control:"text"}};var br=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},Ul,Ml,jl,ei;let nn=(ei=class extends O{constructor(){super(...arguments),this[Ul]=Hr[_t.NAME].default,this[Ml]=Hr[_t.COLOR].default,this[jl]=Hr[_t.SIZE].default}updated(e){super.updated(e),e.has(_t.SIZE)&&this.style.setProperty("--size",`${this[_t.SIZE]}px`)}renderIcon(){switch(this[_t.NAME]){case ne.PROFILE:return c`<svg-profile></svg-profile>`;case ne.ARROW_CIRCLE_LEFT:return c`<svg-arrow-circle-left></svg-arrow-circle-left>`;case ne.ARROW_CIRCLE_RIGHT:return c`<svg-arrow-circle-right></svg-arrow-circle-right>`;case ne.VALID_CIRCLE:return c`<svg-valid-circle></svg-valid-circle>`;case ne.INVALID_CIRCLE:return c`<svg-invalid-circle></svg-invalid-circle>`;case ne.GEAR:return c`<svg-gear></svg-gear>`;case ne.DELETE:return c`<svg-delete></svg-delete>`;default:return S}}render(){return c`
      <span
        class="icon"
        style="--color: ${this[_t.COLOR]}; --size: ${this[_t.SIZE]}px;"
      >
        ${this.renderIcon()}
      </span>
    `}},Ul=_t.NAME,Ml=_t.COLOR,jl=_t.SIZE,ei.styles=[Pt,A`
      :host {
        display: inline-block;
        vertical-align: middle;
        width: var(--size, 24px);
        height: var(--size, 24px);
      }

      .icon {
        display: inline-block;
        width: var(--size, 24px);
        height: var(--size, 24px);

        & > * {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: var(--color, #000);
        }
      }
    `],ei);br([u()],nn.prototype,Ul,void 0);br([u()],nn.prototype,Ml,void 0);br([u({type:Number})],nn.prototype,jl,void 0);nn=br([T("ss-icon")],nn);var U;(function(t){t.INFINITE="infinite",t.NAVIGATION_INDEX="navigationIndex",t.SHOW_BUTTONS="showButtons",t.MOUSE_SCROLL="mouseScroll",t.WIDTH="width",t.HEIGHT="height",t.GAP="gap",t.PERSPECTIVE="perspective",t.DISCRETE="discrete"})(U||(U={}));const Ne={[U.INFINITE]:{default:!1,control:"boolean",description:"Whether the carousel should loop infinitely"},[U.NAVIGATION_INDEX]:{default:0,control:"number",description:"The index of the active slide"},[U.SHOW_BUTTONS]:{default:!1,control:"boolean",description:"Whether to show the navigation buttons"},[U.MOUSE_SCROLL]:{default:!1,control:"boolean",description:"Whether to allow mouse scrolling"},[U.WIDTH]:{default:"210px",control:"text",description:"The width of the carousel"},[U.HEIGHT]:{default:140,control:"number",description:"The height of the carousel"},[U.GAP]:{default:10,control:"number",description:"The gap between frames"},[U.PERSPECTIVE]:{default:500,control:"number",description:"The perspective of the carousel"},[U.DISCRETE]:{default:!1,control:"boolean",description:"Whether the carousel should show inactive frames when it does not have contact"}},vy="carousel-slide-changed";class _y extends CustomEvent{constructor(e){super(vy,{bubbles:!0,composed:!0,detail:e})}}var Y=function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r},Fl,Vl,Bl,Gl,Hl,Xl,kl,Yl,si;let G=(si=class extends O{constructor(){super(...arguments),this.keyframes=`
      @keyframes become-active {
        0% {
        --slide-scale: 1;
        }
        50% {
        --slide-scale: 1.2;
        }
        100% {
        --slide-scale: 1;
        }
      }
    `,this[Fl]=Ne[U.INFINITE].default,this[Vl]=Ne[U.NAVIGATION_INDEX].default,this[Bl]=Ne[U.SHOW_BUTTONS].default,this[Gl]=Ne[U.WIDTH].default,this[Hl]=Ne[U.HEIGHT].default,this[Xl]=Ne[U.GAP].default,this[kl]=Ne[U.PERSPECTIVE].default,this[Yl]=Ne[U.DISCRETE].default,this.initialized=!1,this.actualWidth=0,this.mouseOver=!1,this.hasContact=!1,this.startContactPoint={x:0,y:0},this.latestContactPoint={x:0,y:0},this.dragDistance=0}get totalSlides(){return this.slides.length}get slideDegrees(){return 360/this.totalSlides}get slideTransition(){return this.totalSlides>1?Math.round(this.actualWidth/2/Math.tan(Math.PI/this.totalSlides)):0}get showBackButton(){return this.showButtons&&this.totalSlides>1&&(this.infinite||this.slideIndex>0)}get showForwardButton(){return this.showButtons&&this.totalSlides>1&&(this.infinite||this.slideIndex<this.totalSlides-1)}get classes(){return{wrapper:!0,"has-contact":this.hasContact,discrete:this.discrete,initializing:!this.initialized}}get minDragDistance(){return 10}get slideIndex(){let e=this.navigationIndex%this.totalSlides;return e<0&&(e=this.totalSlides+e),e}get slides(){return[...this.children].filter(e=>e.nodeName!=="STYLE")}connectedCallback(){super.connectedCallback()}async firstUpdated(e){super.firstUpdated(e),await this.updateComplete,this.updateActualWidth(),this.setupSlides(),this.setupSlot(),this.setupEventListeners(),this.setupStyles(),setTimeout(()=>{this.initialized=!0},50)}setupSlot(){var s;const e=(s=this.shadowRoot)==null?void 0:s.querySelector("slot");e&&e.addEventListener("slotchange",()=>{this.setupSlides(),this.updateSlides()})}setupSlides(){this.slides.length>0&&this.slides.forEach((e,s)=>{e.classList.contains("slide")&&e.classList.remove("slide"),e.classList.add("slide"),e.setAttribute("data-index",s.toString()),e.addEventListener("touchstart",i=>{s===this.slideIndex&&(this.hasContact=!0,this.startContactPoint={x:i.touches[0].clientX,y:i.touches[0].clientY},this.latestContactPoint={x:i.touches[0].clientX,y:i.touches[0].clientY})})})}setupEventListeners(){document.addEventListener("touchmove",e=>{if(this.hasContact){this.latestContactPoint={x:e.touches[0].clientX,y:e.touches[0].clientY};const s=Math.abs(this.latestContactPoint.x-this.startContactPoint.x);this.dragDistance=s}}),document.addEventListener("touchend",e=>{this.dragDistance=0;const s=this.latestContactPoint.x-this.startContactPoint.x;this.hasContact&&(s>=this.minDragDistance&&this.back(),s<=-this.minDragDistance&&this.forward()),this.hasContact=!1}),this.carousel.addEventListener("contextmenu",e=>{this.hasContact&&e.preventDefault()}),this.carousel.addEventListener("mouseenter",()=>{this.mouseOver=!0}),this.carousel.addEventListener("mouseleave",()=>{this.mouseOver=!1}),document.addEventListener("scroll",e=>{if(this.mouseOver)return e.preventDefault(),e.stopPropagation(),!1})}setupStyles(){var s;const e=window.document.createElement("style");e.textContent=this.keyframes,(s=this.parentElement)==null||s.appendChild(e);try{window.CSS.registerProperty({name:"--slide-scale",syntax:"<number>",inherits:!1,initialValue:"1"})}catch{}}updated(e){super.updated(e),this.updateActualWidth(),e.has(U.NAVIGATION_INDEX)&&(this.updateSlides(),this.updateCarousel())}updateActualWidth(){const e=this.getBoundingClientRect().width;this.actualWidth=e}updateSlides(){this.slides.forEach((e,s)=>{const i=e;i.classList.contains("active-initialized")&&i.classList.remove("active-initialized"),i.classList.contains("active")&&i.classList.remove("active"),i.classList.contains("previous")&&i.classList.remove("previous"),i.classList.contains("next")&&i.classList.remove("next"),(s===this.slideIndex-1||this.slideIndex===0&&s===this.totalSlides-1)&&i.classList.add("previous"),s===this.slideIndex&&(i.classList.add("active"),this.initialized&&i.classList.add("active-initialized")),(s===this.slideIndex+1||this.slideIndex===this.totalSlides-1&&s===0)&&i.classList.add("next")})}back(){!this.infinite&&this.slideIndex===0||(this.setActiveIndex(this.navigationIndex-1),this.updateCarousel())}forward(){!this.infinite&&this.slideIndex===this.totalSlides-1||(this.setActiveIndex(this.navigationIndex+1),this.updateCarousel())}setActiveIndex(e){this.navigationIndex=e,this.dispatchEvent(new _y({navigationIndex:this.navigationIndex,slideIndex:this.slideIndex}))}updateCarousel(){const e=this.navigationIndex/this.totalSlides*-360;this.carousel.style.transform=`translateZ(-${this.slideTransition}px) rotateY(${e}deg)`}render(){return c`
      <style>
        .carousel {
          transform: translateZ(-${this.slideTransition}px);
        }
        ${[...Array(this.totalSlides)].map((e,s)=>A`
            ::slotted(.slide:nth-child(${s+1})) {
              transform: rotateY(${s*this.slideDegrees}deg)
                translateZ(${this.slideTransition}px)
                scale(var(--slide-scale, 1));
            }
          `)}
      </style>
      <div
        class=${Q(this.classes)}
        style=${`
          --drag-distance: ${this.dragDistance};
          --scene-width: ${this.width};
          --scene-height: ${this.height}px;
          --gap: ${this.gap}px;
          --perspective: ${this.perspective}px;
        `}
      >
        <div class="scene">
          <div class="carousel">
            <slot></slot>
          </div>
          ${this.showBackButton?c`
                <button
                  class="back"
                  @click=${e=>{this.back(),e.stopPropagation()}}
                >
                  <ss-icon
                    name="arrowCircleLeft"
                    color="#000"
                    size="48"
                  ></ss-icon>
                </button>
              `:S}
          ${this.showForwardButton?c`
                <button
                  class="forward"
                  @click=${e=>{this.forward(),e.stopPropagation()}}
                >
                  <ss-icon
                    name="arrowCircleRight"
                    color="#000"
                    size="48"
                  ></ss-icon>
                </button>
              `:S}
        </div>
      </div>
    `}},Fl=U.INFINITE,Vl=U.NAVIGATION_INDEX,Bl=U.SHOW_BUTTONS,Gl=U.WIDTH,Hl=U.HEIGHT,Xl=U.GAP,kl=U.PERSPECTIVE,Yl=U.DISCRETE,si.styles=[Pt,A`
      :host {
        display: block;
        width: 100%;
      }

      .scene {
        width: var(--scene-width);
        height: var(--scene-height);
        position: relative;
        perspective: var(--perspective);
      }

      .back,
      .forward {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        border-radius: 50%;
        transition: transform 0.2s;
        line-height: 0rem;
        padding: 0;
        background: transparent;
        border: none;
        width: auto;

        &:active {
          transform: translateY(-50%) scale(1.5);
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.75);
          opacity: 1;
        }
      }

      .back {
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
      }

      .forward {
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
      }

      .carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-style: preserve-3d;
        transition: transform 0.5s;
      }

      ::slotted(.slide) {
        position: absolute;
        width: calc(var(--scene-width) - var(--gap) * 2);
        height: calc(var(--scene-height) - var(--gap) * 2);
        left: var(--gap);
        top: var(--gap);
        transition: all 0.2s;
        opacity: 0.25;
      }

      ::slotted(.slide.active) {
        opacity: 1;
      }

      ::slotted(.slide.active-initialized) {
        opacity: 1;
        animation: become-active 200ms linear;
        animation-delay: 50ms;
      }

      ::slotted(.slide.previous),
      ::slotted(.slide.next) {
        opacity: 0.75;
      }

      ::slotted(.slide.previous)::after,
      ::slotted(.slide.next)::after {
        content: '';
        position: absolute;
        width: calc(var(--scene-width) - var(--gap) * 2);
        height: calc(var(--scene-height) - var(--gap) * 2);
        left: 0px;
        top: 0px;
      }

      ::slotted(.slide.previous)::after {
        background: linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent);
      }

      ::slotted(.slide.next)::after {
        background: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent);
      }

      .initializing {
        .carousel {
          transition: none;
        }
        ::slotted(.slide) {
          transition: none;
        }
        ::slotted(.slide.active) {
          animation: none;
        }
      }

      .has-contact {
        ::slotted(.slide) {
          --slide-scale: calc(
            1 - calc(min(calc(var(--drag-distance) / 50), 1) * 0.2)
          );
        }

        ::slotted(.slide.active) {
          --slide-scale: calc(
            1 - calc(min(calc(var(--drag-distance) / 50), 1) * 0.4)
          );
        }
      }

      .discrete:not(.has-contact) {
        ::slotted(.slide) {
          opacity: 0;
        }

        ::slotted(.slide.active) {
          opacity: 1;
        }
      }
    `],si);Y([u({type:Boolean})],G.prototype,Fl,void 0);Y([u({type:Number,reflect:!0})],G.prototype,Vl,void 0);Y([u({type:Boolean})],G.prototype,Bl,void 0);Y([u({reflect:!0})],G.prototype,Gl,void 0);Y([u({type:Number,reflect:!0})],G.prototype,Hl,void 0);Y([u({type:Number,reflect:!0})],G.prototype,Xl,void 0);Y([u({type:Number,reflect:!0})],G.prototype,kl,void 0);Y([u({type:Boolean})],G.prototype,Yl,void 0);Y([ft(".carousel")],G.prototype,"carousel",void 0);Y([d()],G.prototype,"initialized",void 0);Y([d()],G.prototype,"totalSlides",null);Y([d()],G.prototype,"slideDegrees",null);Y([d()],G.prototype,"slideTransition",null);Y([d()],G.prototype,"showBackButton",null);Y([d()],G.prototype,"showForwardButton",null);Y([d()],G.prototype,"actualWidth",void 0);Y([d()],G.prototype,"classes",null);Y([d()],G.prototype,"slideIndex",null);Y([d()],G.prototype,"mouseOver",void 0);Y([d()],G.prototype,"hasContact",void 0);Y([d()],G.prototype,"startContactPoint",void 0);Y([d()],G.prototype,"latestContactPoint",void 0);Y([d()],G.prototype,"dragDistance",void 0);G=Y([T("ss-carousel")],G);const yy="list-config-changed";class my extends CustomEvent{constructor(e){super(yy,{bubbles:!0,composed:!0,detail:e})}}var by=Object.defineProperty,Ey=Object.getOwnPropertyDescriptor,ts=(t,e,s,i)=>{for(var n=i>1?void 0:i?Ey(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&by(e,s,n),n};let _e=class extends Ht{constructor(){super(...arguments),this.defaultModeStyles=A`
    .config-slide {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .config {
        display: none;
      }
    }
  `,this.editModeStyles=A`
    .config-slide {
      .config {
        display: block;
      }
    }
  `,this.configModeStyles=A`
    .config-slide {
      .config {
        display: block;
      }
    }
  `,this.state=gt,this.id="",this.name="",this.ready=!1,this.navigationIndex=0}get classes(){return{"list-config":!0,"config-mode":this.state.selectListConfigMode,"edit-mode":this.state.editListConfigMode}}get carouselStyles(){const t=[this.defaultModeStyles];return this.state.editListConfigMode&&t.push(this.editModeStyles),this.state.selectListConfigMode&&t.push(this.configModeStyles),t}connectedCallback(){super.connectedCallback(),this.setup()}async setup(){this.state.listConfigs.length||await this.addConfig(),this.sync(),this.ready=!0}handleConfigChanged(t){this.state.setEditListConfigMode(!1),this.setListConfigId(t.detail.value),this.sync()}handleBoxClick(){this.state.setSelectListConfigMode(!0)}enableEditMode(){this.state.setEditListConfigMode(!0)}handleNameChanged(t){this.name=t.detail.value}async saveConfig(){X(p("The configuration has been saved"),B.SUCCESS),await w.saveListConfig({id:this.id,name:this.name,filter:this.state.listFilter,sort:this.state.listSort,setting:this.state.listSetting}),this.state.setListConfigs(await w.getListConfigs())}async deleteConfig(){await w.deleteListConfig(this.id),X(p("The configuration has been deleted"),B.INFO);const t=await w.getListConfigs();t.length&&this.setListConfigId(t[0].id),this.state.setListConfigs(t),this.sync()}async addConfig(){const t=await w.addListConfig();X(p("The configuration has been added"),B.SUCCESS);const e=await w.getListConfigs();this.state.setListConfigs(e),this.setListConfigId(t),this.sync()}sync(t=!1){this.id=this.state.listConfig.id,this.name=this.state.listConfig.name,this.navigationIndex=this.state.listConfigs.findIndex(e=>e.id===this.state.listConfig.id)}setListConfigId(t){w.saveActiveListConfigId(t),this.state.setListConfigId(t),this.dispatchEvent(new my({listConfigId:t}))}render(){return c`<div
      class=${Q(this.classes)}
      @click=${this.handleBoxClick}
    >
      <ss-carousel
        infinite
        discrete
        showButtons
        height="180"
        width="100%"
        navigationIndex=${this.navigationIndex}
        @carousel-slide-changed=${t=>{this.state.setEditListConfigMode(!1),this.state.setSelectListConfigMode(!1),this.navigationIndex=t.detail.navigationIndex,this.setListConfigId(this.state.listConfigs[t.detail.slideIndex].id)}}
      >
        ${this.ready?z(this.state.listConfigs,t=>t.id,t=>c`<div class="config-slide">
                  <div
                    class="close"
                    @click=${e=>{this.state.setSelectListConfigMode(!1),this.state.setEditListConfigMode(!1),e.stopPropagation()}}
                  ></div>

                  <div class="config-name">${t.name}</div>

                  <div class="config">
                    <div class="edit">
                      <div class="name">
                        <ss-input
                          id="date"
                          @input-changed=${this.handleNameChanged}
                          type=${Fs.TEXT}
                          value=${t.name}
                        ></ss-input>
                      </div>

                      <div class="buttons">
                        <ss-button
                          text=${p("Save configuration")}
                          @click=${this.saveConfig}
                        ></ss-button>

                        <ss-button
                          text=${p("Delete configuration")}
                          @click=${this.deleteConfig}
                        ></ss-button>
                      </div>
                    </div>

                    <div class="edit-button">
                      <ss-button
                        @click=${this.enableEditMode}
                        text=${p("Edit configuration")}
                      ></ss-button>

                      <ss-button
                        text=${p("Add configuration")}
                        @click=${this.addConfig}
                      ></ss-button>
                    </div>
                  </div>
                </div>`):S}

        <style>
          ${this.carouselStyles}
        </style>
      </ss-carousel>
    </div>`}};_e.styles=[H,A`
      :host {
        display: block;
        width: 100%;
        touch-action: none;
      }

      .list-config {
        padding: 1rem;
        margin-bottom: 1rem;
        position: relative;

        .close {
          pointer-events: none;
          opacity: 0;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 100;

          &::before {
            content: 'X';
          }
        }

        .config {
          transition: all 0.3s;
          opacity: 0;
        }

        .config-name {
          transition: all 0.3s;
          opacity: 1;
          font-size: 2rem;
          text-align: center;
          height: 3rem;
          line-height: 3rem;
        }

        .edit {
          display: none;
        }

        .edit-button {
          display: block;
        }

        &.config-mode {
          .close {
            opacity: 1;
            pointer-events: initial;
            cursor: pointer;
          }

          .config {
            opacity: 1;
          }

          .config-name {
            font-size: 1rem;
          }
        }

        &.edit-mode {
          .edit {
            display: block;
          }

          .edit-button {
            display: none;
          }
        }
      }
    `];ts([d()],_e.prototype,"id",2);ts([d()],_e.prototype,"name",2);ts([d()],_e.prototype,"ready",2);ts([d()],_e.prototype,"navigationIndex",2);ts([ft("#config-selector")],_e.prototype,"configSelector",2);ts([d()],_e.prototype,"classes",1);ts([d()],_e.prototype,"carouselStyles",1);_e=ts([T("list-config")],_e);var Ty=Object.defineProperty,Sy=Object.getOwnPropertyDescriptor,Er=(t,e,s,i)=>{for(var n=i>1?void 0:i?Sy(e,s):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&Ty(e,s,n),n};let _i=class extends Ht{constructor(){super(...arguments),this.state=gt,this.view=Ru,this.ready=!1}connectedCallback(){super.connectedCallback(),this.setAuthToken(w.getAuthToken()),this.addEventListener("view-changed",t=>{this.handleViewChanged(t)}),window.addEventListener("unload",()=>{w.setWindowScrollPosition(window.scrollX,window.scrollY)}),window.addEventListener("view-ready",()=>{const{x:t,y:e}=w.getWindowScrollPosition();setTimeout(()=>{window.scrollTo(t,e)},1)}),this.restoreState()}setAuthToken(t){P.setAuthToken(t),this.state.setAuthToken(t)}async restoreState(){this.ready=!1;try{if(this.state.authToken){const e=await w.getListConfigs();this.state.setListConfigs(e);const s=await w.getEntityConfigs();this.state.setEntityConfigs(s);const i=w.getActiveListConfigId();this.state.setListConfigId(i)}!this.state.listConfigId&&this.state.listConfigs.length&&this.state.setListConfigId(this.state.listConfigs[0].id),this.state.setListContextMode(w.getListContextMode()),this.state.setListContext(w.getListContext()),this.state.setAdvancedMode(w.getAdvancedMode()),this.state.setDebugMode(w.getDebugMode()),this.state.setCollapsableState(w.getCollapsablePanelState()),this.state.setVersion(w.getVersion());const t=w.getSavedView();t&&(this.view=t)}catch(t){console.error("something went wrong during restore state",t)}finally{this.ready=!0}}handleViewChanged(t){const e=t;this.view=e.detail,w.saveView(this.view)}handleOperationPerformed(t){this.viewComponent.sync(!1)}handleListConfigChanged(t){this.viewComponent.sync(!0)}handleUserLoggedIn(){this.restoreState()}handleCollapsableToggled(t){const{isOpen:e,panelId:s}=t.detail;this.state.setCollapsablePanelState(s,e),w.setCollapsablePanelState(this.state.collapsablePanelState)}activeView(){return this.state.listConfig?this.view===Be.ADMIN?c`<admin-dashboard></admin-dashboard>`:this.state.version===ri.V2?this.view===Be.INPUT?c`<entity-form
          .tags=${this.state.listConfig.filter.tagging[ot.CONTAINS_ALL_OF]}
        ></entity-form>`:c`<entity-list></entity-list>`:this.view===Be.INPUT?c`<action-form
        .tags=${this.state.listConfig.filter.tagging[ot.CONTAINS_ALL_OF]}
      ></action-form>`:c`<action-list></action-list>`:S}renderContent(){return this.ready&&(this.state.forbidden||!this.state.authToken)?c`
        <forbidden-notice
          @user-logged-in=${this.handleUserLoggedIn}
        ></forbidden-notice>
      `:this.ready?c`
          <list-config
            @list-config-changed=${this.handleListConfigChanged}
          ></list-config>

          <page-nav active=${this.view}></page-nav>

          <bulk-manager
            @operation-performed=${this.handleOperationPerformed}
          ></bulk-manager>

          <main>${this.activeView()}</main>

          <floating-widget></floating-widget>
        `:c`<ss-loader></ss-loader>`}render(){return c`
      <div
        class="app-container"
        @collapsable-toggled=${this.handleCollapsableToggled}
      >
        ${this.renderContent()}
      </div>
    `}};_i.styles=[H];Er([d()],_i.prototype,"view",2);Er([d()],_i.prototype,"ready",2);Er([ft("main > *")],_i.prototype,"viewComponent",2);_i=Er([T("app-container")],_i);
