define(function(require,exports,module){function r(r,e,i,d){function l(o){var n=t(r,e);if(!n||n.to.line-n.from.line<f)return null;for(var i=r.findMarksAt(n.from),l=0;l<i.length;++l)if(i[l].__isFold&&"fold"!==d){if(!o)return null;n.cleared=!0,i[l].clear()}return n}if(i&&i.call){var t=i;i=null}else var t=n(r,i,"rangeFinder");"number"==typeof e&&(e=CodeMirror.Pos(e,0));var f=n(r,i,"minFoldSize"),a=l(!0);if(n(r,i,"scanUp"))for(;!a&&e.line>r.firstLine();)e=CodeMirror.Pos(e.line-1,0),a=l(!1);if(a&&!a.cleared&&"unfold"!==d){var u=o(r,i);CodeMirror.on(u,"mousedown",function(r){c.clear(),CodeMirror.e_preventDefault(r)});var c=r.markText(a.from,a.to,{replacedWith:u,clearOnEnter:n(r,i,"clearOnEnter"),__isFold:!0});c.on("clear",function(o,n){CodeMirror.signal(r,"unfold",r,o,n)}),CodeMirror.signal(r,"fold",r,a.from,a.to)}}function o(r,o){var e=n(r,o,"widget");if("string"==typeof e){var i=document.createTextNode(e);e=document.createElement("span"),e.appendChild(i),e.className="CodeMirror-foldmarker"}return e}function n(r,o,n){if(o&&void 0!==o[n])return o[n];var i=r.options.foldOptions;return i&&void 0!==i[n]?i[n]:e[n]}require("lib/codeonline/lib/codemirror.js"),CodeMirror.newFoldFunction=function(o,n){return function(e,i){r(e,i,{rangeFinder:o,widget:n})}},CodeMirror.defineExtension("foldCode",function(o,n,e){r(this,o,n,e)}),CodeMirror.defineExtension("isFolded",function(r){for(var o=this.findMarksAt(r),n=0;n<o.length;++n)if(o[n].__isFold)return!0}),CodeMirror.commands.toggleFold=function(r){r.foldCode(r.getCursor())},CodeMirror.commands.fold=function(r){r.foldCode(r.getCursor(),null,"fold")},CodeMirror.commands.unfold=function(r){r.foldCode(r.getCursor(),null,"unfold")},CodeMirror.commands.foldAll=function(r){r.operation(function(){for(var o=r.firstLine(),n=r.lastLine();o<=n;o++)r.foldCode(CodeMirror.Pos(o,0),null,"fold")})},CodeMirror.commands.unfoldAll=function(r){r.operation(function(){for(var o=r.firstLine(),n=r.lastLine();o<=n;o++)r.foldCode(CodeMirror.Pos(o,0),null,"unfold")})},CodeMirror.registerHelper("fold","combine",function(){var r=Array.prototype.slice.call(arguments,0);return function(o,n){for(var e=0;e<r.length;++e){var i=r[e](o,n);if(i)return i}}}),CodeMirror.registerHelper("fold","auto",function(r,o){for(var n=r.getHelpers(o,"fold"),e=0;e<n.length;e++){var i=n[e](r,o);if(i)return i}});var e={rangeFinder:CodeMirror.fold.auto,widget:"↔",minFoldSize:0,scanUp:!1,clearOnEnter:!0};CodeMirror.defineOption("foldOptions",null),CodeMirror.defineExtension("foldOption",function(r,o){return n(this,r,o)})});