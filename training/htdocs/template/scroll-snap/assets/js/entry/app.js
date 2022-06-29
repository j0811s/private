!function(){"use strict";function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}var n=function(t){return t&&"object"===e(t)&&!Array.isArray(t)},i=function e(i){for(var s=arguments.length,o=new Array(s>1?s-1:0),r=1;r<s;r++)o[r-1]=arguments[r];if(!o.length)return i;var a=o.shift();if(n(i)&&n(a))for(var h in a)n(a[h])?(i[h]||Object.assign(i,t({},h,{})),e(i[h],a[h])):Object.assign(i,t({},h,a[h]));return e.apply(void 0,[i].concat(o))},s=function(){var t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(t,"px"))};function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e){h(t,e),e.add(t)}function a(t,e,n){h(t,e),e.set(t,n)}function h(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function c(t,e){return function(t,e){if(e.get)return e.get.call(t);return e.value}(t,d(t,e,"get"))}function l(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}function u(t,e,n){return function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,d(t,e,"set"),n),n}function d(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}var g=new WeakMap,v=new WeakMap,f=new WeakMap,y=new WeakMap,p=new WeakSet,m=new WeakSet,w=new WeakSet,E=new WeakSet,S=new WeakSet,b=new WeakSet,k=new WeakSet,C=new WeakSet,T=new WeakSet,x=new WeakSet,P=new WeakSet,M=new WeakSet,W=new WeakSet,I=new WeakSet,L=new WeakSet,D=new WeakSet,A=new WeakSet,H=new WeakSet,R=new WeakSet,j=new WeakSet;function B(t){var e=null!=t?t:this.currentIndex,n=l(this,m,N).call(this,e);return{prevHeight:null==n.previousElementSibling?null:n.previousElementSibling.getBoundingClientRect().height,currentHeight:n.getBoundingClientRect().height,nextHeight:null==n.nextElementSibling?null:n.nextElementSibling.getBoundingClientRect().height,prevRect:n.getBoundingClientRect(),currentRect:n.getBoundingClientRect(),nextRect:n.getBoundingClientRect()}}function N(t){var e=void 0===t?this.currentIndex:t;return this.sectionAll[e]}function z(t){this.getState.isScrolling||(this.touchStart=t.pageY)}function O(t){void 0!==this.touchStart&&(this.touchMove=t.pageY)}function V(t){this.touchMove!==this.touchStart&&void 0!==this.touchMove?(this.touchEnd=this.touchStart-this.touchMove,l(this,T,G).call(this,t),l(this,b,Y).call(this)):l(this,b,Y).call(this)}function Y(){this.touchStart=void 0,this.touchMove=void 0,this.touchEnd=void 0}function q(){0!==this.currentIndex&&null!==this.sectionData.prevHeight&&(u(this,y,Math.abs(c(this,y)-this.sectionData.prevHeight)),this.getContainer.style.setProperty("transform","translate3d(0, -".concat(c(this,y),"px, 0)")),this.currentIndex--)}function F(){this.currentIndex!==this.sectionAll.length-1&&null!==this.sectionData.nextHeight&&(u(this,y,Math.abs(c(this,y)+this.sectionData.currentHeight)),this.getContainer.style.setProperty("transform","translate3d(0, -".concat(c(this,y),"px, 0)")),this.currentIndex++)}function G(t){var e=this;if(!this.getState.isScrolling){if(u(this,f,!0),"keydown"===t.type)38===t.keyCode&&l(this,k,q).call(this),40===t.keyCode&&l(this,C,F).call(this);else(this.getTouchDevice||"mouseup"===t.type?this.touchEnd:t.deltaY)<0?l(this,k,q).call(this):l(this,C,F).call(this);l(this,I,X).call(this),this.sectionData=l(this,p,B).call(this),clearTimeout(this.timerId),this.timerId=setTimeout((function(){u(e,f,!1)}),this.config.animation.interval)}}function J(){document.body.dataset.currentIndex=this.currentIndex}function K(){var t=this;this.sectionAll.forEach((function(e,n){n===t.currentIndex?e.classList.add("add-current"):n!==t.currentIndex&&e.classList.contains("add-current")&&e.classList.remove("add-current")}))}function Q(){var t=this;null!=this.getNavAnchors&&this.getNavAnchors.forEach((function(e,n){n===t.currentIndex?e.classList.add("add-current"):n!==t.currentIndex&&e.classList.contains("add-current")&&e.classList.remove("add-current")}))}function U(){null!=this.config.navigation.anchors&&(location.hash=this.config.navigation.anchors[this.currentIndex])}function X(){l(this,x,J).call(this),l(this,P,K).call(this),l(this,M,Q).call(this),l(this,W,U).call(this)}function Z(){var t=this;this.sectionAll.forEach((function(e,n){null!==t.config.navigation.anchors&&(e.dataset.ssAnchors=t.config.navigation.anchors[n])}))}function $(){var t=this;null!=this.getNavAnchors&&this.getNavAnchors.forEach((function(e,n){e.addEventListener("click",(function(e){if(e.preventDefault(),n!==t.currentIndex){t.sectionData=l(t,p,B).call(t,n);var i=Math.abs(n>0?c(t,y)+t.sectionData.prevRect.top:0),s=Math.abs(c(t,y)+t.sectionData.currentRect.top);u(t,y,n>t.currentIndex?s:i),t.currentIndex=n,l(t,I,X).call(t),t.getContainer.style.setProperty("transform","translate3d(0, -".concat(c(t,y),"px, 0)"))}}))}))}function _(){document.documentElement.style.setProperty("overflow","hidden"),document.documentElement.style.setProperty("height","100%"),document.body.style.setProperty("overflow","hidden"),document.body.style.setProperty("height","100%"),document.body.style.setProperty("min-height","calc(var(--vh, 1vh) * 100)"),this.getContainer.style.setProperty("position","relative"),this.getContainer.style.setProperty("transform","translate3d(0, 0, 0)"),this.getContainer.style.setProperty("transition-property","transform"),this.getContainer.style.setProperty("transition-duration","".concat(this.config.animation.duration,"ms")),this.getContainer.style.setProperty("transition-timing-function",this.config.animation.ease)}function tt(){this.getContainer.style.setProperty("height","".concat(this.wh,"px")),this.sectionAll.forEach((function(t,e){t.style.setProperty("position","absolute"),t.style.setProperty("top","0"),t.style.setProperty("left","0"),t.style.setProperty("z-index",-e),t.style.setProperty("width","100%"),t.style.setProperty("height","100%")}))}function et(){var t=this;this.sectionAll.forEach((function(e,n){e.classList.contains(t.config.ignoreClassName)||e.style.setProperty("height","".concat(t.wh,"px"))})),this.sectionData=l(this,p,B).call(this)}function nt(){this.wh=window.innerHeight,l(this,R,et).call(this),u(this,y,Math.abs(this.getContainer.getBoundingClientRect().height-(this.getContainer.getBoundingClientRect().height-this.sectionAll[this.currentIndex].offsetTop))),this.getContainer.style.setProperty("transform","translate3d(0, -".concat(c(this,y),"px, 0)"))}var it=new(function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r(this,j),r(this,R),r(this,H),r(this,A),r(this,D),r(this,L),r(this,I),r(this,W),r(this,M),r(this,P),r(this,x),r(this,T),r(this,C),r(this,k),r(this,b),r(this,S),r(this,E),r(this,w),r(this,m),r(this,p),a(this,g,{writable:!0,value:void 0}),a(this,v,{writable:!0,value:void 0}),a(this,f,{writable:!0,value:void 0}),a(this,y,{writable:!0,value:void 0}),this.config={init:!0,ignoreClassName:"js-ssIgnore",animation:{duration:500,interval:1e3,ease:"ease-in-out",type:"normal"},navigation:{container:"js-ssNavigation",anchors:null}},i(this.config,n),u(this,g,document.getElementById(e)),u(this,v,document.querySelectorAll("#".concat(this.config.navigation.container," a"))),this.timerId,u(this,f,!1),this.touchStart,this.touchMove,this.touchEnd,this.currentIndex=0,this.wh=window.innerHeight,this.sectionAll=this.getContainer.childNodes,u(this,y,0),this.sectionData={},this.getVerticalMovement=l(this,T,G).bind(this),this.setTouchStart=l(this,w,z).bind(this),this.setTouchMove=l(this,E,O).bind(this),this.setTouchEnd=l(this,S,V).bind(this),this.updateSectionHeight=l(this,j,nt).bind(this),this.init()}var e,n,h;return e=t,(n=[{key:"init",value:function(){l(this,A,_).call(this),l(this,L,Z).call(this),l(this,R,et).call(this),l(this,I,X).call(this),l(this,D,$).call(this),s(),this.config.init&&this.addEvent(),"card"===this.config.animation.type&&l(this,H,tt).call(this)}},{key:"getContainer",get:function(){return c(this,g)}},{key:"getNavAnchors",get:function(){return c(this,v)}},{key:"getState",get:function(){return{isScrolling:c(this,f)}}},{key:"getTouchDevice",get:function(){return!("undefined"==typeof window||!("ontouchstart"in window||window.DocumentTouch&&"undefined"!=typeof document&&document instanceof window.DocumentTouch))||!("undefined"==typeof navigator||!navigator.maxTouchPoints&&!navigator.msMaxTouchPoints)}},{key:"getEventType",get:function(){return{start:this.getTouchDevice?"touchstart":"mousedown",move:this.getTouchDevice?"touchmove":"mousemove",end:this.getTouchDevice?"touchend":"mouseup"}}},{key:"addEvent",value:function(){document.addEventListener("keydown",this.getVerticalMovement),this.getContainer.addEventListener("wheel",this.getVerticalMovement),this.getContainer.addEventListener(this.getEventType.start,this.setTouchStart),this.getContainer.addEventListener(this.getEventType.move,this.setTouchMove),this.getContainer.addEventListener(this.getEventType.end,this.setTouchEnd),window.addEventListener("resize",this.updateSectionHeight),window.addEventListener("resize",s)}},{key:"removeEvent",value:function(){document.removeEventListener("keydown",this.getVerticalMovement),this.getContainer.removeEventListener("wheel",this.getVerticalMovement),this.getContainer.removeEventListener(this.getEventType.start,this.setTouchStart),this.getContainer.removeEventListener(this.getEventType.move,this.setTouchMove),this.getContainer.removeEventListener(this.getEventType.end,this.setTouchEnd),window.removeEventListener("resize",this.updateSectionHeight),window.removeEventListener("resize",s)}}])&&o(e.prototype,n),h&&o(e,h),Object.defineProperty(e,"prototype",{writable:!1}),t}())("js-scrollSnap",{init:!0,animation:{},navigation:{anchors:["kv","about","info","contact","mail"]}});console.log(it.getTouchDevice)}();