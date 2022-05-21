!function(){var e={845:function(){Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null})},97:function(e,t,n){var i,o,r;function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}r=function(){"use strict";var e=function(){if("undefined"!=typeof Map)return Map;function e(e,t){var n=-1;return e.some((function(e,i){return e[0]===t&&(n=i,!0)})),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(t){var n=e(this.__entries__,t),i=this.__entries__[n];return i&&i[1]},t.prototype.set=function(t,n){var i=e(this.__entries__,t);~i?this.__entries__[i][1]=n:this.__entries__.push([t,n])},t.prototype.delete=function(t){var n=this.__entries__,i=e(n,t);~i&&n.splice(i,1)},t.prototype.has=function(t){return!!~e(this.__entries__,t)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(e,t){void 0===t&&(t=null);for(var n=0,i=this.__entries__;n<i.length;n++){var o=i[n];e.call(t,o[1],o[0])}},t}()}(),t="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,i=void 0!==n.g&&n.g.Math===Math?n.g:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),o="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(i):function(e){return setTimeout((function(){return e(Date.now())}),1e3/60)},r=["top","right","bottom","left","width","height","size","weight"],s="undefined"!=typeof MutationObserver,a=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(e,t){var n=!1,i=!1,r=0;function s(){n&&(n=!1,e()),i&&l()}function a(){o(s)}function l(){var e=Date.now();if(n){if(e-r<2)return;i=!0}else n=!0,i=!1,setTimeout(a,t);r=e}return l}(this.refresh.bind(this),20)}return e.prototype.addObserver=function(e){~this.observers_.indexOf(e)||this.observers_.push(e),this.connected_||this.connect_()},e.prototype.removeObserver=function(e){var t=this.observers_,n=t.indexOf(e);~n&&t.splice(n,1),!t.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},e.prototype.updateObservers_=function(){var e=this.observers_.filter((function(e){return e.gatherActive(),e.hasActive()}));return e.forEach((function(e){return e.broadcastActive()})),e.length>0},e.prototype.connect_=function(){t&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),s?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){t&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(e){var t=e.propertyName,n=void 0===t?"":t;r.some((function(e){return!!~n.indexOf(e)}))&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),l=function(e,t){for(var n=0,i=Object.keys(t);n<i.length;n++){var o=i[n];Object.defineProperty(e,o,{value:t[o],enumerable:!1,writable:!1,configurable:!0})}return e},c=function(e){return e&&e.ownerDocument&&e.ownerDocument.defaultView||i},u=v(0,0,0,0);function h(e){return parseFloat(e)||0}function d(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return t.reduce((function(t,n){return t+h(e["border-"+n+"-width"])}),0)}function f(e){var t=e.clientWidth,n=e.clientHeight;if(!t&&!n)return u;var i=c(e).getComputedStyle(e),o=function(e){for(var t={},n=0,i=["top","right","bottom","left"];n<i.length;n++){var o=i[n],r=e["padding-"+o];t[o]=h(r)}return t}(i),r=o.left+o.right,s=o.top+o.bottom,a=h(i.width),l=h(i.height);if("border-box"===i.boxSizing&&(Math.round(a+r)!==t&&(a-=d(i,"left","right")+r),Math.round(l+s)!==n&&(l-=d(i,"top","bottom")+s)),!function(e){return e===c(e).document.documentElement}(e)){var f=Math.round(a+r)-t,m=Math.round(l+s)-n;1!==Math.abs(f)&&(a-=f),1!==Math.abs(m)&&(l-=m)}return v(o.left,o.top,a,l)}var m="undefined"!=typeof SVGGraphicsElement?function(e){return e instanceof c(e).SVGGraphicsElement}:function(e){return e instanceof c(e).SVGElement&&"function"==typeof e.getBBox};function p(e){return t?m(e)?function(e){var t=e.getBBox();return v(0,0,t.width,t.height)}(e):f(e):u}function v(e,t,n,i){return{x:e,y:t,width:n,height:i}}var y=function(){function e(e){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=v(0,0,0,0),this.target=e}return e.prototype.isActive=function(){var e=p(this.target);return this.contentRect_=e,e.width!==this.broadcastWidth||e.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var e=this.contentRect_;return this.broadcastWidth=e.width,this.broadcastHeight=e.height,e},e}(),g=function(e,t){var n,i,o,r,s,a,c,u=(i=(n=t).x,o=n.y,r=n.width,s=n.height,a="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(a.prototype),l(c,{x:i,y:o,width:r,height:s,top:o,right:i+r,bottom:s+o,left:i}),c);l(this,{target:e,contentRect:u})},b=function(){function t(t,n,i){if(this.activeObservations_=[],this.observations_=new e,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=n,this.callbackCtx_=i}return t.prototype.observe=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof c(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)||(t.set(e,new y(e)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(e){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(e instanceof c(e).Element))throw new TypeError('parameter 1 is not of type "Element".');var t=this.observations_;t.has(e)&&(t.delete(e),t.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var e=this;this.clearActive(),this.observations_.forEach((function(t){t.isActive()&&e.activeObservations_.push(t)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var e=this.callbackCtx_,t=this.activeObservations_.map((function(e){return new g(e.target,e.broadcastRect())}));this.callback_.call(e,t,e),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),w="undefined"!=typeof WeakMap?new WeakMap:new e,_=function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=a.getInstance(),i=new b(t,n,this);w.set(this,i)};return["observe","unobserve","disconnect"].forEach((function(e){_.prototype[e]=function(){var t;return(t=w.get(this))[e].apply(t,arguments)}})),void 0!==i.ResizeObserver?i.ResizeObserver:_},"object"===s(t)?e.exports=r():void 0===(o="function"==typeof(i=r)?i.call(t,n,t,e):i)||(e.exports=o)}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i].call(r.exports,r,r.exports,n),r.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){"use strict";n(845);var e=navigator.userAgent.toLowerCase(),t=(e.match(/iPhone|Android.+Mobile/),e.indexOf("iphone")>-1||e.indexOf("ipad")>-1||e.indexOf("macintosh")>-1&&"ontouchend"in document),i=function(){return void 0!==window.ontouchstart&&0<navigator.maxTouchPoints},o=function(){return{touchstart:i()?"touchstart":"mousedown",touchmove:i()?"touchmove":"mousemove",touchend:i()?"touchend":"mouseup"}},r=function(e,t){[].slice.call(e).forEach(t)},s=function(e){return"[object HTMLCollection]"===Object.prototype.toString.call(e)},a=function(e,t){for(var n in t)e[n]=t[n];return e};function l(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config={modal:".js-lpc-modal",trigger:{open:".js-lpc-modal_trigger",noCloseSelectorNames:[],noCloseClassNames:[]},on:{}},this.on={beforeOpen:function(e){},afterOpen:function(e){},beforeClose:function(e){},afterClose:function(e){},resize:{query:void 0,callback:void 0}},a(this.config,t),t&&t.on&&a(this.on,t.on),Object.assign(this.config.on,this.on);var n=this.removeFirstLetter(this.config.modal);this.modalWrapper=this.isTypeId(this.config.modal)?document.getElementById(n):document.getElementsByClassName(n);var i=this.removeFirstLetter(this.config.trigger.open);this.openTrigger=this.isTypeId(this.config.trigger.open)?document.getElementById(i):document.getElementsByClassName(i),this.noCloseSelectorNames=this.config.trigger.noCloseSelectorNames,this.noCloseClassNames=this.config.trigger.noCloseClassNames,this.beforeOpen=this.config.on.beforeOpen,this.beforeClose=this.config.on.beforeClose,this.afterOpen=this.config.on.afterOpen,this.afterClose=this.config.on.afterClose,this.resize=this.config.on.resize,this.scrollPosition,this.execute()}var n,i,o;return n=e,i=[{key:"removeFirstLetter",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:/^[.#]?/g;return e.replace(t,"")}},{key:"isTypeId",value:function(e){return"#"===e.slice(0,1)}},{key:"setBodyFixed",value:function(){t?(this.scrollPosition=window.pageYOffset,document.body.classList.add("is-fixed_ios"),document.body.style.top="-".concat(this.scrollPosition,"px")):document.body.classList.add("is-fixed")}},{key:"setBodyStatic",value:function(){t?(document.body.classList.remove("is-fixed_ios"),document.body.style.removeProperty("top"),window.scrollTo(0,this.scrollPosition)):document.body.classList.remove("is-fixed")}},{key:"setOpen",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;e.addEventListener("click",(function(e){e.preventDefault(),t.beforeOpen(e),t.setBodyFixed(),void 0===n?t.modalWrapper.classList.add("is-open"):t.modalWrapper[n].classList.add("is-open"),t.afterOpen(e)}))}},{key:"handleOpen",value:function(){var e=this;s(this.modalWrapper)?r(this.openTrigger,(function(t,n){e.setOpen(t,n)})):this.setOpen(this.openTrigger)}},{key:"isExclusionSelector",value:function(e){if(void 0!==this.noCloseSelectorNames)return this.noCloseSelectorNames.includes(e.target.localName)}},{key:"isExclusionClass",value:function(e){var t=this;if(void 0!==this.noCloseClassNames)return e.target.className.split(" ").some((function(e){return t.noCloseClassNames.includes(e)}))}},{key:"setClose",value:function(e){var t=this;e.addEventListener("click",(function(e){t.isExclusionSelector(e)||t.isExclusionClass(e)||(e.preventDefault(),t.beforeClose(e),t.setBodyStatic(),e.currentTarget.classList.remove("is-open"),t.afterClose(e))}))}},{key:"handleClose",value:function(){var e=this;s(this.modalWrapper)?r(this.modalWrapper,(function(t){e.setClose(t)})):this.setClose(this.modalWrapper)}},{key:"hasResizeConfig",value:function(){return this.resize.query&&this.resize.callback}},{key:"handleResize",value:function(){var e,t,n;this.hasResizeConfig()&&(e=this.resize,t=window.matchMedia("".concat(e.query)),n=e.callback,t.addListener((function(e){return n(e.matches)})),n(t.matches))}},{key:"execute",value:function(){this.handleOpen(),this.handleClose(),this.handleResize()}}],i&&l(n.prototype,i),o&&l(n,o),Object.defineProperty(n,"prototype",{writable:!1}),e}();function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var h=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.wrap=document.querySelectorAll(t.wrap),this.item=document.querySelectorAll(t.item),this.duration=t.duration,this.activeIndex=0,this.currentItem=this.item[this.activeIndex],this.prevItem=this.item[this.activeIndex--],this.currentItem.classList.add("is-active"),this.execute.bind(this),setInterval((function(){n.execute()}),this.duration)}var t,n,i;return t=e,(n=[{key:"getItemTotalNum",value:function(){return this.item.length-1}},{key:"isMaxIndex",value:function(){return this.activeIndex>=this.getItemTotalNum()}},{key:"addActiveClass",value:function(e){e.classList.add("is-active")}},{key:"removeActiveClass",value:function(e){e.classList.remove("is-active")}},{key:"setActiveClass",value:function(){this.isMaxIndex()?(this.activeIndex=0,this.currentItem=this.item[this.activeIndex],this.addActiveClass(this.currentItem),this.removeActiveClass(this.item[this.getItemTotalNum()])):(this.activeIndex++,this.currentItem=this.item[this.activeIndex],this.prevItem=this.item[this.activeIndex-1],this.addActiveClass(this.currentItem),this.prevItem&&this.removeActiveClass(this.prevItem))}},{key:"execute",value:function(){this.setActiveClass()}}])&&u(t.prototype,n),i&&u(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config={ytData:[{playerId:"js-player",videoId:"ONPO3K33t-Q"}],parameter:[{playerVars:{autoplay:1,mute:1,controls:1,loop:1,playlist:"videoId",rel:0,playsinline:1},events:{onReady:function(e){e.target.mute(),e.target.playVideo()}}}]},a(this.config,t),this.player=[],this.ytData=this.config.ytData,this.parameter=this.config.parameter,this.execute()}var t,n,i;return t=e,(n=[{key:"insertIframeAPI",value:function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",document.getElementsByTagName("head")[0].appendChild(e)}},{key:"isOnlyOneParam",value:function(){return 1===this.parameter.length}},{key:"onYouTubeIframeAPIReady",value:function(){var e=this;this.ytData.forEach((function(t,n){var i=e.isOnlyOneParam()?0:n;if(void 0!==e.parameter[i]){var o=JSON.parse(JSON.stringify(e.parameter[i].playerVars));"videoId"===o.playlist&&(o.playlist=e.ytData[n].videoId),e.player[n]=new YT.Player(t.playerId,{videoId:t.videoId,playerVars:o,events:e.parameter[i].events})}}))}},{key:"execute",value:function(){var e=this;this.insertIframeAPI(),window.addEventListener("load",(function(){return e.onYouTubeIframeAPIReady()}))}}])&&d(t.prototype,n),i&&d(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();n(97);function m(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config={navigation:"#js-lpc-navigation",navigationArea:".js-lpc-navigation_area",activeClassName:"is-active",threshold:0},a(this.config,t),this.navigation=document.querySelector(this.config.navigation),this.navigationItem=[].slice.call(document.querySelectorAll("".concat(this.config.navigation," > ul > li"))),this.navigationActive=document.querySelector("".concat(this.config.navigation," > ul > .is-active")),this.navigationArea=[].slice.call(document.querySelectorAll(this.config.navigationArea)),this.area,this.scrollTop=window.pageYOffset,this.current=0,this.initialize()}var t,n,i;return t=e,(n=[{key:"getNavigationHeight",value:function(){return this.navigation.offsetHeight}},{key:"getOffsetTop",value:function(e){return e.getBoundingClientRect().top+this.scrollTop}},{key:"getAreaPotision",value:function(){var e=this;return this.navigationArea.map((function(t){return e.getOffsetTop(t)-e.getNavigationHeight()}))}},{key:"isPageBottom",value:function(){return document.body.scrollHeight-(this.scrollTop+window.innerHeight)==0}},{key:"hasActiveClass",value:function(e){return e.classList.contains(this.config.activeClassName)}},{key:"addActive",value:function(e){e.classList.add(this.config.activeClassName)}},{key:"removeActive",value:function(e){this.hasActiveClass(e)&&e.classList.remove(this.config.activeClassName)}},{key:"setActive",value:function(){var e=this;for(var t in this.area)this.scrollTop+window.innerHeight*this.config.threshold<this.area[0]||this.scrollTop<this.area[0]?(this.current=0,this.navigationItem.forEach((function(t){return e.removeActive(t)})),this.addActive(this.navigationItem[0])):this.scrollTop+window.innerHeight*this.config.threshold>this.area[t]?(this.current=t,this.navigationItem.forEach((function(t){return e.removeActive(t)})),this.addActive(this.navigationItem[t])):(this.scrollTop+window.innerHeight*this.config.threshold>this.area[this.area.length-1]||this.isPageBottom())&&(this.current=this.area.length-1,this.navigationItem.forEach((function(t){return e.removeActive(t)})),this.addActive(this.navigationItem[this.area.length-1]))}},{key:"initialize",value:function(){var e=this;this.area=this.getAreaPotision(),this.setActive(),window.addEventListener("scroll",(function(){e.scrollTop=window.pageYOffset,e.setActive()})),window.addEventListener("resize",(function(){e.setActive()})),new ResizeObserver((function(t,n){e.area=e.getAreaPotision(),e.setActive()})).observe(document.body)}}])&&m(t.prototype,n),i&&m(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function v(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var y=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.container=document.querySelector(t),this.option={initialSlide:0,slidesToShow:1,slidesToScroll:1,loop:!1,autoplay:!1,autoplaySpeed:5e3,arrows:!0,arrowsClassName:"jslider_arrows",arrowClassName:"jslider_arrow",dots:!0,dotsClassName:"jslider_dots",dotClassName:"jslider_dot",swipe:!0,breakpoints:null},a(this.option,n),this.slide=this.container.querySelector(".js-jslider_list"),this.slideItem=this.slide.children,this.slideItemWidth="".concat(Math.floor(this.slide.offsetWidth/this.option.slidesToShow)),this.slideContainerWidth="".concat(Math.floor(this.slide.offsetWidth/this.option.slidesToShow*this.slideItem.length)),this.slideItemAxis,this.arrowsElement=void 0,this.dotsElement=void 0,this.centerAxis=Math.floor(this.slide.offsetWidth/2),this.startX,this.startY,this.moveX,this.moveY,this.currentIndex=this.option.initialSlide,this.translateX=-Math.floor(this.slide.offsetWidth/this.option.slidesToShow*this.currentIndex),this.translate3d="translate3d(".concat(this.translateX,"px, 0, 0)"),this.init()}var t,n,i;return t=e,(n=[{key:"init",value:function(){this.setSlideContainer(),this.setSlideItem(),this.option.arrows&&this.setArrows(),this.option.dots&&this.setDots(),this.option.swipe&&this.setSwipe(this.container)}},{key:"setSlideContainer",value:function(){this.slide.style.setProperty("width",this.slideContainerWidth+"px",""),this.slide.style.setProperty("transform",this.translate3d,"")}},{key:"setSlideItem",value:function(){this.slideItem[this.option.initialSlide].classList.add("is-active");for(var e=0;e<this.slideItem.length;e++)this.slideItem[e].style.setProperty("width",this.slideItemWidth+"px","")}},{key:"setArrows",value:function(){for(var e=0;e<2;e++){var t=document.createElement("button");t.className=this.option.arrowsClassName,t.classList.add(0===e?"mod-prev":"mod-next");var n=document.createElement("div");n.className=this.option.arrowClassName,t.appendChild(n),this.container.parentNode.insertBefore(t,this.container.nextElementSibling)}this.arrowsElement=document.querySelectorAll(".".concat(this.option.arrowClassName))}},{key:"setDots",value:function(){var e=document.createElement("ul");e.className=this.option.dotsClassName;for(var t=0;t<this.slideItem.length;t++){var n=document.createElement("li");n.className=this.option.dotClassName,t===this.option.initialSlide&&n.classList.add("is-active"),e.appendChild(n)}this.container.parentNode.insertBefore(e,this.container.nextElementSibling),this.dotsElement=document.querySelectorAll(".".concat(this.option.dotClassName))}},{key:"setSwipe",value:function(){var e=this,t=function(t){t.preventDefault(),e.slide.classList.contains("is-move")&&e.slide.classList.remove("is-move"),e.startX=e.getTouchesX(t),e.container.addEventListener(o().touchmove,n,!1),e.container.addEventListener(o().touchend,i,!1)},n=function(t){t.preventDefault(),e.moveX=e.getChangeTouchesX(t);var n=Math.floor(e.translateX+.05*(e.moveX-e.startX));n>=0?e.translateX=0:n<0&&n<=-(e.slideContainerWidth-e.slideItemWidth)?e.translateX=-(e.slideContainerWidth-e.slideItemWidth):e.translateX=n,e.translate3d="translate3d(".concat(e.translateX,"px, 0, 0)"),e.slide.style.setProperty("transform",e.translate3d,"")},i=function(i){e.startX!==i.clientX&&(e.slide.classList.add("is-move"),e.setUpdateIndex(),e.slideItemAxis=Math.floor(-e.slideItemWidth*e.currentIndex),e.translateX=e.slideItemAxis,e.translate3d="translate3d(".concat(e.slideItemAxis,"px, 0, 0)"),e.slide.style.setProperty("transform",e.translate3d,"")),e.container.removeEventListener("mousemove",n,!1),e.container.removeEventListener("mouseup",t,!1)};this.container.addEventListener(o().touchstart,t)}},{key:"getTouchesX",value:function(e){return void 0===e.touches?e.pageX:e.touches[0].pageX}},{key:"getTouchesY",value:function(e){return void 0===e.touches?e.pageY:e.touches[0].pageY}},{key:"getChangeTouchesX",value:function(e){return void 0===e.touches?e.pageX:e.changedTouches[0].pageX}},{key:"getChangeTouchesY",value:function(e){return void 0===e.touches?e.pageY:e.changedTouches[0].pageY}},{key:"setUpdateIndex",value:function(){this.dotsElement&&this.dotsElement[this.currentIndex].classList.remove("is-active"),this.slideItem[this.currentIndex].classList.remove("is-active"),this.startX>this.moveX&&this.startX>this.moveX&&this.currentIndex<this.slideItem.length-1?this.currentIndex++:this.startX<this.moveX&&this.startX<this.moveX&&this.currentIndex>0&&this.currentIndex--,this.dotsElement&&this.dotsElement[this.currentIndex].classList.add("is-active"),this.slideItem[this.currentIndex].classList.add("is-active")}}])&&v(t.prototype,n),i&&v(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function g(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var b=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.selector=t||document.getElementsByClassName("js-inView"),this.option={addClassName:"add-inView",trigger:"top",once:!0},a(this.option,n),this.init()}var t,n,i;return t=e,(n=[{key:"init",value:function(){this._handleScroll(),window.addEventListener("scroll",this._handleScroll.bind(this))}},{key:"destroy",value:function(){window.removeEventListener("scroll",this._handleScroll.bind(this))}},{key:"_getScrollValue",value:function(){return window.pageYOffset||document.documentElement.scrollTop}},{key:"_getOffsetTop",value:function(){var e=this;return[].slice.call(this.selector).map((function(t){return t.getBoundingClientRect().top+e._getScrollValue()}))}},{key:"_getWindowHeight",value:function(){return window.innerHeight}},{key:"_getViewTriggerValue",value:function(e){var t=0;switch(this.option.trigger){case"top":default:t=this._getWindowHeight();break;case"middle":t=this._getWindowHeight()/2;break;case"bottom":t=this._getWindowHeight()-this.selector[e].offsetHeight}return t}},{key:"_addViewClass",value:function(e){this.selector[e].classList.add(this.option.addClassName)}},{key:"_removeViewClass",value:function(e){this.option.once||this.selector[e].classList.remove(this.option.addClassName)}},{key:"_handleScroll",value:function(){var e=this;r(this.selector,(function(t,n){var i=e._getScrollValue()+e._getViewTriggerValue(n)>e._getOffsetTop()[n],o="top"===e.option.trigger||"bottom"===e.option.trigger?0:e._getViewTriggerValue(n),r=e._getWindowHeight()-t.offsetHeight,s=e._getScrollValue()+o+r<e._getOffsetTop()[n]+t.offsetHeight;i&&s?e._addViewClass(n):e._removeViewClass(n)}))}}])&&g(t.prototype,n),i&&g(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function w(e){return function(e){if(Array.isArray(e))return _(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function E(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var I=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.elem=document.getElementById(t),this.config={number:1234567890,rollNum:1,duration:200,startTime:1e3,stopTime:500,comma:!0},a(this.config,n),this.number=this.config.number,this.rollNum=this.config.rollNum,this.duration=this.config.duration,this.startTime=this.config.startTime,this.stopTime=this.config.stopTime,this.comma=this.config.comma;var i=this.comma?Number(this.number).toLocaleString():String(this.number);this.numberArray=this._getStringArray(i),this.numberLength=w(String(this.number)).length,this._setNumberElements(),this._init()}var t,n,i;return t=e,(n=[{key:"_getStringArray",value:function(e){if(!Array.isArray(e))return w(e)}},{key:"_setNumberElements",value:function(){for(var e=0;e<this.numberArray.length;e++)","===this.numberArray[e]?this.elem.insertAdjacentHTML("beforeend",'<div class="drumroll_inner">\n          <span class="drumroll_comma">,</span>\n        </div>'):this.elem.insertAdjacentHTML("beforeend",'<div class="drumroll_inner js-drumroll_inner">\n          <div class="drumroll_numbers js-drumroll_numbers">\n            <span class="drumroll_num js-drumroll_roll">0</span>\n            <span class="drumroll_num js-drumroll_target" data-num='.concat(this.numberArray[e],">1</span>\n          </div>\n        </div>"))}},{key:"_init",value:function(){var e=this;[].slice.call(this.elem.getElementsByClassName("js-drumroll_numbers")).forEach((function(t,n){var i=e.numberLength-1-n,o=Number(t.querySelector(".js-drumroll_target").dataset.num);setTimeout((function(){t.classList.add("add-roll"),t.classList.add("mod-delay".concat(i)),setTimeout((function(){var i=0,r=0,s=1,a=setInterval((function(){r<9?r++:(r=0,i++),s<9?s++:s=0,t.querySelector(".js-drumroll_roll").textContent=r,t.querySelector(".js-drumroll_target").textContent=s,i>=e.rollNum&&setTimeout((function(){t.classList.remove("add-roll"),t.classList.add("add-stop"),t.querySelector(".js-drumroll_target").textContent=o,clearInterval(a)}),n*e.duration*e.numberLength)}),e.duration)}),i*e.duration)}),e.startTime)}))}}])&&E(t.prototype,n),i&&E(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function C(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var k=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.elementById=document.getElementById(t),this.type=null!=n&&n.type?n.type:"slideToggle",this.duration=null!=n&&n.duration?n.duration:500,this.easing=null!=n&&n.easing?n.easing:"swing",this._execute()}var t,n,i;return t=e,(n=[{key:"_easing",value:function(e,t,n,i){var o=n*(.5-Math.cos(e/i*Math.PI)/2)+t;return this.easing,o}},{key:"_initSlideToggle",value:function(){"slideToggle"===this.type&&(this.type="none"===getComputedStyle(this.elementById).display?"slideDown":"slideUp")}},{key:"_isDuringExecution",value:function(){var e="slideUp"===this.type&&("none"===getComputedStyle(this.elementById).display||this.elementById.classList.contains("add-execute")),t="slideDown"===this.type&&("none"!==getComputedStyle(this.elementById).display||this.elementById.classList.contains("add-execute"));return e||t}},{key:"_getHeightValues",value:function(){var e=getComputedStyle(this.elementById);return{height:this.elementById.getBoundingClientRect().height,marginTop:parseFloat(e.marginTop),marginBottom:parseFloat(e.marginBottom),paddingTop:parseFloat(e.paddingTop),paddingBottom:parseFloat(e.paddingBottom)}}},{key:"_setHeightValue",value:function(){var e=this._getHeightValues();Object.keys(e).forEach((function(t){0===e[t]&&delete e[t]})),this.heightVal=e,Object.keys(this.heightVal).length}},{key:"_setAnimation",value:function(){var e=this;return this.elementById.classList.add("add-execute"),this.elementById.style.overflow="hidden","slideDown"===this.type&&(this.elementById.style.display="block"),this._setHeightValue(),function(t,n,i){Object.keys(i).forEach((function(o){var r="slideDown"===e.type?e._easing(t,0,i[o],n):i[o]-e._easing(t,0,i[o],n);e.elementById.style[o]="".concat(r,"px")}))}}},{key:"_execute",value:function(){var e=this;if(this._initSlideToggle(),!this._isDuringExecution()){var t=this._setAnimation(),n=new Date;requestAnimationFrame((function i(){var o=new Date-n;if(o>e.duration)return e.elementById.classList.remove("add-execute"),"slideUp"===e.type&&(e.elementById.style.display="none"),e.elementById.style.overflow="",void Object.keys(e.heightVal).forEach((function(t){e.elementById.style[t]=""}));t(o,e.duration,e.heightVal),requestAnimationFrame(i)}))}}}])&&C(t.prototype,n),i&&C(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function x(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var O=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.option={sp:!1,pc:!1,ios:!1},function(e,t){for(var n in t)e[n]=t[n]}(this.option,t)}var t,n,i;return t=e,(n=[{key:"execute",value:function(){return this._judgement()}},{key:"_judgement",value:function(){var e=this,t=this.option;return Object.keys(t).some((function(n){return t[n]&&e["_".concat(n)]()}))}},{key:"_ios",value:function(){return"undefined"!=typeof window&&navigator&&navigator.platform&&(/iP(ad|hone|od)/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1)}},{key:"_sp",value:function(){return navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)}},{key:"_pc",value:function(){return!navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)}}])&&x(t.prototype,n),i&&x(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}();function T(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function A(e,t,n){return t&&T(e.prototype,t),n&&T(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var S=A((function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.target=t,this.option=n,this.device=new O(this.option).execute(),this.ios=!1,this.option.sp&&(this.ios=new O({ios:!0}).execute()),console.log("PC or SP: ".concat(this.device)),console.log("iOS: ".concat(this.ios))}));window.addEventListener("load",(function(){document.body.classList.add("add-loaded"),setTimeout((function(){new b(document.getElementsByClassName("js-inView"),{trigger:"bottom",once:!1})}),0),new I("js-drumroll",{number:907651321,rollNum:2,startTime:1e3,comma:!0}),document.getElementById("js-root").addEventListener("click",(function(){new k("root")}))})),new S(null,{sp:!0,pc:!0}),function(e,t){var n=document.getElementById(e),i={target:null,callback:null};a(i,t);var o=window.matchMedia("(pointer: fine)").matches,r=null!=i.target?i.target:document,s={stalker:{x:document.documentElement.clientWidth/2,y:document.documentElement.clientHeight/2},pointer:{x:document.documentElement.clientWidth/2,y:document.documentElement.clientHeight/2}},l=function e(){s.stalker.x+=.1*(s.pointer.x-s.stalker.x),s.stalker.y+=.1*(s.pointer.y-s.stalker.y);var t=Math.round(10*s.stalker.x)/10,i=Math.round(10*s.stalker.y)/10;n.style.transform="translate3d(".concat(t,"px, ").concat(i,"px, 0)"),requestAnimationFrame(e)};o&&r.addEventListener("mousemove",(function(){n.classList.add("add-active"),r.addEventListener("mousemove",(function(e){s.pointer.x=e.clientX,s.pointer.y=e.clientY})),requestAnimationFrame(l)})),null!=i.callback&&i.callback()}("js-mouseStalker",{}),new p,new c;new c({modal:".js-lpc-modal2",trigger:{open:".js-lpc-modal_trigger2",noCloseSelectorNames:["a","dd","img"],noCloseClassNames:["mod-noModalClose"]},on:{resize:{query:"(max-width: 599px)",callback:function(e){e?console.log("SP"):console.log("Tablt ~ ")}}}});var j=new f({ytData:[{playerId:"js-player3",videoId:"HcdzNHCwluM"}],parameter:[{playerVars:{autoplay:0,mute:1,controls:1,loop:1,playlist:"videoId",rel:0,playsinline:1}}]});new c({modal:"#js-modal3",trigger:{open:"#js-lpc-modal_trigger3",noCloseClassNames:["mod-noClick","mod-tshtan"]},on:{afterOpen:function(e){console.log(e),console.log(j);var t;(t=j.player[0]).mute(),t.playVideo()},afterClose:function(e){console.log(e),1===j.player[0].getPlayerState()&&j.player[0].pauseVideo()}}});new h({wrap:".js-crossFade",item:".js-crossFade_item",duration:6e3}),new f({ytData:[{playerId:"js-player1",videoId:"HcdzNHCwluM"},{playerId:"js-player2",videoId:"wKkvbuLhEns"}],parameter:[{playerVars:{mute:1,controls:1,loop:1,playlist:"videoId",rel:0,playsinline:1},events:{onReady:function(e){e.target.mute()},onStateChange:function(e){1===e.target.getPlayerState()&&console.log("video 再生中")}}}]}),new y("#js-jslider",{initialSlide:0,slidesToShow:1,arrows:!0,dots:!0,swipe:!0})}()}();