!function(){"use strict";function e(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(Element.prototype.matches.call(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null});var t=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var o=window.navigator.userAgent.toLowerCase();this.isiOS=o.indexOf("iphone")>-1||o.indexOf("ipad")>-1||o.indexOf("macintosh")>-1&&"ontouchend"in document;var s={modal:".js-lpc-modal",trigger:{open:".js-lpc-modal_trigger",noCloseSelectorNames:[],noCloseClassNames:[]}};this.overwriteProperty(s,e),this.modalName=s.modal,this.modalWrapper=document.querySelectorAll(this.modalName),this.openTrigger=document.querySelectorAll(s.trigger.open),this.noCloseSelectorNames=s.trigger.noCloseSelectorNames,this.noCloseClassNames=s.trigger.noCloseClassNames,s.on&&(this.beforeOpen=s.on.beforeOpen,this.afterOpen=s.on.afterOpen,this.beforeClose=s.on.beforeClose,this.afterClose=s.on.afterClose),this.scrollPosition,this.execute()}var o,s,i;return o=t,(s=[{key:"nodeEach",value:function(e,t){[].slice.call(e).forEach(t)}},{key:"overwriteProperty",value:function(e,t){for(var o in t)e[o]=t[o];return e}},{key:"bodyFixedOn",value:function(){this.isiOS?(this.scrollPosition=window.pageYOffset,document.body.classList.add("is-m_fixed"),document.body.style.top="-".concat(this.scrollPosition,"px")):document.body.classList.add("is-m_hidden")}},{key:"bodyFixedOff",value:function(){this.isiOS?(document.body.classList.remove("is-m_fixed"),document.body.style.removeProperty("top"),window.scrollTo(0,this.scrollPosition)):document.body.classList.remove("is-m_hidden")}},{key:"setOpen",value:function(){var e=this;this.nodeEach(this.openTrigger,(function(t,o){t.addEventListener("click",(function(t){t.preventDefault(),e.beforeOpen&&e.beforeOpen(t),e.bodyFixedOn(),e.modalWrapper[o].classList.add("is-open"),e.afterOpen&&e.afterOpen(t)}))}))}},{key:"isExclusionSelector",value:function(e){if(void 0!==this.noCloseSelectorNames)return this.noCloseSelectorNames.includes(e.target.localName)}},{key:"isExclusionClass",value:function(e){var t=this;if(void 0!==this.noCloseClassNames)return e.target.className.split(" ").some((function(e){return t.noCloseClassNames.includes(e)}))}},{key:"setClose",value:function(){var e=this;this.nodeEach(this.modalWrapper,(function(t){t.addEventListener("click",(function(o){if(e.isExclusionSelector(o)||e.isExclusionClass(o))return o.preventDefault(),!1;e.beforeClose&&e.beforeClose(o),e.bodyFixedOff(),t.classList.remove("is-open"),e.afterClose&&e.afterClose(o)}))}))}},{key:"execute",value:function(){this.setOpen(),this.setClose()}}])&&e(o.prototype,s),i&&e(o,i),t}();function o(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}var s=function(){function e(t){var o=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.wrap=document.querySelectorAll(t.wrap),this.item=document.querySelectorAll(t.item),this.duration=t.duration,this.activeIndex=0,this.currentItem=this.item[this.activeIndex],this.prevItem=this.item[this.activeIndex--],this.currentItem.classList.add("is-active"),this.execute.bind(this),setInterval((function(){o.execute()}),this.duration)}var t,s,i;return t=e,(s=[{key:"getItemTotalNum",value:function(){return this.item.length-1}},{key:"isMaxIndex",value:function(){return this.activeIndex>=this.getItemTotalNum()}},{key:"addActiveClass",value:function(e){e.classList.add("is-active")}},{key:"removeActiveClass",value:function(e){e.classList.remove("is-active")}},{key:"setActiveClass",value:function(){this.isMaxIndex()?(this.activeIndex=0,this.currentItem=this.item[this.activeIndex],this.addActiveClass(this.currentItem),this.removeActiveClass(this.item[this.getItemTotalNum()])):(this.activeIndex++,this.currentItem=this.item[this.activeIndex],this.prevItem=this.item[this.activeIndex-1],this.addActiveClass(this.currentItem),this.prevItem&&this.removeActiveClass(this.prevItem))}},{key:"execute",value:function(){this.setActiveClass()}}])&&o(t.prototype,s),i&&o(t,i),e}();new t({on:{beforeOpen:function(e){console.log("beforeOpen"),document.body.classList.add("add-beforeOpen")},afterOpen:function(e){console.log("afterOpen"),setTimeout((function(){document.body.classList.remove("add-beforeOpen")}),1e3)}}}),new t({modal:".js-lpc-modal2",trigger:{open:".js-lpc-modal_trigger2",noCloseSelectorNames:["a","figure","img"],noCloseClassNames:["mod-noModalClose","mod-sample"]},on:{beforeClose:function(e){console.log("beforeClose"),document.body.classList.add("add-afterOpen")},afterClose:function(e){setTimeout((function(){document.body.classList.remove("add-afterOpen")}),1e3),console.log("afterClose")}}}),new s({wrap:".js-crossFade",item:".js-crossFade_item",duration:6e3})}();