define(function(require,exports,module){require("lib/codeonline/lib/codemirror.js");var t={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},e={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,caseFold:!1};CodeMirror.defineMode("xml",function(r,n){function o(t,e){function r(r){return e.tokenize=r,r(t,e)}var n=t.next();if("<"==n)return t.eat("!")?t.eat("[")?t.match("CDATA[")?r(l("atom","]]>")):null:t.match("--")?r(l("comment","--\x3e")):t.match("DOCTYPE",!0,!0)?(t.eatWhile(/[\w\._\-]/),r(u(1))):null:t.eat("?")?(t.eatWhile(/[\w\._\-]/),e.tokenize=l("meta","?>"),"meta"):(y=t.eat("/")?"closeTag":"openTag",e.tokenize=a,"tag bracket");if("&"==n){var o;return o=t.eat("#")?t.eat("x")?t.eatWhile(/[a-fA-F\d]/)&&t.eat(";"):t.eatWhile(/[\d]/)&&t.eat(";"):t.eatWhile(/[\w\.\-:]/)&&t.eat(";"),o?"atom":"error"}return t.eatWhile(/[^&<]/),null}function a(t,e){var r=t.next();if(">"==r||"/"==r&&t.eat(">"))return e.tokenize=o,y=">"==r?"endTag":"selfcloseTag","tag bracket";if("="==r)return y="equals",null;if("<"==r){e.tokenize=o,e.state=f,e.tagName=e.tagStart=null;var n=e.tokenize(t,e);return n?n+" tag error":"tag error"}return/[\'\"]/.test(r)?(e.tokenize=i(r),e.stringStartCol=t.column(),e.tokenize(t,e)):(t.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function i(t){var e=function(e,r){for(;!e.eol();)if(e.next()==t){r.tokenize=a;break}return"string"};return e.isInAttribute=!0,e}function l(t,e){return function(r,n){for(;!r.eol();){if(r.match(e)){n.tokenize=o;break}r.next()}return t}}function u(t){return function(e,r){for(var n;null!=(n=e.next());){if("<"==n)return r.tokenize=u(t+1),r.tokenize(e,r);if(">"==n){if(1==t){r.tokenize=o;break}return r.tokenize=u(t-1),r.tokenize(e,r)}}return"meta"}}function d(t,e,r){this.prev=t.context,this.tagName=e,this.indent=t.indented,this.startOfLine=r,(C.doNotIndent.hasOwnProperty(e)||t.context&&t.context.noIndent)&&(this.noIndent=!0)}function c(t){t.context&&(t.context=t.context.prev)}function s(t,e){for(var r;;){if(!t.context)return;if(r=t.context.tagName,!C.contextGrabbers.hasOwnProperty(r)||!C.contextGrabbers[r].hasOwnProperty(e))return;c(t)}}function f(t,e,r){return"openTag"==t?(r.tagStart=e.column(),m):"closeTag"==t?g:f}function m(t,e,r){return"word"==t?(r.tagName=e.current(),N="tag",x):(N="error",m)}function g(t,e,r){if("word"==t){var n=e.current();return r.context&&r.context.tagName!=n&&C.implicitlyClosed.hasOwnProperty(r.context.tagName)&&c(r),r.context&&r.context.tagName==n||!1===C.matchClosing?(N="tag",h):(N="tag error",p)}return N="error",p}function h(t,e,r){return"endTag"!=t?(N="error",h):(c(r),f)}function p(t,e,r){return N="error",h(t,e,r)}function x(t,e,r){if("word"==t)return N="attribute",b;if("endTag"==t||"selfcloseTag"==t){var n=r.tagName,o=r.tagStart;return r.tagName=r.tagStart=null,"selfcloseTag"==t||C.autoSelfClosers.hasOwnProperty(n)?s(r,n):(s(r,n),r.context=new d(r,n,o==r.indented)),f}return N="error",x}function b(t,e,r){return"equals"==t?k:(C.allowMissing||(N="error"),x(t,e,r))}function k(t,e,r){return"string"==t?v:"word"==t&&C.allowUnquoted?(N="string",x):(N="error",x(t,e,r))}function v(t,e,r){return"string"==t?v:x(t,e,r)}var w=r.indentUnit,C={},M=n.htmlMode?t:e;for(var z in M)C[z]=M[z];for(var z in n)C[z]=n[z];var y,N;return o.isInText=!0,{startState:function(t){var e={tokenize:o,state:f,indented:t||0,tagName:null,tagStart:null,context:null};return null!=t&&(e.baseIndent=t),e},token:function(t,e){if(!e.tagName&&t.sol()&&(e.indented=t.indentation()),t.eatSpace())return null;y=null;var r=e.tokenize(t,e);return(r||y)&&"comment"!=r&&(N=null,e.state=e.state(y||r,t,e),N&&(r="error"==N?r+" error":N)),r},indent:function(t,e,r){var n=t.context;if(t.tokenize.isInAttribute)return t.tagStart==t.indented?t.stringStartCol+1:t.indented+w;if(n&&n.noIndent)return CodeMirror.Pass;if(t.tokenize!=a&&t.tokenize!=o)return r?r.match(/^(\s*)/)[0].length:0;if(t.tagName)return!1!==C.multilineTagIndentPastTag?t.tagStart+t.tagName.length+2:t.tagStart+w*(C.multilineTagIndentFactor||1);if(C.alignCDATA&&/<!\[CDATA\[/.test(e))return 0;var i=e&&/^<(\/)?([\w_:\.-]*)/.exec(e);if(i&&i[1])for(;n;){if(n.tagName==i[2]){n=n.prev;break}if(!C.implicitlyClosed.hasOwnProperty(n.tagName))break;n=n.prev}else if(i)for(;n;){var l=C.contextGrabbers[n.tagName];if(!l||!l.hasOwnProperty(i[2]))break;n=n.prev}for(;n&&n.prev&&!n.startOfLine;)n=n.prev;return n?n.indent+w:t.baseIndent||0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"\x3c!--",blockCommentEnd:"--\x3e",configuration:C.htmlMode?"html":"xml",helperType:C.htmlMode?"html":"xml",skipAttribute:function(t){t.state==k&&(t.state=x)}}}),CodeMirror.defineMIME("text/xml","xml"),CodeMirror.defineMIME("application/xml","xml"),CodeMirror.mimeModes.hasOwnProperty("text/html")||CodeMirror.defineMIME("text/html",{name:"xml",htmlMode:!0})});