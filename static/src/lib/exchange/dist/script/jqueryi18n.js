!function(k){function n(a,b){k.ajax({url:a,async:!1,cache:b.cache,contentType:"text/plain;charset="+b.encoding,dataType:"text",success:function(a){r(a,b.mode)}})}function r(c,a){for(var b="",e=c.split(/\n/),d=/(\{\d+\})/g,q=/\{(\d+)\}/g,m=/(\\u.{4})/gi,f=0;f<e.length;f++)if(e[f]=e[f].replace(/^\s\s*/,"").replace(/\s\s*$/,""),e[f].length>0&&"#"!=e[f].match("^#")){var g=e[f].split("=");if(g.length>0){for(var o=unescape(g[0]).replace(/^\s\s*/,"").replace(/\s\s*$/,""),h=1==g.length?"":g[1];"\\"==h.match(/\\$/);)h=h.substring(0,h.length-1),h+=e[++f].replace(/\s\s*$/,"");for(var l=2;l<g.length;l++)h+="="+g[l];if(h=h.replace(/^\s\s*/,"").replace(/\s\s*$/,""),"map"==a||"both"==a){if(g=h.match(m))for(l=0;l<g.length;l++)h=h.replace(g[l],s(g[l]));k.i18n.map[o]=h}if("vars"==a||"both"==a)if(h=h.replace(/"/g,'\\"'),t(o),d.test(h)){for(var g=h.split(d),l=!0,j="",n=[],p=0;p<g.length;p++)!d.test(g[p])||0!=n.length&&n.indexOf(g[p])!=-1||(l||(j+=","),j+=g[p].replace(q,"v$1"),n.push(g[p]),l=!1);b+=o+"=function("+j+"){",o='"'+h.replace(q,'"+v$1+"')+'"',b+="return "+o+";};"}else b+=o+'="'+h+'";'}}eval(b)}function t(c){if(/\./.test(c))for(var a="",c=c.split(/\./),b=0;b<c.length;b++)b>0&&(a+="."),a+=c[b],eval("typeof "+a+' == "undefined"')&&eval(a+"={};")}function s(a){var b=[],a=parseInt(a.substr(2),16);a>=0&&a<Math.pow(2,16)&&b.push(a);for(var a="",c=0;c<b.length;++c)a+=String.fromCharCode(b[c]);return a}k.i18n={},k.i18n.map={},k.i18n.properties=function(a){a=k.extend({name:"Messages",language:"",path:"",mode:"vars",cache:!1,encoding:"UTF-8",callback:null},a),null!==a.language&&""!=a.language||(a.language=k.i18n.browserLang()),null===a.language&&(a.language="");var b=a.name&&a.name.constructor==Array?a.name:[a.name];for(i=0;i<b.length;i++)n(a.path+b[i]+".properties",a),a.language.length>=2&&n(a.path+b[i]+"_"+a.language.substring(0,2)+".properties",a),a.language.length>=5&&n(a.path+b[i]+"_"+a.language.substring(0,5)+".properties",a);a.callback&&a.callback()},k.i18n.prop=function(a){var b=k.i18n.map[a];if(null==b)return"["+a+"]";var c;if("string"==typeof b){for(c=0;(c=b.indexOf("\\",c))!=-1;)b="t"==b[c+1]?b.substring(0,c)+"\t"+b.substring(c++ +2):"r"==b[c+1]?b.substring(0,c)+"\r"+b.substring(c++ +2):"n"==b[c+1]?b.substring(0,c)+"\n"+b.substring(c++ +2):"f"==b[c+1]?b.substring(0,c)+"\f"+b.substring(c++ +2):"\\"==b[c+1]?b.substring(0,c)+"\\"+b.substring(c++ +2):b.substring(0,c)+b.substring(c+1);var d,e,f=[];for(c=0;c<b.length;)if("'"==b[c])if(c==b.length-1)b=b.substring(0,c);else if("'"==b[c+1])b=b.substring(0,c)+b.substring(++c);else{for(d=c+2;(d=b.indexOf("'",d))!=-1;){if(d==b.length-1||"'"!=b[d+1]){b=b.substring(0,c)+b.substring(c+1,d)+b.substring(d+1),c=d-1;break}b=b.substring(0,d)+b.substring(++d)}d==-1&&(b=b.substring(0,c)+b.substring(c+1))}else if("{"==b[c])if(d=b.indexOf("}",c+1),d==-1)c++;else if(e=parseInt(b.substring(c+1,d)),!isNaN(e)&&e>=0){var g=b.substring(0,c);""!=g&&f.push(g),f.push(e),c=0,b=b.substring(d+1)}else c=d+1;else c++;""!=b&&f.push(b),b=f,k.i18n.map[a]=f}if(0==b.length)return"";if(1==b.lengh&&"string"==typeof b[0])return b[0];for(g="",c=0;c<b.length;c++)g+="string"==typeof b[c]?b[c]:b[c]+1<arguments.length?arguments[b[c]+1]:"{"+b[c]+"}";return g},k.i18n.browserLang=function(){var a=navigator.language||navigator.userLanguage,a=a.toLowerCase();return a.length>3&&(a=a.substring(0,3)+a.substring(3).toUpperCase()),a};var j;j||(j=function(a,b,c){if("[object RegExp]"!==Object.prototype.toString.call(b))return"undefined"==typeof j._nativeSplit?a.split(b,c):j._nativeSplit.call(a,b,c);var d,e,f,g=[],h=0,i=(b.ignoreCase?"i":"")+(b.multiline?"m":"")+(b.sticky?"y":""),b=RegExp(b.source,i+"g");if(a+="",j._compliantExecNpcg||(d=RegExp("^"+b.source+"$(?!\\s)",i)),void 0===c||+c<0)c=1/0;else if(c=Math.floor(+c),!c)return[];for(;(e=b.exec(a))&&(i=e.index+e[0].length,!(i>h&&(g.push(a.slice(h,e.index)),!j._compliantExecNpcg&&e.length>1&&e[0].replace(d,function(){for(var a=1;a<arguments.length-2;a++)void 0===arguments[a]&&(e[a]=void 0)}),e.length>1&&e.index<a.length&&Array.prototype.push.apply(g,e.slice(1)),f=e[0].length,h=i,g.length>=c)));)b.lastIndex===e.index&&b.lastIndex++;return h===a.length?(f||!b.test(""))&&g.push(""):g.push(a.slice(h)),g.length>c?g.slice(0,c):g},j._compliantExecNpcg=void 0===/()??/.exec("")[1],j._nativeSplit=String.prototype.split),String.prototype.split=function(a,b){return j(this,a,b)}}(jQuery);