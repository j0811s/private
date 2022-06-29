!function(){"use strict";function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}var n=function(t){return t&&"object"===e(t)&&!Array.isArray(t)},i=function e(i){for(var s=arguments.length,o=new Array(s>1?s-1:0),r=1;r<s;r++)o[r-1]=arguments[r];if(!o.length)return i;var a=o.shift();if(n(i)&&n(a))for(var h in a)n(a[h])?(i[h]||Object.assign(i,t({},h,{})),e(i[h],a[h])):Object.assign(i,t({},h,a[h]));return e.apply(void 0,[i].concat(o))},s=function(){var t=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(t,"px"))};function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function r(t,e){h(t,e),e.add(t)}function a(t,e,n){h(t,e),e.set(t,n)}function h(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function c(t,e){return function(t,e){if(e.get)return e.get.call(t);return e.value}(t,d(t,e,"get"))}function u(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}function l(t,e,n){return function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,d(t,e,"set"),n),n}function d(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}var f=new WeakMap,v=new WeakMap,g=new WeakMap,y=new WeakSet,p=new WeakSet,m=new WeakSet,w=new WeakSet,k=new WeakSet,E=new WeakSet,b=new WeakSet,S=new WeakSet,P=new WeakSet,T=new WeakSet,C=new WeakSet,x=new WeakSet,I=new WeakSet,L=new WeakSet,W=new WeakSet,A=new WeakSet,M=new WeakSet;function j(t){var e=this;if(!this.getState.isScrolling){if(l(this,g,!0),"keydown"===t.type)38===t.keyCode&&u(this,k,V).call(this),40===t.keyCode&&u(this,E,z).call(this);else(this.getTouchPoints||"mouseup"===t.type?this.touchEnd:t.deltaY)<0?u(this,k,V).call(this):u(this,E,z).call(this);u(this,C,F).call(this),clearTimeout(this.timerId),this.timerId=setTimeout((function(){l(e,g,!1)}),this.config.animation.interval)}}function N(t){this.touchStart=t.pageY}function H(t){this.touchMove=t.pageY}function O(t){this.touchEnd=this.touchStart-this.touchMove,null!=this.touchMove&&(this.touchMove=null,u(this,y,j).call(this,t))}function V(){if(0!==this.currentIndex){this.currentIndex--;var t="-".concat(this.wh*this.currentIndex,"px");this.getContainer.style.setProperty("transform","translate3d(0, ".concat(t,", 0)"))}}function z(){if(this.currentIndex!==this.sectionAll.length-1){this.currentIndex++;var t="-".concat(this.wh*this.currentIndex,"px");this.getContainer.style.setProperty("transform","translate3d(0, ".concat(t,", 0)"))}}function Y(){document.body.dataset.currentIndex=this.currentIndex}function q(){var t=this;this.sectionAll.forEach((function(e,n){n===t.currentIndex?e.classList.add("add-current"):n!==t.currentIndex&&e.classList.contains("add-current")&&e.classList.remove("add-current")}))}function B(){var t=this;null!=this.getNavAnker&&this.getNavAnker.forEach((function(e,n){n===t.currentIndex?e.classList.add("add-current"):n!==t.currentIndex&&e.classList.contains("add-current")&&e.classList.remove("add-current")}))}function D(){null!=this.config.navigation.anker&&(location.hash=this.config.navigation.anker[this.currentIndex])}function F(){u(this,b,Y).call(this),u(this,S,q).call(this),u(this,P,B).call(this),u(this,T,D).call(this)}function G(){document.documentElement.style.setProperty("overflow","hidden"),document.documentElement.style.setProperty("height","100%"),document.body.style.setProperty("overflow","hidden"),document.body.style.setProperty("height","100%"),document.body.style.setProperty("min-height","calc(var(--vh, 1vh) * 100)"),this.getContainer.style.setProperty("position","relative"),this.getContainer.style.setProperty("transform","translate3d(0, 0, 0)"),this.getContainer.style.setProperty("transition-property","transform"),this.getContainer.style.setProperty("transition-duration","".concat(this.config.animation.duration,"ms")),this.getContainer.style.setProperty("transition-timing-function",this.config.animation.ease)}function J(){this.getContainer.style.setProperty("height","".concat(this.wh,"px")),this.sectionAll.forEach((function(t,e){t.style.setProperty("position","absolute"),t.style.setProperty("top","0"),t.style.setProperty("left","0"),t.style.setProperty("z-index",-e),t.style.setProperty("width","100%"),t.style.setProperty("height","100%")}))}function K(){var t=this;this.sectionAll.forEach((function(e,n){e.dataset.ssAnker=null===t.config.navigation.anker?n:t.config.navigation.anker[n]}))}function Q(){var t=this;null!=this.getNavAnker&&this.getNavAnker.forEach((function(e,n){e.addEventListener("click",(function(e){e.preventDefault();var i="-".concat(t.wh*n,"px");t.getContainer.style.setProperty("transform","translate3d(0, ".concat(i,", 0)")),t.currentIndex=n,u(t,C,F).call(t)}))}))}function R(){var t=this;this.sectionAll.forEach((function(e,n){e.classList.contains(t.config.ignoreClassName)||e.style.setProperty("height","".concat(t.wh,"px"))}))}function U(){this.wh=window.innerHeight,u(this,A,R).call(this);var t="-".concat(this.wh*this.currentIndex,"px");this.getContainer.style.setProperty("transform","translate3d(0, ".concat(t,", 0)"))}var X=new(function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),r(this,M),r(this,A),r(this,W),r(this,L),r(this,I),r(this,x),r(this,C),r(this,T),r(this,P),r(this,S),r(this,b),r(this,E),r(this,k),r(this,w),r(this,m),r(this,p),r(this,y),a(this,f,{writable:!0,value:void 0}),a(this,v,{writable:!0,value:void 0}),a(this,g,{writable:!0,value:void 0}),this.config={init:!0,ignoreClassName:"js-ssIgnore",animation:{duration:500,interval:1e3,ease:"ease-in-out",type:"normal"},navigation:{container:"js-ssNavigation",anker:null}},i(this.config,n),l(this,f,document.getElementById(e)),l(this,v,document.querySelectorAll("#".concat(this.config.navigation.container," a"))),this.timerId,l(this,g,!1),this.touchStart,this.touchMove,this.touchEnd,this.wh=window.innerHeight,this.currentIndex=0,this.sectionAll=this.getContainer.childNodes,this.getVerticalMovement=u(this,y,j).bind(this),this.setTouchStart=u(this,p,N).bind(this),this.setTouchMove=u(this,m,H).bind(this),this.setTouchEnd=u(this,w,O).bind(this),this.updateSectionHeight=u(this,M,U).bind(this),this.init()}var e,n,h;return e=t,(n=[{key:"init",value:function(){u(this,x,G).call(this),u(this,L,K).call(this),u(this,A,R).call(this),u(this,C,F).call(this),u(this,W,Q).call(this),window.addEventListener("resize",this.updateSectionHeight),window.addEventListener("resize",s),s(),this.config.init&&this.addEvent(),"card"===this.config.animation.type&&u(this,I,J).call(this)}},{key:"getContainer",get:function(){return c(this,f)}},{key:"getNavAnker",get:function(){return c(this,v)}},{key:"getState",get:function(){return{isScrolling:c(this,g)}}},{key:"getTouchPoints",get:function(){return void 0!==window.ontouchstart&&0<navigator.maxTouchPoints}},{key:"getEventType",get:function(){return{start:this.getTouchPoints?"touchstart":"mousedown",move:this.getTouchPoints?"touchmove":"mousemove",end:this.getTouchPoints?"touchend":"mouseup"}}},{key:"addEvent",value:function(){document.addEventListener("keydown",this.getVerticalMovement),this.getContainer.addEventListener("wheel",this.getVerticalMovement),this.getContainer.addEventListener(this.getEventType.start,this.setTouchStart),this.getContainer.addEventListener(this.getEventType.move,this.setTouchMove),this.getContainer.addEventListener(this.getEventType.end,this.setTouchEnd)}},{key:"removeEvent",value:function(){document.removeEventListener("keydown",this.getVerticalMovement),this.getContainer.removeEventListener("wheel",this.getVerticalMovement),this.getContainer.removeEventListener(this.getEventType.start,this.setTouchStart),this.getContainer.removeEventListener(this.getEventType.move,this.setTouchMove),this.getContainer.removeEventListener(this.getEventType.end,this.setTouchEnd)}}])&&o(e.prototype,n),h&&o(e,h),Object.defineProperty(e,"prototype",{writable:!1}),t}())("js-scrollSnap",{init:!0,animation:{},navigation:{anker:["kv","about","info","contact"]}});console.log(X.getTouchPoints)}();