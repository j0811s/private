!function(){function e(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,a=[],i=!0,l=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);i=!0);}catch(c){l=!0,o=c}finally{try{i||null==n.return||n.return()}finally{if(l)throw o}}return a}(e,n)||t(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var r=document.createElement("style");r.innerHTML="body{margin:0;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.App{text-align:center}.App-logo{height:40vmin;pointer-events:none}@media (prefers-reduced-motion: no-preference){.App-logo{animation:App-logo-spin infinite 20s linear}}.App-header{background-color:#282c34;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:calc(10px + 2vmin);color:#fff}.App-link{color:#61dafb}@keyframes App-logo-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}button{font-size:calc(10px + 2vmin)}\n",document.head.appendChild(r),System.register(["./vendor-legacy.dcaf4513.js"],(function(){"use strict";var t,n,r,o;return{setters:[function(e){t=e.j,n=e.r,r=e.R,o=e.a}],execute:function(){var a=t.exports.jsx,i=t.exports.jsxs;function l(){var t=e(n.exports.useState(0),2),r=t[0],o=t[1];return a("div",{className:"App",children:i("header",{className:"App-header",children:[a("img",{src:"./assets/logo.ecc203fb.svg",className:"App-logo",alt:"logo"}),a("p",{children:"Hello Vite + React!"}),a("p",{children:i("button",{type:"button",onClick:function(){return o((function(e){return e+1}))},children:["count is: ",r]})}),i("p",{children:["Edit ",a("code",{children:"App.tsx"})," and save to test HMR updates."]}),i("p",{children:[a("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer",children:"Learn React"})," | ",a("a",{className:"App-link",href:"https://vitejs.dev/guide/features.html",target:"_blank",rel:"noopener noreferrer",children:"Vite Docs"})]})]})})}r.render(a(o.StrictMode,{children:a(l,{})}),document.getElementById("root"))}}}))}();
