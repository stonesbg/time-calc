import"https://unpkg.com/open-props";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();function K(){}function se(e,t){for(const i in t)e[i]=t[i];return e}function ne(e){return e()}function X(){return Object.create(null)}function x(e){e.forEach(ne)}function ie(e){return typeof e=="function"}function R(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function ae(e){return Object.keys(e).length===0}function de(e,t,i,l){if(e){const n=le(e,t,i,l);return e[0](n)}}function le(e,t,i,l){return e[1]&&l?se(i.ctx.slice(),e[1](l(t))):i.ctx}function _e(e,t,i,l){if(e[2]&&l){const n=e[2](l(i));if(t.dirty===void 0)return n;if(typeof n=="object"){const r=[],o=Math.max(t.dirty.length,n.length);for(let f=0;f<o;f+=1)r[f]=t.dirty[f]|n[f];return r}return t.dirty|n}return t.dirty}function me(e,t,i,l,n,r){if(n){const o=le(t,i,l,r);e.p(o,n)}}function pe(e){if(e.ctx.length>32){const t=[],i=e.ctx.length/32;for(let l=0;l<i;l++)t[l]=-1;return t}return-1}let q=!1;function he(){q=!0}function ye(){q=!1}function ge(e,t,i,l){for(;e<t;){const n=e+(t-e>>1);i(n)<=l?e=n+1:t=n}return e}function be(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const c=[];for(let u=0;u<t.length;u++){const a=t[u];a.claim_order!==void 0&&c.push(a)}t=c}const i=new Int32Array(t.length+1),l=new Int32Array(t.length);i[0]=-1;let n=0;for(let c=0;c<t.length;c++){const u=t[c].claim_order,a=(n>0&&t[i[n]].claim_order<=u?n+1:ge(1,n,y=>t[i[y]].claim_order,u))-1;l[c]=i[a]+1;const d=a+1;i[d]=c,n=Math.max(d,n)}const r=[],o=[];let f=t.length-1;for(let c=i[n]+1;c!=0;c=l[c-1]){for(r.push(t[c-1]);f>=c;f--)o.push(t[f]);f--}for(;f>=0;f--)o.push(t[f]);r.reverse(),o.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<o.length;c++){for(;u<r.length&&o[c].claim_order>=r[u].claim_order;)u++;const a=u<r.length?r[u]:null;e.insertBefore(o[c],a)}}function S(e,t){if(q){for(be(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentElement!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function h(e,t,i){q&&!i?S(e,t):(t.parentNode!==e||t.nextSibling!=i)&&e.insertBefore(t,i||null)}function p(e){e.parentNode.removeChild(e)}function g(e){return document.createElement(e)}function T(e){return document.createTextNode(e)}function w(){return T(" ")}function A(e,t,i,l){return e.addEventListener(t,i,l),()=>e.removeEventListener(t,i,l)}function D(e,t,i){i==null?e.removeAttribute(t):e.getAttribute(t)!==i&&e.setAttribute(t,i)}function E(e){return Array.from(e.childNodes)}function $e(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function re(e,t,i,l,n=!1){$e(e);const r=(()=>{for(let o=e.claim_info.last_index;o<e.length;o++){const f=e[o];if(t(f)){const c=i(f);return c===void 0?e.splice(o,1):e[o]=c,n||(e.claim_info.last_index=o),f}}for(let o=e.claim_info.last_index-1;o>=0;o--){const f=e[o];if(t(f)){const c=i(f);return c===void 0?e.splice(o,1):e[o]=c,n?c===void 0&&e.claim_info.last_index--:e.claim_info.last_index=o,f}}return l()})();return r.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,r}function ve(e,t,i,l){return re(e,n=>n.nodeName===t,n=>{const r=[];for(let o=0;o<n.attributes.length;o++){const f=n.attributes[o];i[f.name]||r.push(f.name)}r.forEach(o=>n.removeAttribute(o))},()=>l(t))}function b(e,t,i){return ve(e,t,i,g)}function j(e,t){return re(e,i=>i.nodeType===3,i=>{const l=""+t;if(i.data.startsWith(l)){if(i.data.length!==l.length)return i.splitText(l.length)}else i.data=l},()=>T(t),!0)}function C(e){return j(e," ")}function oe(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function B(e,t){e.value=t==null?"":t}function Te(e,t,{bubbles:i=!1,cancelable:l=!1}={}){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,i,l,t),n}let L;function k(e){L=e}function Ee(){if(!L)throw new Error("Function called outside component initialization");return L}function xe(){const e=Ee();return(t,i,{cancelable:l=!1}={})=>{const n=e.$$.callbacks[t];if(n){const r=Te(t,i,{cancelable:l});return n.slice().forEach(o=>{o.call(e,r)}),!r.defaultPrevented}return!0}}const O=[],Y=[],M=[],Z=[],Ne=Promise.resolve();let z=!1;function we(){z||(z=!0,Ne.then(ue))}function H(e){M.push(e)}const F=new Set;let I=0;function ue(){const e=L;do{for(;I<O.length;){const t=O[I];I++,k(t),Ae(t.$$)}for(k(null),O.length=0,I=0;Y.length;)Y.pop()();for(let t=0;t<M.length;t+=1){const i=M[t];F.has(i)||(F.add(i),i())}M.length=0}while(O.length);for(;Z.length;)Z.pop()();z=!1,F.clear(),k(e)}function Ae(e){if(e.fragment!==null){e.update(),x(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}const U=new Set;let $;function Ce(){$={r:0,c:[],p:$}}function Oe(){$.r||x($.c),$=$.p}function v(e,t){e&&e.i&&(U.delete(e),e.i(t))}function P(e,t,i,l){if(e&&e.o){if(U.has(e))return;U.add(e),$.c.push(()=>{U.delete(e),l&&(i&&e.d(1),l())}),e.o(t)}else l&&l()}function ce(e){e&&e.c()}function fe(e,t){e&&e.l(t)}function W(e,t,i,l){const{fragment:n,on_mount:r,on_destroy:o,after_update:f}=e.$$;n&&n.m(t,i),l||H(()=>{const c=r.map(ne).filter(ie);o?o.push(...c):x(c),e.$$.on_mount=[]}),f.forEach(H)}function G(e,t){const i=e.$$;i.fragment!==null&&(x(i.on_destroy),i.fragment&&i.fragment.d(t),i.on_destroy=i.fragment=null,i.ctx=[])}function ke(e,t){e.$$.dirty[0]===-1&&(O.push(e),we(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function J(e,t,i,l,n,r,o,f=[-1]){const c=L;k(e);const u=e.$$={fragment:null,ctx:null,props:r,update:K,not_equal:n,bound:X(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:X(),dirty:f,skip_bound:!1,root:t.target||c.$$.root};o&&o(u.root);let a=!1;if(u.ctx=i?i(e,t.props||{},(d,y,...N)=>{const _=N.length?N[0]:y;return u.ctx&&n(u.ctx[d],u.ctx[d]=_)&&(!u.skip_bound&&u.bound[d]&&u.bound[d](_),a&&ke(e,d)),y}):[],u.update(),a=!0,x(u.before_update),u.fragment=l?l(u.ctx):!1,t.target){if(t.hydrate){he();const d=E(t.target);u.fragment&&u.fragment.l(d),d.forEach(p)}else u.fragment&&u.fragment.c();t.intro&&v(e.$$.fragment),W(e,t.target,t.anchor,t.customElement),ye(),ue()}k(c)}class Q{$destroy(){G(this,1),this.$destroy=K}$on(t,i){const l=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return l.push(i),()=>{const n=l.indexOf(i);n!==-1&&l.splice(n,1)}}$set(t){this.$$set&&!ae(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Se=e=>({}),ee=e=>({copy:e[0]});function je(e){let t;const i=e[3].default,l=de(i,e,e[2],ee);return{c(){l&&l.c()},l(n){l&&l.l(n)},m(n,r){l&&l.m(n,r),t=!0},p(n,[r]){l&&l.p&&(!t||r&4)&&me(l,i,n,n[2],t?_e(i,n[2],r,Se):pe(n[2]),ee)},i(n){t||(v(l,n),t=!0)},o(n){P(l,n),t=!1},d(n){l&&l.d(n)}}}function Le(e,t,i){let{$$slots:l={},$$scope:n}=t,{clipText:r=""}=t;const o=xe(),f=()=>{navigator.clipboard.writeText(r).then(()=>o("copy",r),c=>o("fail"))};return e.$$set=c=>{"clipText"in c&&i(1,r=c.clipText),"$$scope"in c&&i(2,n=c.$$scope)},[f,r,n,l]}class Pe extends Q{constructor(t){super(),J(this,t,Le,je,R,{clipText:1})}}function te(e){let t,i;return t=new Pe({props:{clipText:e[3],$$slots:{default:[Be,({copy:l})=>({8:l}),({copy:l})=>l?256:0]},$$scope:{ctx:e}}}),{c(){ce(t.$$.fragment)},l(l){fe(t.$$.fragment,l)},m(l,n){W(t,l,n),i=!0},p(l,n){const r={};n&8&&(r.clipText=l[3]),n&776&&(r.$$scope={dirty:n,ctx:l}),t.$set(r)},i(l){i||(v(t.$$.fragment,l),i=!0)},o(l){P(t.$$.fragment,l),i=!1},d(l){G(t,l)}}}function Be(e){let t,i,l,n,r,o,f,c;return{c(){t=g("span"),i=T(e[3]),l=w(),n=g("button"),r=T("\u{1F4CB}"),this.h()},l(u){t=b(u,"SPAN",{class:!0});var a=E(t);i=j(a,e[3]),a.forEach(p),l=C(u),n=b(u,"BUTTON",{id:!0});var d=E(n);r=j(d,"\u{1F4CB}"),d.forEach(p),this.h()},h(){D(t,"class","h1"),n.disabled=o=e[3].length===0,D(n,"id","button-copy")},m(u,a){h(u,t,a),S(t,i),h(u,l,a),h(u,n,a),S(n,r),f||(c=A(n,"click",function(){ie(e[8])&&e[8].apply(this,arguments)}),f=!0)},p(u,a){e=u,a&8&&oe(i,e[3]),a&8&&o!==(o=e[3].length===0)&&(n.disabled=o)},d(u){u&&p(t),u&&p(l),u&&p(n),f=!1,c()}}}function Ie(e){let t,i,l,n,r,o,f,c,u,a,d,y,N,_=e[3]!=""&&te(e);return{c(){t=g("input"),i=w(),l=g("button"),n=T(e[2]),r=w(),o=g("input"),f=w(),_&&_.c(),c=w(),u=g("button"),a=T("Calc")},l(s){t=b(s,"INPUT",{}),i=C(s),l=b(s,"BUTTON",{});var m=E(l);n=j(m,e[2]),m.forEach(p),r=C(s),o=b(s,"INPUT",{}),f=C(s),_&&_.l(s),c=C(s),u=b(s,"BUTTON",{});var V=E(u);a=j(V,"Calc"),V.forEach(p)},m(s,m){h(s,t,m),B(t,e[0]),h(s,i,m),h(s,l,m),S(l,n),h(s,r,m),h(s,o,m),B(o,e[1]),h(s,f,m),_&&_.m(s,m),h(s,c,m),h(s,u,m),S(u,a),d=!0,y||(N=[A(t,"input",e[6]),A(l,"click",e[5]),A(o,"input",e[7]),A(u,"click",e[4])],y=!0)},p(s,[m]){m&1&&t.value!==s[0]&&B(t,s[0]),(!d||m&4)&&oe(n,s[2]),m&2&&o.value!==s[1]&&B(o,s[1]),s[3]!=""?_?(_.p(s,m),m&8&&v(_,1)):(_=te(s),_.c(),v(_,1),_.m(c.parentNode,c)):_&&(Ce(),P(_,1,1,()=>{_=null}),Oe())},i(s){d||(v(_),d=!0)},o(s){P(_),d=!1},d(s){s&&p(t),s&&p(i),s&&p(l),s&&p(r),s&&p(o),s&&p(f),_&&_.d(s),s&&p(c),s&&p(u),y=!1,x(N)}}}function Me(e,t,i){let l="",n="",r="plus",o="";function f(){fetch(`http://localhost:5050/calc?FromTime=${l}&ToTime=${n}&Operation=${r}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}}).then(function(d){return d.text()}).then(function(d){i(3,o=d)}).catch(function(d){console.log("Request failed",d)})}function c(){r=="plus"?i(2,r="minus"):i(2,r="plus")}function u(){l=this.value,i(0,l)}function a(){n=this.value,i(1,n)}return[l,n,r,o,f,c,u,a]}class Ue extends Q{constructor(t){super(),J(this,t,Me,Ie,R,{})}}function qe(e){let t,i,l;return i=new Ue({}),{c(){t=g("main"),ce(i.$$.fragment),this.h()},l(n){t=b(n,"MAIN",{class:!0});var r=E(t);fe(i.$$.fragment,r),r.forEach(p),this.h()},h(){D(t,"class","svelte-16fg2y8")},m(n,r){h(n,t,r),W(i,t,null),l=!0},p:K,i(n){l||(v(i.$$.fragment,n),l=!0)},o(n){P(i.$$.fragment,n),l=!1},d(n){n&&p(t),G(i)}}}class Fe extends Q{constructor(t){super(),J(this,t,null,qe,R,{})}}new Fe({target:document.getElementById("app")});
