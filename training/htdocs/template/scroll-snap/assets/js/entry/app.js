!function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function e(t,e){i(t,e),e.add(t)}function n(t,e,n){i(t,e),e.set(t,n)}function i(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function o(t,e){return function(t,e){if(e.get)return e.get.call(t);return e.value}(t,r(t,e,"get"))}function s(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}function h(t,e,n){return function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,r(t,e,"set"),n),n}function r(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}var a=new WeakMap,u=new WeakMap,c=new WeakSet,v=new WeakSet,l=new WeakSet,g=new WeakSet;function d(t){var e=this;this.getState.isScrolling||(h(this,u,!0),this.pageY=this.getTouchPoints||"mouseup"===t.type?this.touchEnd:t.deltaY,this.pageY<0?console.log("UP"):console.log("DOWN"),clearTimeout(this.timerId),this.timerId=setTimeout((function(){h(e,u,!1)}),1e3))}function f(t){this.touchStart=t.pageY}function m(t){this.touchMove=t.pageY}function E(t){this.touchEnd=this.touchStart-this.touchMove,null!=this.touchMove&&(this.touchMove=null,s(this,c,d).call(this,t))}var p=new(function(){function i(t,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),e(this,g),e(this,l),e(this,v),e(this,c),n(this,a,{writable:!0,value:void 0}),n(this,u,{writable:!0,value:void 0}),h(this,a,t?document.getElementById(t):document.documentElement),this.config=o,this.timerId,h(this,u,!1),this.pageY,this.touchStart,this.touchMove,this.touchEnd,this.getVerticalMovement=s(this,c,d).bind(this),this.setTouchStart=s(this,v,f).bind(this),this.setTouchMove=s(this,l,m).bind(this),this.setTouchEnd=s(this,g,E).bind(this),this.init()}var r,p,w;return r=i,(p=[{key:"init",value:function(){this.addEvent()}},{key:"getContainer",get:function(){return o(this,a)}},{key:"getState",get:function(){return{isScrolling:o(this,u)}}},{key:"getTouchPoints",get:function(){return void 0!==window.ontouchstart&&0<navigator.maxTouchPoints}},{key:"getEvent",get:function(){return{start:this.getTouchPoints?"touchstart":"mousedown",move:this.getTouchPoints?"touchmove":"mousemove",end:this.getTouchPoints?"touchend":"mouseup"}}},{key:"addEvent",value:function(){this.getTouchPoints||this.getContainer.addEventListener("wheel",this.getVerticalMovement),this.getContainer.addEventListener(this.getEvent.start,this.setTouchStart),this.getContainer.addEventListener(this.getEvent.move,this.setTouchMove),this.getContainer.addEventListener(this.getEvent.end,this.setTouchEnd)}},{key:"removeEvent",value:function(){this.getTouchPoints||this.getContainer.removeEventListener("wheel",this.getVerticalMovement),this.getContainer.removeEventListener(this.getEvent.start,this.setTouchStart),this.getContainer.removeEventListener(this.getEvent.move,this.setTouchMove),this.getContainer.removeEventListener(this.getEvent.end,this.setTouchEnd)}}])&&t(r.prototype,p),w&&t(r,w),Object.defineProperty(r,"prototype",{writable:!1}),i}());console.log(p.getTouchPoints)}();