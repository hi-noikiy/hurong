!function(){function e(e){for(var e=e.toUpperCase(),t=a.length,l=0,n=0;n<t;++n)for(var r=a[n],i=r[1].length;e.substr(0,i)==r[1];e=e.substr(i))l+=r[0];return l}function t(e){for(var e=e.toUpperCase(),t=o.length,l=1,n=1;0<e.length;n*=t)l+=o.indexOf(e.charAt(e.length-1))*n,e=e.substr(0,e.length-1);return l}var l=CKEDITOR.htmlParser.fragment.prototype,n=CKEDITOR.htmlParser.element.prototype;l.onlyChild=n.onlyChild=function(){var e=this.children;return 1==e.length&&e[0]||null},n.removeAnyChildWithName=function(e){for(var t,l=this.children,n=[],r=0;r<l.length;r++)t=l[r],t.name&&(t.name==e&&(n.push(t),l.splice(r--,1)),n=n.concat(t.removeAnyChildWithName(e)));return n},n.getAncestor=function(e){for(var t=this.parent;t&&(!t.name||!t.name.match(e));)t=t.parent;return t},l.firstChild=n.firstChild=function(e){for(var t,l=0;l<this.children.length;l++)if(t=this.children[l],e(t)||t.name&&(t=t.firstChild(e)))return t;return null},n.addStyle=function(e,t,l){var n="";if("string"==typeof t)n+=e+":"+t+";";else{if("object"==typeof e)for(var r in e)e.hasOwnProperty(r)&&(n+=r+":"+e[r]+";");else n+=e;l=t}this.attributes||(this.attributes={}),e=this.attributes.style||"",e=(l?[n,e]:[e,n]).join(";"),this.attributes.style=e.replace(/^;|;(?=;)/,"")},n.getStyle=function(e){var t=this.attributes.style;if(t)return t=CKEDITOR.tools.parseCssText(t,1),t[e]},CKEDITOR.dtd.parentOf=function(e){var t,l={};for(t in this)-1==t.indexOf("$")&&this[t][e]&&(l[t]=1);return l};var r,i=/^(?:\b0[^\s]*\s*){1,4}$/,s={ol:{decimal:/\d+/,"lower-roman":/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,"upper-roman":/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"lower-alpha":/^[a-z]+$/,"upper-alpha":/^[A-Z]+$/},ul:{disc:/[l\u00B7\u2002]/,circle:/[\u006F\u00D8]/,square:/[\u006E\u25C6]/}},a=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],o="ABCDEFGHIJKLMNOPQRSTUVWXYZ",u=0,c=null,f=CKEDITOR.plugins.pastefromword={utils:{createListBulletMarker:function(e,t){var l=new CKEDITOR.htmlParser.element("cke:listbullet");return l.attributes={"cke:listsymbol":e[0]},l.add(new CKEDITOR.htmlParser.text(t)),l},isListBulletIndicator:function(e){if(/mso-list\s*:\s*Ignore/i.test(e.attributes&&e.attributes.style))return!0},isContainingOnlySpaces:function(e){var t;return(t=e.onlyChild())&&/^(:?\s|&nbsp;)+$/.test(t.value)},resolveList:function(e){var t,l=e.attributes;return(t=e.removeAnyChildWithName("cke:listbullet"))&&t.length&&(t=t[0])?(e.name="cke:li",l.style&&(l.style=f.filters.stylesFilter([["text-indent"],["line-height"],[/^margin(:?-left)?$/,null,function(e){e=e.split(" "),e=CKEDITOR.tools.convertToPx(e[3]||e[1]||e[0]),!u&&null!==c&&e>c&&(u=e-c),c=e,l["cke:indent"]=u&&Math.ceil(e/u)+1||1}],[/^mso-list$/,null,function(e){var e=e.split(" "),t=Number(e[0].match(/\d+/)),e=Number(e[1].match(/\d+/));1==e&&(t!==r&&(l["cke:reset"]=1),r=t),l["cke:indent"]=e}]])(l.style,e)||""),l["cke:indent"]||(c=0,l["cke:indent"]=1),CKEDITOR.tools.extend(l,t.attributes),!0):(r=c=u=null,!1)},getStyleComponents:function(){var e=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>',CKEDITOR.document);return CKEDITOR.document.getBody().append(e),function(t,l,n){e.setStyle(t,l);for(var t={},l=n.length,r=0;r<l;r++)t[n[r]]=e.getStyle(n[r]);return t}}(),listDtdParents:CKEDITOR.dtd.parentOf("ol")},filters:{flattenList:function(e,t){var l,t="number"==typeof t?t:1,n=e.attributes;switch(n.type){case"a":l="lower-alpha";break;case"1":l="decimal"}for(var i,s=e.children,a=0;a<s.length;a++)if(i=s[a],i.name in CKEDITOR.dtd.$listItem){var o=i.attributes,u=i.children,d=u[u.length-1];d.name in CKEDITOR.dtd.$list&&(e.add(d,a+1),--u.length||s.splice(a--,1)),i.name="cke:li",n.start&&!a&&(o.value=n.start),f.filters.stylesFilter([["tab-stops",null,function(e){(e=e.split(" ")[1].match(/^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i))&&(c=CKEDITOR.tools.convertToPx(e[0]))}],1==t?["mso-list",null,function(e){e=e.split(" "),e=Number(e[0].match(/\d+/)),e!==r&&(o["cke:reset"]=1),r=e}]:null])(o.style),o["cke:indent"]=t,o["cke:listtype"]=e.name,o["cke:list-style-type"]=l}else if(i.name in CKEDITOR.dtd.$list){for(arguments.callee.apply(this,[i,t+1]),s=s.slice(0,a).concat(i.children).concat(s.slice(a+1)),e.children=[],i=0,u=s.length;i<u;i++)e.add(s[i]);s=e.children}delete e.name,n["cke:list"]=1},assembleList:function(l){for(var n,i,a,o,f,d,m,h,p,y,g,b,v=l.children,l=[],C=0;C<v.length;C++)if(n=v[C],"cke:li"==n.name)if(n.name="li",i=n.attributes,p=(p=i["cke:listsymbol"])&&p.match(/^(?:[(]?)([^\s]+?)([.)]?)$/),y=g=b=null,i["cke:ignored"])v.splice(C--,1);else{if(i["cke:reset"]&&(d=o=f=null),a=Number(i["cke:indent"]),a!=o&&(h=m=null),p){if(h&&s[h][m].test(p[1]))y=h,g=m;else for(var I in s)for(var O in s[I])if(s[I][O].test(p[1])){if("ol"!=I||!/alpha|roman/.test(O)){y=I,g=O;break}m=/roman/.test(O)?e(p[1]):t(p[1]),(!b||m<b)&&(b=m,y=I,g=O)}!y&&(y=p[2]?"ol":"ul")}else y=i["cke:listtype"]||"ol",g=i["cke:list-style-type"];if(h=y,m=g||("ol"==y?"decimal":"disc"),g&&g!=("ol"==y?"decimal":"disc")&&n.addStyle("list-style-type",g),"ol"==y&&p){switch(g){case"decimal":b=Number(p[1]);break;case"lower-roman":case"upper-roman":b=e(p[1]);break;case"lower-alpha":case"upper-alpha":b=t(p[1])}n.attributes.value=b}if(d){if(a>o)l.push(d=new CKEDITOR.htmlParser.element(y)),d.add(n),f.add(d);else{if(a<o){o-=a;for(var D;o--&&(D=d.parent);)d=D.parent}d.add(n)}v.splice(C--,1)}else l.push(d=new CKEDITOR.htmlParser.element(y)),d.add(n),v[C]=d;f=n,o=a}else d&&(d=o=f=null);for(C=0;C<l.length;C++)if(d=l[C],I=d.children,m=m=void 0,O=d.children.length,D=m=void 0,v=/list-style-type:(.*?)(?:;|$)/,o=CKEDITOR.plugins.pastefromword.filters.stylesFilter,m=d.attributes,!v.exec(m.style)){for(f=0;f<O;f++)if(m=I[f],m.attributes.value&&Number(m.attributes.value)==f+1&&delete m.attributes.value,m=v.exec(m.attributes.style)){if(m[1]!=D&&D){D=null;break}D=m[1]}if(D){for(f=0;f<O;f++)m=I[f].attributes,m.style&&(m.style=o([["list-style-type"]])(m.style)||"");d.addStyle("list-style-type",D)}}r=c=u=null},falsyFilter:function(){return!1},stylesFilter:function(e,t){return function(l,n){var r=[];(l||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(l,i,s){"font-family"==(i=i.toLowerCase())&&(s=s.replace(/["']/g,""));for(var a,o,u,c=0;c<e.length;c++)if(e[c]&&(l=e[c][0],a=e[c][1],o=e[c][2],u=e[c][3],i.match(l)&&(!a||s.match(a))))return i=u||i,t&&(o=o||s),"function"==typeof o&&(o=o(s,n,i)),o&&o.push&&(i=o[0],o=o[1]),void("string"==typeof o&&r.push([i,o]));!t&&r.push([i,s])});for(var i=0;i<r.length;i++)r[i]=r[i].join(":");return!!r.length&&r.join(";")+";"}},elementMigrateFilter:function(e,t){return e?function(l){var n=t?new CKEDITOR.style(e,t)._.definition:e;l.name=n.element,CKEDITOR.tools.extend(l.attributes,CKEDITOR.tools.clone(n.attributes)),l.addStyle(CKEDITOR.style.getStyleText(n))}:function(){}},styleMigrateFilter:function(e,t){var l=this.elementMigrateFilter;return e?function(n,r){var i=new CKEDITOR.htmlParser.element(null),s={};s[t]=n,l(e,s)(i),i.children=r.children,r.children=[i],i.filter=function(){},i.parent=r}:function(){}},bogusAttrFilter:function(e,t){if(-1==t.name.indexOf("cke:"))return!1},applyStyleFilter:null},getRules:function(e,t){var l=CKEDITOR.dtd,n=CKEDITOR.tools.extend({},l.$block,l.$listItem,l.$tableContent),r=e.config,s=this.filters,a=s.falsyFilter,o=s.stylesFilter,u=s.elementMigrateFilter,c=CKEDITOR.tools.bind(this.filters.styleMigrateFilter,this.filters),f=this.utils.createListBulletMarker,d=s.flattenList,m=s.assembleList,h=this.utils.isListBulletIndicator,p=this.utils.isContainingOnlySpaces,y=this.utils.resolveList,g=function(e){return e=CKEDITOR.tools.convertToPx(e),isNaN(e)?e:e+"px"},b=this.utils.getStyleComponents,v=this.utils.listDtdParents,C=!1!==r.pasteFromWordRemoveFontStyles,I=!1!==r.pasteFromWordRemoveStyles;return{elementNames:[[/meta|link|script/,""]],root:function(e){e.filterChildren(t),m(e)},elements:{"^":function(e){var t;CKEDITOR.env.gecko&&(t=s.applyStyleFilter)&&t(e)},$:function(e){var i=e.name||"",s=e.attributes;if(i in n&&s.style&&(s.style=o([[/^(:?width|height)$/,null,g]])(s.style)||""),i.match(/h\d/)){if(e.filterChildren(t),y(e))return;u(r["format_"+i])(e)}else if(i in l.$inline)e.filterChildren(t),p(e)&&delete e.name;else if(-1!=i.indexOf(":")&&-1==i.indexOf("cke")){if(e.filterChildren(t),"v:imagedata"==i)return(i=e.attributes["o:href"])&&(e.attributes.src=i),void(e.name="img");delete e.name}i in v&&(e.filterChildren(t),m(e))},style:function(e){if(CKEDITOR.env.gecko){var e=(e=e.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/))&&e[1],t={};e&&(e.replace(/[\n\r]/g,"").replace(/(.+?)\{(.+?)\}/g,function(e,l,n){for(var l=l.split(","),e=l.length,r=0;r<e;r++)CKEDITOR.tools.trim(l[r]).replace(/^(\w+)(\.[\w-]+)?$/g,function(e,l,r){l=l||"*",r=r.substring(1,r.length),r.match(/MsoNormal/)||(t[l]||(t[l]={}),r?t[l][r]=n:t[l]=n)})}),s.applyStyleFilter=function(e){var l=t["*"]?"*":e.name,n=e.attributes&&e.attributes.class;l in t&&(l=t[l],"object"==typeof l&&(l=l[n]),l&&e.addStyle(l,!0))})}return!1},p:function(e){if(/MsoListParagraph/i.exec(e.attributes.class)||e.getStyle("mso-list")){var l=e.firstChild(function(e){return e.type==CKEDITOR.NODE_TEXT&&!p(e.parent)});(l=l&&l.parent)&&l.addStyle("mso-list","Ignore")}e.filterChildren(t),y(e)||(r.enterMode==CKEDITOR.ENTER_BR?(delete e.name,e.add(new CKEDITOR.htmlParser.element("br"))):u(r["format_"+(r.enterMode==CKEDITOR.ENTER_P?"p":"div")])(e))},div:function(e){var t=e.onlyChild();if(t&&"table"==t.name){var l=e.attributes;t.attributes=CKEDITOR.tools.extend(t.attributes,l),l.style&&t.addStyle(l.style),t=new CKEDITOR.htmlParser.element("div"),t.addStyle("clear","both"),e.add(t),delete e.name}},td:function(e){e.getAncestor("thead")&&(e.name="th")},ol:d,ul:d,dl:d,font:function(e){if(h(e.parent))delete e.name;else{e.filterChildren(t);var l=e.attributes,n=l.style,r=e.parent;"font"==r.name?(CKEDITOR.tools.extend(r.attributes,e.attributes),n&&r.addStyle(n),delete e.name):(n=n||"",l.color&&("#000000"!=l.color&&(n+="color:"+l.color+";"),delete l.color),l.face&&(n+="font-family:"+l.face+";",delete l.face),l.size&&(n+="font-size:"+(3<l.size?"large":3>l.size?"small":"medium")+";",delete l.size),e.name="span",e.addStyle(n))}},span:function(e){if(h(e.parent))return!1;if(e.filterChildren(t),p(e))return delete e.name,null;if(h(e)){var l=e.firstChild(function(e){return e.value||"img"==e.name}),n=(l=l&&(l.value||"l."))&&l.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);if(n)return l=f(n,l),(e=e.getAncestor("span"))&&/ mso-hide:\s*all|display:\s*none /.test(e.attributes.style)&&(l.attributes["cke:ignored"]=1),l}return(n=(l=e.attributes)&&l.style)&&(l.style=o([["line-height"],[/^font-family$/,null,C?null:c(r.font_style,"family")],[/^font-size$/,null,C?null:c(r.fontSize_style,"size")],[/^color$/,null,C?null:c(r.colorButton_foreStyle,"color")],[/^background-color$/,null,C?null:c(r.colorButton_backStyle,"color")]])(n,e)||""),l.style||delete l.style,CKEDITOR.tools.isEmpty(l)&&delete e.name,null},b:u(r.coreStyles_bold),i:u(r.coreStyles_italic),u:u(r.coreStyles_underline),s:u(r.coreStyles_strike),sup:u(r.coreStyles_superscript),sub:u(r.coreStyles_subscript),a:function(e){e=e.attributes,e.href&&e.href.match(/^file:\/\/\/[\S]+#/i)&&(e.href=e.href.replace(/^file:\/\/\/[^#]+/i,""))},"cke:listbullet":function(e){e.getAncestor(/h\d/)&&!r.pasteFromWordNumberedHeadingToList&&delete e.name}},attributeNames:[[/^onmouse(:?out|over)/,""],[/^onload$/,""],[/(?:v|o):\w+/,""],[/^lang/,""]],attributes:{style:o(I?[[/^list-style-type$/,null],[/^margin$|^margin-(?!bottom|top)/,null,function(e,t,l){if(t.name in{p:1,div:1}){if(t="ltr"==r.contentsLangDirection?"margin-left":"margin-right","margin"==l)e=b(l,e,[t])[t];else if(l!=t)return null;if(e&&!i.test(e))return[t,e]}return null}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(e,t){if("img"==t.name)return e}],[/^width|height$/,null,function(e,t){if(t.name in{table:1,td:1,th:1,img:1})return e}]]:[[/^mso-/],[/-color$/,null,function(e){return"transparent"!=e&&(CKEDITOR.env.gecko?e.replace(/-moz-use-text-color/g,"transparent"):void 0)}],[/^margin$/,i],["text-indent","0cm"],["page-break-before"],["tab-stops"],["display","none"],C?[/font-?/]:null],I),width:function(e,t){if(t.name in l.$tableContent)return!1},border:function(e,t){if(t.name in l.$tableContent)return!1},class:a,bgcolor:a,valign:I?a:function(e,t){return t.addStyle("vertical-align",e),!1}},comment:CKEDITOR.env.ie?a:function(e,t){var l=e.match(/<img.*?>/),n=e.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);return n?(n=(l=n[1]||l&&"l.")&&l.match(/>(?:[(]?)([^\s]+?)([.)]?)</),f(n,l)):!(!CKEDITOR.env.gecko||!l)&&(l=CKEDITOR.htmlParser.fragment.fromHtml(l[0]).children[0],(n=(n=(n=t.previous)&&n.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/))&&n[1])&&(l.attributes.src=n),l)}}}},d=function(){this.dataFilter=new CKEDITOR.htmlParser.filter};d.prototype={toHtml:function(e){var e=CKEDITOR.htmlParser.fragment.fromHtml(e),t=new CKEDITOR.htmlParser.basicWriter;return e.writeHtml(t,this.dataFilter),t.getHtml(!0)}},CKEDITOR.cleanWord=function(e,t){CKEDITOR.env.gecko&&(e=e.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi,"$1$2$3")),CKEDITOR.env.webkit&&(e=e.replace(/(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi,"$1<span>$2</span>$3"));var l=new d,n=l.dataFilter;n.addRules(CKEDITOR.plugins.pastefromword.getRules(t,n)),t.fire("beforeCleanWord",{filter:n});try{e=l.toHtml(e)}catch(e){alert(t.lang.pastefromword.error)}return e=e.replace(/cke:.*?".*?"/g,""),e=e.replace(/style=""/g,""),e=e.replace(/<span>/g,"")}}();