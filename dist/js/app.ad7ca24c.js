(function(t){function e(e){for(var i,o,l=e[0],s=e[1],c=e[2],d=0,f=[];d<l.length;d++)o=l[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],i=!0,l=1;l<n.length;l++){var s=n[l];0!==a[s]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},a={app:0},r=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=s;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticClass:"editor col-md-8 mx-auto"},[n("editor-menu-bubble",{staticClass:"menububble",attrs:{editor:t.editor},on:{hide:t.hideLinkMenu},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.commands,a=e.isActive,r=e.getMarkAttrs,o=e.menu;return[n("div",{staticClass:"menububble",class:{"is-active":o.isActive},style:"left: "+o.left+"px; bottom: "+o.bottom+"px;"},[t.linkMenuIsActive?n("form",{staticClass:"menububble__form",on:{submit:function(e){return e.preventDefault(),t.setLinkUrl(i.link,t.linkUrl)}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.linkUrl,expression:"linkUrl"}],ref:"linkInput",staticClass:"menububble__input linkam",attrs:{type:"text",placeholder:"link + inter"},domProps:{value:t.linkUrl},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"esc",27,e.key,["Esc","Escape"])?null:t.hideLinkMenu(e)},input:function(e){e.target.composing||(t.linkUrl=e.target.value)}}}),n("button",{staticClass:"menububble__button",attrs:{type:"button"},on:{click:function(e){return t.setLinkUrl(i.link,null)}}},[n("v-icon",[t._v("mdi-close")])],1)]):[n("button",{staticClass:"menubar__button",class:{"is-active":a.bold()},on:{click:function(t){return t.preventDefault(),i.bold(t)}}},[n("v-icon",{attrs:{size:"26",color:"#000"}},[t._v("mdi-format-bold")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.heading({level:1})},on:{click:function(t){return t.preventDefault(),i.heading({level:1})}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"24",color:"#000"}},[t._v("mdi-format-header-1")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.heading({level:2})},on:{click:function(t){return t.preventDefault(),i.heading({level:2})}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"24",color:"#000"}},[t._v("mdi-format-header-2")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.heading({level:3})},on:{click:function(t){return t.preventDefault(),i.heading({level:3})}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"24",color:"#000"}},[t._v("mdi-format-header-3")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.italic()},on:{click:function(t){return t.preventDefault(),i.italic(t)}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"25",color:"#000"}},[t._v("mdi-format-italic")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.underline()},on:{click:function(t){return t.preventDefault(),i.underline(t)}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"22",color:"#000"}},[t._v("mdi-format-underline")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.strike()},on:{click:function(t){return t.preventDefault(),i.strike(t)}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"21",color:"#000"}},[t._v("mdi-format-strikethrough-variant")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.bullet_list()},on:{click:function(t){return t.preventDefault(),i.bullet_list(t)}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"22",color:"#000"}},[t._v("mdi-format-list-bulleted")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":a.ordered_list()},on:{click:function(t){return t.preventDefault(),i.ordered_list(t)}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"22",color:"#000"}},[t._v("mdi-format-list-numbered")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":"left"===t.editor.activeMarkAttrs.aligntext.align},on:{click:function(t){return t.preventDefault(),i.aligntext({align:"left"})}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"20",color:"#000"}},[t._v("mdi-format-align-left")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":"center"===t.editor.activeMarkAttrs.aligntext.align},on:{click:function(t){return t.preventDefault(),i.aligntext({align:"center"})}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"20",color:"#000"}},[t._v("mdi-format-align-center")])],1),n("button",{staticClass:"menubar__button",class:{"is-active":"right"===t.editor.activeMarkAttrs.aligntext.align},on:{click:function(t){return t.preventDefault(),i.aligntext({align:"right"})}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"20",color:"#000"}},[t._v("mdi-format-align-right")])],1),n("button",{staticClass:"menubar__button",on:{click:function(e){e.preventDefault(),t.imageUpload=!t.imageUpload}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"21",color:"#000"}},[t._v("mdi-image-plus")])],1),n("button",{staticClass:"menubar__button",on:{click:function(t){return t.preventDefault(),i.horizontal_rule(t)}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"21",color:"#000"}},[t._v("mdi-minus")])],1),n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":250,"content-class":"emoji_select",right:"","offset-y":!0},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("button",t._g({staticClass:"menubar__button",attrs:{type:"button"}},i),[n("v-icon",{staticClass:"deforme",attrs:{size:"21",color:"#000"}},[t._v("mdi-emoticon-happy-outline")])],1)]}}],null,!0)},[n("div",{staticClass:"icon_pack text-center"},t._l(t.emojis,(function(e,i){return n("span",{key:i,staticClass:"icon_pack_span",on:{click:function(n){return t.addEmoji(e.text)}}},[t._v(t._s(e.text))])})),0)]),n("button",{staticClass:"menububble__button",class:{"is-active":a.link()},on:{click:function(e){e.preventDefault(),t.showLinkModal(r("link"))}}},[n("v-icon",{staticClass:"deforme",attrs:{size:"19",color:"#000"}},[t._v("mdi-link-variant-plus")])],1),n("v-menu",{attrs:{"close-on-content-click":!0,"nudge-width":250,"content-class":"emoji_select",left:"","offset-y":!0},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("button",t._g({staticClass:"menubar__button",attrs:{type:"button"}},i),[n("v-icon",{staticClass:"deforme",attrs:{size:"21",color:"#000"}},[t._v("mdi-palette")])],1)]}}],null,!0)},[n("div",{staticClass:"icon_pack text-center"},t._l(t.colors,(function(e,r){return n("span",{key:r,staticClass:"pointer",class:{"is-active1":a.textColor({level:"text-"+e.name})},on:{click:function(t){return t.preventDefault(),i.textColor({level:"text-"+e.name})}}},[n("v-icon",{attrs:{color:e.color}},[t._v("mdi-circle")])],1)})),0)])],n("v-dialog",{attrs:{"max-width":"400px"},model:{value:t.imageUpload,callback:function(e){t.imageUpload=e},expression:"imageUpload"}},[n("h4",{staticClass:"col-12 px-0 mt-0"},[n("v-icon",{staticClass:"mr-1",attrs:{color:"#000",size:"20"}},[t._v("mdi-cloud-upload-outline")]),t._v(" Image send "),n("v-icon",{staticClass:"float-right",attrs:{color:"red",size:"25"},on:{click:function(e){t.imageUpload=!t.imageUpload}}},[t._v("mdi-close")])],1),n("v-divider",{staticClass:"col-12"}),n("form",{ref:"imageUpload",staticClass:"col-12 px-0 py-0",attrs:{action:"",autocomplete:"off"},on:{submit:function(e){return e.preventDefault(),t.addImage(i.image)}}},[n("v-text-field",{attrs:{label:"Image Absolute URL",outlined:"","hide-details":""},model:{value:t.imageUrl,callback:function(e){t.imageUrl=e},expression:"imageUrl"}}),n("v-btn",{staticClass:"mt-4",attrs:{type:"submit",color:"info",height:"40"}},[t._v("Send")])],1)],1),n("v-dialog",{attrs:{width:"400"},model:{value:t.linkModal,callback:function(e){t.linkModal=e},expression:"linkModal"}},[n("header",{staticClass:"pa-4 font-weight-bold"},[t._v("Add\\edit link "),n("v-icon",{staticClass:"float-right",attrs:{color:"error"},on:{click:function(e){t.linkModal=!t.linkModal}}},[t._v("mdi-close")])],1),n("v-divider"),n("div",{staticClass:"pa-4 pt-7 texam"},[n("v-form",{attrs:{autocomplete:"off"}},[n("v-text-field",{staticClass:"mb-5 size14",attrs:{label:"link",height:"50","hide-details":"",outlined:""},model:{value:t.linkUrl,callback:function(e){t.linkUrl=e},expression:"linkUrl"}}),n("v-checkbox",{attrs:{label:"Open in new tab","hide-details":""},model:{value:t.linkNewTab,callback:function(e){t.linkNewTab=e},expression:"linkNewTab"}})],1),n("v-btn",{staticClass:"mt-4",attrs:{color:"info"},on:{click:function(e){return t.sendLink(i.link)}}},[t._v("Add link")])],1)],1)],2)]}}])}),n("editor-content",{staticClass:"editor__content",attrs:{editor:t.editor}})],1)},r=[],o=(n("498a"),n("18a5"),n("ade3")),l=n("cd42"),s=n("304a"),c=n("f23d"),u=n("d4ec"),d=n("bee2"),f=n("262e"),p=n("2caf"),m=n("a9de"),v=function(t){Object(f["a"])(n,t);var e=Object(p["a"])(n);function n(){return Object(u["a"])(this,n),e.apply(this,arguments)}return Object(d["a"])(n,[{key:"commands",value:function(t){var e=t.type;return function(t){return Object(m["t"])(e,t)}}},{key:"inputRules",value:function(t){var e=t.type;return[Object(m["e"])(/(?:\*\*|__)([^*_]+)(?:\*\*|__)$/,e)]}},{key:"name",get:function(){return"aligntext"}},{key:"schema",get:function(){return{attrs:{align:{default:"left"}},parseDOM:[{style:"text-align",getAttrs:function(t){return{align:t}}}],toDOM:function(t){return["span",{style:"text-align: ".concat(t.attrs.align,"; display: block")},0]}}}}]),n}(l["e"]),b=n("5530"),g=function(t){Object(f["a"])(n,t);var e=Object(p["a"])(n);function n(){return Object(u["a"])(this,n),e.apply(this,arguments)}return Object(d["a"])(n,[{key:"schema",get:function(){return{attrs:{href:{default:null},target:{default:null}},inclusive:!1,parseDOM:[{tag:"a[href]",getAttrs:function(t){return{href:t.getAttribute("href"),target:t.getAttribute("target")}}}],toDOM:function(t){return["a",Object(b["a"])(Object(b["a"])({},t.attrs),{},{rel:"noopener noreferrer nofollow"}),0]}}}}]),n}(c["l"]),k=function(t){Object(f["a"])(n,t);var e=Object(p["a"])(n);function n(){return Object(u["a"])(this,n),e.apply(this,arguments)}return Object(d["a"])(n,[{key:"commands",value:function(t){var e=t.type;return function(t){return Object(m["t"])(e,t)}}},{key:"name",get:function(){return"textColor"}},{key:"defaultOptions",get:function(){return{levels:["text-success","text-danger","text-info","text-primary","text-warning","text-dark"]}}},{key:"schema",get:function(){return{attrs:{level:{default:""}},parseDOM:[{tag:"span.custom-style",getAttrs:function(t){return{level:t.classList[1]}}}],toDOM:function(t){return["span",{class:"custom-style ".concat(t.attrs.level)},0]}}}}]),n}(l["e"]),h={props:["EditorContent"],components:{EditorContent:l["b"],EditorMenuBubble:l["c"]},data:function(){var t,e=this;return t={linkNewTab:!1,linkUrl:null,linkModal:!1,editor:new l["a"]({extensions:[new c["a"],new c["c"],new c["e"],new k,new c["r"],new c["f"],new c["g"]({levels:[1,2,3]}),new c["m"],new c["n"],new c["i"],new c["p"],new c["q"],new g,new c["j"],new c["b"],new c["d"],new c["k"],new c["h"],new v,new c["o"]],content:'<p><strong>Bold</strong></p><h1>Heading1</h1><h2>Heading2</h2><h3>Heading3</h3><p><em>Italic</em></p><p><u>Underline</u></p><p><s>Strike</s></p><p>Unordered list:</p><ul><li><p>option1</p></li><li><p>option2</p></li></ul><p></p><p>Ordered list</p><ol><li><p>option1</p></li><li><p>option2</p></li></ol><p></p><p>left align</p><p><span style="text-align: center; display: block">center align</span></p><p><span style="text-align: right; display: block">right align</span></p><p></p><p><img src="https://vuetech.ir/_nuxt/img/services.e3dbeef.png"></p><h2></h2><hr><p></p><p>😉😍🙄😑</p><p><a href="https://vuetech.ir" rel="noopener noreferrer nofollow">Link without target</a></p><p><a href="https://vuetech.ir" target="_blank" rel="noopener noreferrer nofollow">Link with target _blank</a></p><p></p><p><span class="custom-style text-success">Green text</span></p><p><span class="custom-style text-primary">Blue text</span></p>',onUpdate:function(t){var n=t.getHTML;e.content=n()}}),content:""},Object(o["a"])(t,"linkUrl",null),Object(o["a"])(t,"linkMenuIsActive",!1),Object(o["a"])(t,"emojis",[{text:"😃"},{text:"😉"},{text:"😋"},{text:"😎"},{text:"😍"},{text:"🙄"},{text:"😑"},{text:"🤔"},{text:"😥"},{text:"🤐"},{text:"😫"},{text:"😲"},{text:"😭"},{text:"😡"},{text:"😬"},{text:"😴"}]),Object(o["a"])(t,"colors",[{name:"primary",color:"#007bff"},{name:"success",color:"#28a745"},{name:"warning",color:"#ffc107"},{name:"danger",color:"#dc3545"},{name:"info",color:"#17a2b8"},{name:"dark",color:"#343a40"}]),Object(o["a"])(t,"linkMenuIsActive",!1),Object(o["a"])(t,"img",null),Object(o["a"])(t,"imageUrl",""),Object(o["a"])(t,"imageUpload",!1),t},watch:{content:function(){},EditorContent:function(t){this.editor.setContent(t)}},methods:{showLinkModal:function(t){var e=this.editor,n=e.selection,i=e.state,a=n.from,r=n.to,o=i.doc.textBetween(a,r," ");""!=o&&(this.linkModal=!0,"_blank"==t.target&&(this.linkNewTab=!0),this.linkUrl=t.href)},sendLink:function(t){this.linkNewTab?t({href:this.linkUrl,target:"_blank"}):t({href:this.linkUrl}),this.linkModal=!1},elementFromString:function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e},insertHTML:function(t,e){var n=t.state,i=(t.view,n.selection),a=this.elementFromString(e),r=s["DOMParser"].fromSchema(n.schema).parseSlice(a),o=n.tr.insert(i.anchor,r.content);this.editor.view.dispatch(o)},addEmoji:function(t){var e=this.editor.state.tr.insertText(t);this.editor.view.dispatch(e)},addImage:function(t){if(""!=this.imageUrl){var e=this.imageUrl;t({src:e}),this.imageUrl="",this.imageUpload=!this.imageUpload}}}},_=h,x=(n("5c0b"),n("2877")),y=Object(x["a"])(_,a,r,!1,null,null,null),C=y.exports,w=n("ce5b"),O=n.n(w);i["default"].use(O.a),i["default"].config.productionTip=!1,new i["default"]({vuetify:new O.a,render:function(t){return t(C)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var i=n("9c0c"),a=n.n(i);a.a},"9c0c":function(t,e,n){}});
//# sourceMappingURL=app.ad7ca24c.js.map