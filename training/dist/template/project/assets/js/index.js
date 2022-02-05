!function(){var e={845:function(){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null})},97:function(e,t,i){var n,o,s;function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}s=function(){"use strict";var e=function(){if("undefined"!=typeof Map)return Map;function e(e,t){var i=-1;return e.some((function(e,n){return e[0]===t&&(i=n,!0)})),i}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var i=e(this.__entries__,t),n=this.__entries__[i];return n&&n[1]},t.prototype.set=function(t,i){var n=e(this.__entries__,t);~n?this.__entries__[n][1]=i:this.__entries__.push([t,i])},t.prototype.delete=function(t){var i=this.__entries__,n=e(i,t);~n&&i.splice(n,1)},t.prototype.has=function(t){return!!~e(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(e,t){void 0===t&&(t=null);for(var i=0,n=this.__entries__;i<n.length;i++){var o=n[i];e.call(t,o[1],o[0])}},t}()}(),t="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,n=void 0!==i.g&&i.g.Math===Math?i.g:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),o="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(n):function(e){return setTimeout((function(){return e(Date.now())}),1e3/60)},s=["top","right","bottom","left","width","height","size","weight"],r="undefined"!=typeof MutationObserver,a=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(e,t){var i=!1,n=!1,s=0;function r(){i&&(i=!1,e()),n&&c()}function a(){o(r)}function c(){var e=Date.now();if(i){if(e-s<2)return;n=!0}else i=!0,n=!1,setTimeout(a,t);s=e}return c}(this.refresh.bind(this),20)}return e.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},e.prototype.removeObserver=function(e){var t=this.observers_,i=t.indexOf(e);~i&&t.splice(i,1),!t.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var e=this.observers_.filter((function(e){return e.gatherActive(),e.hasActive()}));return e.forEach((function(e){return e.broadcastActive()})),e.length>0},e.prototype.connect_=function(){t&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),r?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){t&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(e){var t=e.propertyName,i=void 0===t?"":t;s.some((function(e){return!!~i.indexOf(e)}))&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),c=function(e,t){for(var i=0,n=Object.keys(t);i<n.length;i++){var o=n[i];Object.defineProperty(e,o,{value:t[o],enumerable:!1,writable:!1,configurable:!0})}return e},l=function(e){return e&&e.ownerDocument&&e.ownerDocument.defaultView||n},h=m(0,0,0,0);function u(e){return parseFloat(e)||0}function d(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];return t.reduce((function(t,i){return t+u(e["border-"+i+"-width"])}),0)}function f(e){var t=e.clientWidth,i=e.clientHeight;if(!t&&!i)return h;var n=l(e).getComputedStyle(e),o=function(e){for(var t={},i=0,n=["top","right","bottom","left"];i<n.length;i++){var o=n[i],s=e["padding-"+o];t[o]=u(s)}return t}(n),s=o.left+o.right,r=o.top+o.bottom,a=u(n.width),c=u(n.height);if("border-box"===n.boxSizing&&(Math.round(a+s)!==t&&(a-=d(n,"left","right")+s),Math.round(c+r)!==i&&(c-=d(n,"top","bottom")+r)),!function(e){return e===l(e).document.documentElement}(e)){var f=Math.round(a+s)-t,v=Math.round(c+r)-i;1!==Math.abs(f)&&(a-=f),1!==Math.abs(v)&&(c-=v)}return m(o.left,o.top,a,c)}var v="undefined"!=typeof SVGGraphicsElement?function(e){return e instanceof l(e).SVGGraphicsElement}:function(e){return e instanceof l(e).SVGElement&&"function"==typeof e.getBBox};function p(e){return t?v(e)?function(e){var t=e.getBBox();return m(0,0,t.width,t.height)}(e):f(e):h}function m(e,t,i,n){return{x:e,y:t,width:i,height:n}}var g=function(){function e(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=m(0,0,0,0),this.target=e}return e.prototype.isActive=function(){var e=p(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},e}(),y=function(e,t){var i,n,o,s,r,a,l,h=(n=(i=t).x,o=i.y,s=i.width,r=i.height,a="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,l=Object.create(a.prototype),c(l,{x:n,y:o,width:s,height:r,top:o,right:n+s,bottom:r+o,left:n}),l);c(this,{target:e,contentRect:h})},w=function(){function t(t,i,n){if(this.activeObservations_=[],this.observations_=new e,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=i,this.callbackCtx_=n}return t.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof l(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)||(t.set(e,new g(e)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof l(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach((function(t){t.isActive()&&e.activeObservations_.push(t)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map((function(e){return new y(e.target,e.broadcastRect())}));this.callback_.call(e,t,e),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),b="undefined"!=typeof WeakMap?new WeakMap:new e,_=function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var i=a.getInstance(),n=new w(t,i,this);b.set(this,n)};return["observe","unobserve","disconnect"].forEach((function(e){_.prototype[e]=function(){var t;return(t=b.get(this))[e].apply(t,arguments)}})),void 0!==n.ResizeObserver?n.ResizeObserver:_},"object"===r(t)?e.exports=s():void 0===(o="function"==typeof(n=s)?n.call(t,i,t,e):n)||(e.exports=o)}},t={};function i(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,i),s.exports}i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){"use strict";i(845);var e=navigator.userAgent.toLowerCase(),t=(e.match(/iPhone|Android.+Mobile/),e.indexOf("iphone")>-1||e.indexOf("ipad")>-1||e.indexOf("macintosh")>-1&&"ontouchend"in document),n=function(){return void 0!==window.ontouchstart&&0<navigator.maxTouchPoints},o=function(){return{touchstart:n()?"touchstart":"mousedown",touchmove:n()?"touchmove":"mousemove",touchend:n()?"touchend":"mouseup"}},s=function(e,t){[].slice.call(e).forEach(t)},r=function(e){return"[object HTMLCollection]"===Object.prototype.toString.call(e)},a=function(e,t){for(var i in t)e[i]=t[i];return e};function c(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config={modal:".js-lpc-modal",trigger:{open:".js-lpc-modal_trigger",noCloseSelectorNames:[],noCloseClassNames:[]},on:{}},this.on={beforeOpen:function(e){},afterOpen:function(e){},beforeClose:function(e){},afterClose:function(e){},resize:{query:void 0,callback:void 0}},a(this.config,t),t&&t.on&&a(this.on,t.on),Object.assign(this.config.on,this.on);var i=this.removeFirstLetter(this.config.modal);this.modalWrapper=this.isTypeId(this.config.modal)?document.getElementById(i):document.getElementsByClassName(i);var n=this.removeFirstLetter(this.config.trigger.open);this.openTrigger=this.isTypeId(this.config.trigger.open)?document.getElementById(n):document.getElementsByClassName(n),this.noCloseSelectorNames=this.config.trigger.noCloseSelectorNames,this.noCloseClassNames=this.config.trigger.noCloseClassNames,this.beforeOpen=this.config.on.beforeOpen,this.beforeClose=this.config.on.beforeClose,this.afterOpen=this.config.on.afterOpen,this.afterClose=this.config.on.afterClose,this.resize=this.config.on.resize,this.scrollPosition,this.execute()}var i,n,o;return i=e,(n=[{key:"removeFirstLetter",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:/^[.#]?/g;return e.replace(t,"")}},{key:"isTypeId",value:function(e){return"#"===e.slice(0,1)}},{key:"setBodyFixed",value:function(){t?(this.scrollPosition=window.pageYOffset,document.body.classList.add("is-fixed_ios"),document.body.style.top="-".concat(this.scrollPosition,"px")):document.body.classList.add("is-fixed")}},{key:"setBodyStatic",value:function(){t?(document.body.classList.remove("is-fixed_ios"),document.body.style.removeProperty("top"),window.scrollTo(0,this.scrollPosition)):document.body.classList.remove("is-fixed")}},{key:"setOpen",value:function(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;e.addEventListener("click",(function(e){e.preventDefault(),t.beforeOpen(e),t.setBodyFixed(),void 0===i?t.modalWrapper.classList.add("is-open"):t.modalWrapper[i].classList.add("is-open"),t.afterOpen(e)}))}},{key:"handleOpen",value:function(){var e=this;r(this.modalWrapper)?s(this.openTrigger,(function(t,i){e.setOpen(t,i)})):this.setOpen(this.openTrigger)}},{key:"isExclusionSelector",value:function(e){if(void 0!==this.noCloseSelectorNames)return this.noCloseSelectorNames.includes(e.target.localName)}},{key:"isExclusionClass",value:function(e){var t=this;if(void 0!==this.noCloseClassNames)return e.target.className.split(" ").some((function(e){return t.noCloseClassNames.includes(e)}))}},{key:"setClose",value:function(e){var t=this;e.addEventListener("click",(function(e){t.isExclusionSelector(e)||t.isExclusionClass(e)||(e.preventDefault(),t.beforeClose(e),t.setBodyStatic(),e.currentTarget.classList.remove("is-open"),t.afterClose(e))}))}},{key:"handleClose",value:function(){var e=this;r(this.modalWrapper)?s(this.modalWrapper,(function(t){e.setClose(t)})):this.setClose(this.modalWrapper)}},{key:"hasResizeConfig",value:function(){return this.resize.query&&this.resize.callback}},{key:"handleResize",value:function(){var e,t,i;this.hasResizeConfig()&&(e=this.resize,t=window.matchMedia("".concat(e.query)),i=e.callback,t.addListener((function(e){return i(e.matches)})),i(t.matches))}},{key:"execute",value:function(){this.handleOpen(),this.handleClose(),this.handleResize()}}])&&c(i.prototype,n),o&&c(i,o),e}();function h(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var u=function(){function e(t){var i=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.wrap=document.querySelectorAll(t.wrap),this.item=document.querySelectorAll(t.item),this.duration=t.duration,this.activeIndex=0,this.currentItem=this.item[this.activeIndex],this.prevItem=this.item[this.activeIndex--],this.currentItem.classList.add("is-active"),this.execute.bind(this),setInterval((function(){i.execute()}),this.duration)}var t,i,n;return t=e,(i=[{key:"getItemTotalNum",value:function(){return this.item.length-1}},{key:"isMaxIndex",value:function(){return this.activeIndex>=this.getItemTotalNum()}},{key:"addActiveClass",value:function(e){e.classList.add("is-active")}},{key:"removeActiveClass",value:function(e){e.classList.remove("is-active")}},{key:"setActiveClass",value:function(){this.isMaxIndex()?(this.activeIndex=0,this.currentItem=this.item[this.activeIndex],this.addActiveClass(this.currentItem),this.removeActiveClass(this.item[this.getItemTotalNum()])):(this.activeIndex++,this.currentItem=this.item[this.activeIndex],this.prevItem=this.item[this.activeIndex-1],this.addActiveClass(this.currentItem),this.prevItem&&this.removeActiveClass(this.prevItem))}},{key:"execute",value:function(){this.setActiveClass()}}])&&h(t.prototype,i),n&&h(t,n),e}();function d(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config={ytData:[{playerId:"js-player",videoId:"ONPO3K33t-Q"}],parameter:[{playerVars:{autoplay:1,mute:1,controls:1,loop:1,playlist:"videoId",rel:0,playsinline:1},events:{onReady:function(e){e.target.mute(),e.target.playVideo()}}}]},a(this.config,t),this.player=[],this.ytData=this.config.ytData,this.parameter=this.config.parameter,this.execute()}var t,i,n;return t=e,(i=[{key:"insertIframeAPI",value:function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",document.getElementsByTagName("head")[0].appendChild(e)}},{key:"isOnlyOneParam",value:function(){return 1===this.parameter.length}},{key:"onYouTubeIframeAPIReady",value:function(){var e=this;this.ytData.forEach((function(t,i){var n=e.isOnlyOneParam()?0:i;if(void 0!==e.parameter[n]){var o=JSON.parse(JSON.stringify(e.parameter[n].playerVars));"videoId"===o.playlist&&(o.playlist=e.ytData[i].videoId),e.player[i]=new YT.Player(t.playerId,{videoId:t.videoId,playerVars:o,events:e.parameter[n].events})}}))}},{key:"execute",value:function(){var e=this;this.insertIframeAPI(),window.addEventListener("load",(function(){return e.onYouTubeIframeAPIReady()}))}}])&&d(t.prototype,i),n&&d(t,n),e}();i(97);function v(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config={navigation:"#js-lpc-navigation",navigationArea:".js-lpc-navigation_area",activeClassName:"is-active",threshold:0},a(this.config,t),this.navigation=document.querySelector(this.config.navigation),this.navigationItem=[].slice.call(document.querySelectorAll("".concat(this.config.navigation," > ul > li"))),this.navigationActive=document.querySelector("".concat(this.config.navigation," > ul > .is-active")),this.navigationArea=[].slice.call(document.querySelectorAll(this.config.navigationArea)),this.area,this.scrollTop=window.pageYOffset,this.current=0,this.initialize()}var t,i,n;return t=e,(i=[{key:"getNavigationHeight",value:function(){return this.navigation.offsetHeight}},{key:"getOffsetTop",value:function(e){return e.getBoundingClientRect().top+this.scrollTop}},{key:"getAreaPotision",value:function(){var e=this;return this.navigationArea.map((function(t){return e.getOffsetTop(t)-e.getNavigationHeight()}))}},{key:"isPageBottom",value:function(){return document.body.scrollHeight-(this.scrollTop+window.innerHeight)==0}},{key:"hasActiveClass",value:function(e){return e.classList.contains(this.config.activeClassName)}},{key:"addActive",value:function(e){e.classList.add(this.config.activeClassName)}},{key:"removeActive",value:function(e){this.hasActiveClass(e)&&e.classList.remove(this.config.activeClassName)}},{key:"setActive",value:function(){var e=this;for(var t in this.area)this.scrollTop+window.innerHeight*this.config.threshold<this.area[0]||this.scrollTop<this.area[0]?(this.current=0,this.navigationItem.forEach((function(t){return e.removeActive(t)})),this.addActive(this.navigationItem[0])):this.scrollTop+window.innerHeight*this.config.threshold>this.area[t]?(this.current=t,this.navigationItem.forEach((function(t){return e.removeActive(t)})),this.addActive(this.navigationItem[t])):(this.scrollTop+window.innerHeight*this.config.threshold>this.area[this.area.length-1]||this.isPageBottom())&&(this.current=this.area.length-1,this.navigationItem.forEach((function(t){return e.removeActive(t)})),this.addActive(this.navigationItem[this.area.length-1]))}},{key:"initialize",value:function(){var e=this;this.area=this.getAreaPotision(),this.setActive(),window.addEventListener("scroll",(function(){e.scrollTop=window.pageYOffset,e.setActive()})),window.addEventListener("resize",(function(){e.setActive()})),new ResizeObserver((function(t,i){e.area=e.getAreaPotision(),e.setActive()})).observe(document.body)}}])&&v(t.prototype,i),n&&v(t,n),e}();function m(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var g=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.container=document.querySelector(t),this.option={initialSlide:0,slidesToShow:1,slidesToScroll:1,loop:!1,autoplay:!1,autoplaySpeed:5e3,arrows:!0,arrowsClassName:"jslider_arrows",arrowClassName:"jslider_arrow",dots:!0,dotsClassName:"jslider_dots",dotClassName:"jslider_dot",swipe:!0,breakpoints:null},a(this.option,i),this.slide=this.container.querySelector(".js-jslider_list"),this.slideItem=this.slide.children,this.slideItemWidth="".concat(Math.floor(this.slide.offsetWidth/this.option.slidesToShow)),this.slideContainerWidth="".concat(Math.floor(this.slide.offsetWidth/this.option.slidesToShow*this.slideItem.length)),this.slideItemAxis,this.arrowsElement=void 0,this.dotsElement=void 0,this.centerAxis=Math.floor(this.slide.offsetWidth/2),this.startX,this.startY,this.moveX,this.moveY,this.currentIndex=this.option.initialSlide,this.translateX=-Math.floor(this.slide.offsetWidth/this.option.slidesToShow*this.currentIndex),this.translate3d="translate3d(".concat(this.translateX,"px, 0, 0)"),this.init()}var t,i,n;return t=e,(i=[{key:"init",value:function(){this.setSlideContainer(),this.setSlideItem(),this.option.arrows&&this.setArrows(),this.option.dots&&this.setDots(),this.option.swipe&&this.setSwipe(this.container)}},{key:"setSlideContainer",value:function(){this.slide.style.setProperty("width",this.slideContainerWidth+"px",""),this.slide.style.setProperty("transform",this.translate3d,"")}},{key:"setSlideItem",value:function(){this.slideItem[this.option.initialSlide].classList.add("is-active");for(var e=0;e<this.slideItem.length;e++)this.slideItem[e].style.setProperty("width",this.slideItemWidth+"px","")}},{key:"setArrows",value:function(){for(var e=0;e<2;e++){var t=document.createElement("button");t.className=this.option.arrowsClassName,t.classList.add(0===e?"mod-prev":"mod-next");var i=document.createElement("div");i.className=this.option.arrowClassName,t.appendChild(i),this.container.parentNode.insertBefore(t,this.container.nextElementSibling)}this.arrowsElement=document.querySelectorAll(".".concat(this.option.arrowClassName))}},{key:"setDots",value:function(){var e=document.createElement("ul");e.className=this.option.dotsClassName;for(var t=0;t<this.slideItem.length;t++){var i=document.createElement("li");i.className=this.option.dotClassName,t===this.option.initialSlide&&i.classList.add("is-active"),e.appendChild(i)}this.container.parentNode.insertBefore(e,this.container.nextElementSibling),this.dotsElement=document.querySelectorAll(".".concat(this.option.dotClassName))}},{key:"setSwipe",value:function(){var e=this,t=function(t){t.preventDefault(),e.slide.classList.contains("is-move")&&e.slide.classList.remove("is-move"),e.startX=e.getTouchesX(t),e.container.addEventListener(o().touchmove,i,!1),e.container.addEventListener(o().touchend,n,!1)},i=function(t){t.preventDefault(),e.moveX=e.getChangeTouchesX(t);var i=Math.floor(e.translateX+.05*(e.moveX-e.startX));i>=0?e.translateX=0:i<0&&i<=-(e.slideContainerWidth-e.slideItemWidth)?e.translateX=-(e.slideContainerWidth-e.slideItemWidth):e.translateX=i,e.translate3d="translate3d(".concat(e.translateX,"px, 0, 0)"),e.slide.style.setProperty("transform",e.translate3d,"")},n=function(n){e.startX!==n.clientX&&(e.slide.classList.add("is-move"),e.setUpdateIndex(),e.slideItemAxis=Math.floor(-e.slideItemWidth*e.currentIndex),e.translateX=e.slideItemAxis,e.translate3d="translate3d(".concat(e.slideItemAxis,"px, 0, 0)"),e.slide.style.setProperty("transform",e.translate3d,"")),e.container.removeEventListener("mousemove",i,!1),e.container.removeEventListener("mouseup",t,!1)};this.container.addEventListener(o().touchstart,t)}},{key:"getTouchesX",value:function(e){return void 0===e.touches?e.pageX:e.touches[0].pageX}},{key:"getTouchesY",value:function(e){return void 0===e.touches?e.pageY:e.touches[0].pageY}},{key:"getChangeTouchesX",value:function(e){return void 0===e.touches?e.pageX:e.changedTouches[0].pageX}},{key:"getChangeTouchesY",value:function(e){return void 0===e.touches?e.pageY:e.changedTouches[0].pageY}},{key:"setUpdateIndex",value:function(){this.dotsElement&&this.dotsElement[this.currentIndex].classList.remove("is-active"),this.slideItem[this.currentIndex].classList.remove("is-active"),this.startX>this.moveX&&this.startX>this.moveX&&this.currentIndex<this.slideItem.length-1?this.currentIndex++:this.startX<this.moveX&&this.startX<this.moveX&&this.currentIndex>0&&this.currentIndex--,this.dotsElement&&this.dotsElement[this.currentIndex].classList.add("is-active"),this.slideItem[this.currentIndex].classList.add("is-active")}}])&&m(t.prototype,i),n&&m(t,n),e}();function y(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var w=function(){function e(t,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.selector=t||document.getElementsByClassName("js-inView"),this.option={addClassName:"add-inView",trigger:"top",once:!0},a(this.option,i),this.init()}var t,i,n;return t=e,(i=[{key:"init",value:function(){this._handleScroll(),window.addEventListener("scroll",this._handleScroll.bind(this))}},{key:"destroy",value:function(){window.removeEventListener("scroll",this._handleScroll.bind(this))}},{key:"_getScrollValue",value:function(){return window.pageYOffset||document.documentElement.scrollTop}},{key:"_getOffsetTop",value:function(){var e=this;return[].slice.call(this.selector).map((function(t){return t.getBoundingClientRect().top+e._getScrollValue()}))}},{key:"_getWindowHeight",value:function(){return window.innerHeight}},{key:"_getViewTriggerValue",value:function(e){var t=0;switch(this.option.trigger){case"top":t=this._getWindowHeight();break;case"middle":t=this._getWindowHeight()/2;break;case"bottom":t=this._getWindowHeight()-this.selector[e].offsetHeight;break;default:t=this._getWindowHeight()}return t}},{key:"_addViewClass",value:function(e){this.selector[e].classList.add(this.option.addClassName)}},{key:"_removeViewClass",value:function(e){this.option.once||this.selector[e].classList.remove(this.option.addClassName)}},{key:"_handleScroll",value:function(){var e=this;s(this.selector,(function(t,i){var n=e._getScrollValue()+e._getViewTriggerValue(i)>e._getOffsetTop()[i],o="top"===e.option.trigger||"bottom"===e.option.trigger?0:e._getViewTriggerValue(i),s=e._getWindowHeight()-t.offsetHeight,r=e._getScrollValue()+o+s<e._getOffsetTop()[i]+t.offsetHeight;n&&r?e._addViewClass(i):e._removeViewClass(i)}))}}])&&y(t.prototype,i),n&&y(t,n),e}();window.addEventListener("load",(function(){document.body.classList.add("add-loaded"),setTimeout((function(){new w(document.getElementsByClassName("js-inView"),{trigger:"bottom",once:!1})}),0)})),new p;new l,new l({modal:".js-lpc-modal2",trigger:{open:".js-lpc-modal_trigger2",noCloseSelectorNames:["a","dd","img"],noCloseClassNames:["mod-noModalClose"]},on:{resize:{query:"(max-width: 599px)",callback:function(e){e?console.log("SP"):console.log("Tablt ~ ")}}}});var b=new f({ytData:[{playerId:"js-player3",videoId:"HcdzNHCwluM"}],parameter:[{playerVars:{autoplay:0,mute:1,controls:1,loop:1,playlist:"videoId",rel:0,playsinline:1}}]});new l({modal:"#js-modal3",trigger:{open:"#js-lpc-modal_trigger3",noCloseClassNames:["mod-noClick","mod-tshtan"]},on:{afterOpen:function(e){console.log(b);var t;(t=b.player[0]).mute(),t.playVideo()},afterClose:function(e){1===b.player[0].getPlayerState()&&b.player[0].pauseVideo()}}});new u({wrap:".js-crossFade",item:".js-crossFade_item",duration:6e3}),new f({ytData:[{playerId:"js-player1",videoId:"HcdzNHCwluM"},{playerId:"js-player2",videoId:"wKkvbuLhEns"}],parameter:[{playerVars:{mute:1,controls:1,loop:1,playlist:"videoId",rel:0,playsinline:1},events:{onReady:function(e){e.target.mute()},onStateChange:function(e){1===e.target.getPlayerState()&&console.log("video 再生中")}}}]}),new g("#js-jslider",{initialSlide:0,slidesToShow:1,arrows:!0,dots:!0,swipe:!0})}()}();