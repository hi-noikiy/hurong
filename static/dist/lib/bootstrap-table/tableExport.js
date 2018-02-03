!function($){$.fn.extend({tableExport:function(t){function e(t){var e=[];return $(t).find("thead").first().find("th").each(function(t,o){void 0!==$(o).attr("data-field")?e[t]=$(o).attr("data-field"):e[t]=t.toString()}),e}function o(t,e){var o=!1;return E.ignoreColumn.length>0&&("string"==typeof E.ignoreColumn[0]?P.length>e&&void 0!==P[e]&&-1!=$.inArray(P[e],E.ignoreColumn)&&(o=!0):"number"==typeof E.ignoreColumn[0]&&(-1==$.inArray(e,E.ignoreColumn)&&-1==$.inArray(e-t.length,E.ignoreColumn)||(o=!0))),o}function n(t,e,n,i,a){if(-1==$.inArray(n,E.ignoreRow)&&-1==$.inArray(n-i,E.ignoreRow)){var r=$(t).filter(function(){return"none"!=$(this).data("tableexport-display")&&($(this).is(":visible")||"always"==$(this).data("tableexport-display")||"always"==$(this).closest("table").data("tableexport-display"))}).find(e),l=0,s=0;if(r.each(function(t){if(("always"==$(this).data("tableexport-display")||"none"!=$(this).css("display")&&"hidden"!=$(this).css("visibility")&&"none"!=$(this).data("tableexport-display"))&&!1===o(r,t)&&"function"==typeof a){var e,i,h=0,c=0;if(void 0!==T[n]&&T[n].length>0)for(e=0;e<=t;e++)void 0!==T[n][e]&&(a(null,n,e),delete T[n][e],t++);for(s=t,$(this).is("[colspan]")&&(h=parseInt($(this).attr("colspan")),l+=h>0?h-1:0),$(this).is("[rowspan]")&&(c=parseInt($(this).attr("rowspan"))),a(this,n,t),e=0;e<h-1;e++)a(null,n,t+e);if(c)for(i=1;i<c;i++)for(void 0===T[n+i]&&(T[n+i]=[]),T[n+i][t+l]="",e=1;e<h;e++)T[n+i][t+l-e]=""}}),void 0!==T[n]&&T[n].length>0)for(var h=0;h<=T[n].length;h++)void 0!==T[n][h]&&(a(null,n,h),delete T[n][h])}}function i(t){if(!0===E.consoleLog&&console.log(t.output()),"string"===E.outputMode)return t.output();if("base64"===E.outputMode)return A(t.output());if("window"===E.outputMode)return void window.open(URL.createObjectURL(t.output("blob")));try{var e=t.output("blob");saveAs(e,E.fileName+".pdf")}catch(e){S(E.fileName+".pdf","data:application/pdf;base64,",t.output())}}function a(t,e,o){var n=0;if(void 0!==o&&(n=o.colspan),n>=0){for(var i=t.width,a=t.textPos.x,r=e.table.columns.indexOf(e.column),l=1;l<n;l++){i+=e.table.columns[r+l].width}if(n>1&&("right"===t.styles.halign?a=t.textPos.x+i-t.width:"center"===t.styles.halign&&(a=t.textPos.x+(i-t.width)/2)),t.width=i,t.textPos.x=a,void 0!==o&&o.rowspan>1&&(t.height=t.height*o.rowspan),"middle"===t.styles.valign||"bottom"===t.styles.valign){var s="string"==typeof t.text?t.text.split(/\r\n|\r|\n/g):t.text,h=s.length||1;h>2&&(t.textPos.y-=(2-k)/2*e.row.styles.fontSize*(h-2)/3)}return!0}return!1}function r(t,e,o){void 0!==o.images&&e.each(function(){var e=$(this).children();if($(this).is("img")){var n=x(this.src);o.images[n]={url:this.src,src:this.src}}void 0!==e&&e.length>0&&r(t,e,o)})}function l(t,e,o){e.each(function(){var e=$(this).children();if($(this).is("div")){var n=p(y(this,"background-color"),[255,255,255]),i=p(y(this,"border-top-color"),[0,0,0]),a=v(this,"border-top-width",E.jspdf.unit),r=this.getBoundingClientRect(),s=this.offsetLeft*o.dw,h=this.offsetTop*o.dh,c=r.width*o.dw,d=r.height*o.dh;o.doc.setDrawColor.apply(void 0,i),o.doc.setFillColor.apply(void 0,n),o.doc.setLineWidth(a),o.doc.rect(t.x+s,t.y+h,c,d,a?"FD":"F")}else if($(this).is("img")&&void 0!==o.images){var f=x(this.src),u=o.images[f];if(void 0!==u){var g=t.width/t.height,m=this.width/this.height,b=t.width,w=t.height,h=0;m<g?(w=Math.min(t.height,this.height),b=this.width*w/this.height):m>g&&(b=Math.min(t.width,this.width),w=this.height*b/this.width),w<t.height&&(h=(t.height-w)/2),o.doc.addImage(u.src,t.textPos.x,t.y+h,b,w),t.textPos.x+=b}}void 0!==e&&e.length>0&&l(t,e,o)})}function s(t){return t.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function h(t,e,o){return t.replace(new RegExp(s(e),"g"),o)}function c(t,e,o){var n="";if(null!==t){var i=f(t,e,o),a=null===i||""===i?"":i.toString();i instanceof Date?n=E.csvEnclosure+i.toLocaleString()+E.csvEnclosure:(n=h(a,E.csvEnclosure,E.csvEnclosure+E.csvEnclosure),(n.indexOf(E.csvSeparator)>=0||/[\r\n ]/g.test(n))&&(n=E.csvEnclosure+n+E.csvEnclosure))}return n}function d(t){return t=t||"0",t=h(t,E.numbers.html.decimalMark,"."),("number"==typeof(t=h(t,E.numbers.html.thousandsSeparator,""))||!1!==jQuery.isNumeric(t))&&t}function f(t,e,o){var n="";if(null!==t){var i,a=$(t);if(a[0].hasAttribute("data-tableexport-value"))i=a.data("tableexport-value");else if(""!=(i=a.html())){var r=$.parseHTML(i);i="",$.each(r,function(){if($(this).is("input"))i+=a.find("input").val();else{if(!$(this).is("select"))return i+=a.html(),!1;i+=a.find("select option:selected").text()}})}if("function"==typeof E.onCellHtmlData&&(i=E.onCellHtmlData(a,e,o,i)),!0===E.htmlContent)n=$.trim(i);else{var l=i.replace(/\n/g,"\u2028").replace(/<br\s*[\/]?>/gi,"⁠"),s=$("<div/>").html(l).contents();if(l="",$.each(s.text().split("\u2028"),function(t,e){t>0&&(l+=" "),l+=$.trim(e)}),$.each(l.split("⁠"),function(t,e){t>0&&(n+="\n"),n+=$.trim(e).replace(/\u00AD/g,"")}),E.numbers.html.decimalMark!=E.numbers.output.decimalMark||E.numbers.html.thousandsSeparator!=E.numbers.output.thousandsSeparator){var h=d(n);if(!1!==h){var c=(""+h).split(".");1==c.length&&(c[1]="");var f=c[0].length>3?c[0].length%3:0;n=(h<0?"-":"")+(E.numbers.output.thousandsSeparator?(f?c[0].substr(0,f)+E.numbers.output.thousandsSeparator:"")+c[0].substr(f).replace(/(\d{3})(?=\d)/g,"$1"+E.numbers.output.thousandsSeparator):c[0])+(c[1].length?E.numbers.output.decimalMark+c[1]:"")}}}!0===E.escape&&(n=escape(n)),"function"==typeof E.onCellData&&(n=E.onCellData(a,e,o,n))}return n}function u(t,e,o){return e+"-"+o.toLowerCase()}function p(t,e){var o=/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,n=o.exec(t),i=e;return n&&(i=[parseInt(n[1]),parseInt(n[2]),parseInt(n[3])]),i}function g(t){var e=y(t,"text-align"),o=y(t,"font-weight"),n=y(t,"font-style"),i="";"start"==e&&(e="rtl"==y(t,"direction")?"right":"left"),o>=700&&(i="bold"),"italic"==n&&(i+=n),""===i&&(i="normal");var a={style:{align:e,bcolor:p(y(t,"background-color"),[255,255,255]),color:p(y(t,"color"),[0,0,0]),fstyle:i},colspan:parseInt($(t).attr("colspan"))||0,rowspan:parseInt($(t).attr("rowspan"))||0};if(null!==t){var r=t.getBoundingClientRect();a.rect={width:r.width,height:r.height}}return a}function y(t,e){try{return window.getComputedStyle?(e=e.replace(/([a-z])([A-Z])/,u),window.getComputedStyle(t,null).getPropertyValue(e)):t.currentStyle?t.currentStyle[e]:t.style[e]}catch(t){}return""}function m(t,e,o){var n=document.createElement("div");n.style.overflow="hidden",n.style.visibility="hidden",t.appendChild(n),n.style.width=100+o;var i=100/n.offsetWidth;return t.removeChild(n),e*i}function v(t,e,o){var n=y(t,e),i=n.match(/\d+/);return null!==i?(i=i[0],m(t.parentElement,i,o)):0}function b(){if(!(this instanceof b))return new b;this.SheetNames=[],this.Sheets={}}function w(t,e){return e&&(t+=1462),(Date.parse(t)-new Date(Date.UTC(1899,11,30)))/864e5}function x(t){var e,o,n,i=0;if(0===t.length)return i;for(e=0,n=t.length;e<n;e++)o=t.charCodeAt(e),i=(i<<5)-i+o,i|=0;return i}function S(t,e,o){var n=window.navigator.userAgent;if(!1!==t&&(n.indexOf("MSIE ")>0||n.match(/Trident.*rv\:11\./)))if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(new Blob([o]),t);else{var i=document.createElement("iframe");i&&(document.body.appendChild(i),i.setAttribute("style","display:none"),i.contentDocument.open("txt/html","replace"),i.contentDocument.write(o),i.contentDocument.close(),i.focus(),i.contentDocument.execCommand("SaveAs",!0,t),document.body.removeChild(i))}else{var a=document.createElement("a");a&&(a.style.display="none",!1!==t?a.download=t:a.target="_blank",e.toLowerCase().indexOf("base64,")>=0?a.href=e+A(o):a.href=e+encodeURIComponent(o),document.body.appendChild(a),document.createEvent?(null===M&&(M=document.createEvent("MouseEvents")),M.initEvent("click",!0,!1),a.dispatchEvent(M)):document.createEventObject?a.fireEvent("onclick"):"function"==typeof a.onclick&&a.onclick(),document.body.removeChild(a))}}function C(t){t=t.replace(/\x0d\x0a/g,"\n");for(var e="",o=0;o<t.length;o++){var n=t.charCodeAt(o);n<128?e+=String.fromCharCode(n):n>127&&n<2048?(e+=String.fromCharCode(n>>6|192),e+=String.fromCharCode(63&n|128)):(e+=String.fromCharCode(n>>12|224),e+=String.fromCharCode(n>>6&63|128),e+=String.fromCharCode(63&n|128))}return e}function A(t){var e,o,n,i,a,r,l,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",h="",c=0;for(t=C(t);c<t.length;)e=t.charCodeAt(c++),o=t.charCodeAt(c++),n=t.charCodeAt(c++),i=e>>2,a=(3&e)<<4|o>>4,r=(15&o)<<2|n>>6,l=63&n,isNaN(o)?r=l=64:isNaN(n)&&(l=64),h=h+s.charAt(i)+s.charAt(a)+s.charAt(r)+s.charAt(l);return h}var N,E={consoleLog:!1,csvEnclosure:'"',csvSeparator:",",csvUseBOM:!0,displayTableName:!1,escape:!1,excelstyles:[],fileName:"tableExport",htmlContent:!1,ignoreColumn:[],ignoreRow:[],jsonScope:"all",jspdf:{orientation:"p",unit:"pt",format:"a4",margins:{left:20,right:10,top:10,bottom:10},autotable:{styles:{cellPadding:2,rowHeight:12,fontSize:8,fillColor:255,textColor:50,fontStyle:"normal",overflow:"ellipsize",halign:"left",valign:"middle"},headerStyles:{fillColor:[52,73,94],textColor:255,fontStyle:"bold",halign:"center"},alternateRowStyles:{fillColor:245},tableExport:{onAfterAutotable:null,onBeforeAutotable:null,onTable:null,outputImages:!0}}},numbers:{html:{decimalMark:".",thousandsSeparator:","},output:{decimalMark:".",thousandsSeparator:","}},onCellData:null,onCellHtmlData:null,outputMode:"file",pdfmake:{enabled:!1},tbodySelector:"tr",tfootSelector:"tr",theadSelector:"tr",tableName:"myTableName",type:"csv",worksheetName:"xlsWorksheetName"},k=1.15,j=this,M=null,O=[],L=[],D=0,T=[],B="",P=[];if($.extend(!0,E,t),P=e(j),"csv"==E.type||"txt"==E.type){var R="",I=0;D=0;var U=function(t,e,o){return t.each(function(){B="",n(this,e,D,o+t.length,function(t,e,o){B+=c(t,e,o)+E.csvSeparator}),B=$.trim(B).substring(0,B.length-1),B.length>0&&(R.length>0&&(R+="\n"),R+=B),D++}),t.length};if(I+=U($(j).find("thead").first().find(E.theadSelector),"th,td",I),$(j).find("tbody").each(function(){I+=U($(this).find(E.tbodySelector),"td,th",I)}),E.tfootSelector.length&&U($(j).find("tfoot").first().find(E.tfootSelector),"td,th",I),R+="\n",!0===E.consoleLog&&console.log(R),"string"===E.outputMode)return R;if("base64"===E.outputMode)return A(R);if("window"===E.outputMode)return void S(!1,"data:text/"+("csv"==E.type?"csv":"plain")+";charset=utf-8,",R);try{N=new Blob([R],{type:"text/"+("csv"==E.type?"csv":"plain")+";charset=utf-8"}),saveAs(N,E.fileName+"."+E.type,"csv"!=E.type||!1===E.csvUseBOM)}catch(t){S(E.fileName+"."+E.type,"data:text/"+("csv"==E.type?"csv":"plain")+";charset=utf-8,"+("csv"==E.type&&E.csvUseBOM?"\ufeff":""),R)}}else if("sql"==E.type){D=0;var H="INSERT INTO `"+E.tableName+"` (";if(O=$(j).find("thead").first().find(E.theadSelector),O.each(function(){n(this,"th,td",D,O.length,function(t,e,o){H+="'"+f(t,e,o)+"',"}),D++,H=$.trim(H),H=$.trim(H).substring(0,H.length-1)}),H+=") VALUES ",$(j).find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,$(j).find("tfoot").find(E.tfootSelector)),$(L).each(function(){B="",n(this,"td,th",D,O.length+L.length,function(t,e,o){B+="'"+f(t,e,o)+"',"}),B.length>3&&(H+="("+B,H=$.trim(H).substring(0,H.length-1),H+="),"),D++}),H=$.trim(H).substring(0,H.length-1),H+=";",!0===E.consoleLog&&console.log(H),"string"===E.outputMode)return H;if("base64"===E.outputMode)return A(H);try{N=new Blob([H],{type:"text/plain;charset=utf-8"}),saveAs(N,E.fileName+".sql")}catch(t){S(E.fileName+".sql","data:application/sql;charset=utf-8,",H)}}else if("json"==E.type){var W=[];O=$(j).find("thead").first().find(E.theadSelector),O.each(function(){var t=[];n(this,"th,td",D,O.length,function(e,o,n){t.push(f(e,o,n))}),W.push(t)});var F=[];$(j).find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,$(j).find("tfoot").find(E.tfootSelector)),$(L).each(function(){var t={},e=0;n(this,"td,th",D,O.length+L.length,function(o,n,i){W.length?t[W[W.length-1][e]]=f(o,n,i):t[e]=f(o,n,i),e++}),!1===$.isEmptyObject(t)&&F.push(t),D++});var K="";if(K="head"==E.jsonScope?JSON.stringify(W):"data"==E.jsonScope?JSON.stringify(F):JSON.stringify({header:W,data:F}),!0===E.consoleLog&&console.log(K),"string"===E.outputMode)return K;if("base64"===E.outputMode)return A(K);try{N=new Blob([K],{type:"application/json;charset=utf-8"}),saveAs(N,E.fileName+".json")}catch(t){S(E.fileName+".json","data:application/json;charset=utf-8;base64,",K)}}else if("xml"===E.type){D=0;var X='<?xml version="1.0" encoding="utf-8"?>';X+="<tabledata><fields>",O=$(j).find("thead").first().find(E.theadSelector),O.each(function(){n(this,"th,td",D,O.length,function(t,e,o){X+="<field>"+f(t,e,o)+"</field>"}),D++}),X+="</fields><data>";var z=1;if($(j).find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,$(j).find("tfoot").find(E.tfootSelector)),$(L).each(function(){var t=1;B="",n(this,"td,th",D,O.length+L.length,function(e,o,n){B+="<column-"+t+">"+f(e,o,n)+"</column-"+t+">",t++}),B.length>0&&"<column-1></column-1>"!=B&&(X+='<row id="'+z+'">'+B+"</row>",z++),D++}),X+="</data></tabledata>",!0===E.consoleLog&&console.log(X),"string"===E.outputMode)return X;if("base64"===E.outputMode)return A(X);try{N=new Blob([X],{type:"application/xml;charset=utf-8"}),saveAs(N,E.fileName+".xml")}catch(t){S(E.fileName+".xml","data:application/xml;charset=utf-8;base64,",X)}}else if("excel"==E.type||"xls"==E.type||"word"==E.type||"doc"==E.type){var q="excel"==E.type||"xls"==E.type?"excel":"word",J="excel"==q?"xls":"doc",_='xmlns:x="urn:schemas-microsoft-com:office:'+q+'"',Q=$(j).filter(function(){return"none"!=$(this).data("tableexport-display")&&($(this).is(":visible")||"always"==$(this).data("tableexport-display"))}),V="";Q.each(function(){var t=$(this);D=0,P=e(this),V+="<table><thead>",O=t.find("thead").first().find(E.theadSelector),O.each(function(){B="",n(this,"th,td",D,O.length,function(t,e,o){if(null!==t){var n="";B+="<th";for(var i in E.excelstyles)if(E.excelstyles.hasOwnProperty(i)){var a=$(t).css(E.excelstyles[i]);""!==a&&"0px none rgb(0, 0, 0)"!=a&&"rgba(0, 0, 0, 0)"!=a&&(n+=""===n?'style="':";",n+=E.excelstyles[i]+":"+a)}""!==n&&(B+=" "+n+'"'),$(t).is("[colspan]")&&(B+=' colspan="'+$(t).attr("colspan")+'"'),$(t).is("[rowspan]")&&(B+=' rowspan="'+$(t).attr("rowspan")+'"'),B+=">"+f(t,e,o)+"</th>"}}),B.length>0&&(V+="<tr>"+B+"</tr>"),D++}),V+="</thead><tbody>",t.find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,t.find("tfoot").find(E.tfootSelector)),$(L).each(function(){var t=$(this);B="",n(this,"td,th",D,O.length+L.length,function(e,o,n){if(null!==e){var i="",a=$(e).data("tableexport-msonumberformat");void 0===a&&"function"==typeof E.onMsoNumberFormat&&(a=E.onMsoNumberFormat(e,o,n)),void 0!==a&&""!==a&&(i="style=\"mso-number-format:'"+a+"'");for(var r in E.excelstyles)E.excelstyles.hasOwnProperty(r)&&(a=$(e).css(E.excelstyles[r]),""===a&&(a=t.css(E.excelstyles[r])),""!==a&&"0px none rgb(0, 0, 0)"!=a&&"rgba(0, 0, 0, 0)"!=a&&(i+=""===i?'style="':";",i+=E.excelstyles[r]+":"+a));B+="<td",""!==i&&(B+=" "+i+'"'),$(e).is("[colspan]")&&(B+=' colspan="'+$(e).attr("colspan")+'"'),$(e).is("[rowspan]")&&(B+=' rowspan="'+$(e).attr("rowspan")+'"'),B+=">"+f(e,o,n).replace(/\n/g,"<br>")+"</td>"}}),B.length>0&&(V+="<tr>"+B+"</tr>"),D++}),E.displayTableName&&(V+="<tr><td></td></tr><tr><td></td></tr><tr><td>"+f($("<p>"+E.tableName+"</p>"))+"</td></tr>"),V+="</tbody></table>",!0===E.consoleLog&&console.log(V)});var Y='<html xmlns:o="urn:schemas-microsoft-com:office:office" '+_+' xmlns="http://www.w3.org/TR/REC-html40">';if(Y+='<meta http-equiv="content-type" content="application/vnd.ms-'+q+'; charset=UTF-8">',Y+="<head>","excel"===q&&(Y+="\x3c!--[if gte mso 9]>",Y+="<xml>",Y+="<x:ExcelWorkbook>",Y+="<x:ExcelWorksheets>",Y+="<x:ExcelWorksheet>",Y+="<x:Name>",Y+=E.worksheetName,Y+="</x:Name>",Y+="<x:WorksheetOptions>",Y+="<x:DisplayGridlines/>",Y+="</x:WorksheetOptions>",Y+="</x:ExcelWorksheet>",Y+="</x:ExcelWorksheets>",Y+="</x:ExcelWorkbook>",Y+="</xml>",Y+="<![endif]--\x3e"),Y+="<style>br {mso-data-placement:same-cell;}</style>",Y+="</head>",Y+="<body>",Y+=V,Y+="</body>",Y+="</html>",!0===E.consoleLog&&console.log(Y),"string"===E.outputMode)return Y;if("base64"===E.outputMode)return A(Y);try{N=new Blob([Y],{type:"application/vnd.ms-"+E.type}),saveAs(N,E.fileName+"."+J)}catch(t){S(E.fileName+"."+J,"data:application/vnd.ms-"+q+";base64,",Y)}}else if("xlsx"==E.type){var G=[],Z=[];D=0,L=$(j).find("thead").first().find(E.theadSelector),$(j).find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,$(j).find("tfoot").find(E.tfootSelector)),$(L).each(function(){var t=[];n(this,"th,td",D,L.length,function(e,o,n){if(void 0!==e&&null!==e){var i=parseInt(e.getAttribute("colspan")),a=parseInt(e.getAttribute("rowspan")),r=f(e,o,n);if(""!==r&&r==+r&&(r=+r),Z.forEach(function(e){if(D>=e.s.r&&D<=e.e.r&&t.length>=e.s.c&&t.length<=e.e.c)for(var o=0;o<=e.e.c-e.s.c;++o)t.push(null)}),(a||i)&&(a=a||1,i=i||1,Z.push({s:{r:D,c:t.length},e:{r:D+a-1,c:t.length+i-1}})),t.push(""!==r?r:null),i)for(var l=0;l<i-1;++l)t.push(null)}}),G.push(t),D++});var tt=new b,et=function(t){for(var e={},o={s:{c:1e7,r:1e7},e:{c:0,r:0}},n=0;n!=t.length;++n)for(var i=0;i!=t[n].length;++i){o.s.r>n&&(o.s.r=n),o.s.c>i&&(o.s.c=i),o.e.r<n&&(o.e.r=n),o.e.c<i&&(o.e.c=i);var a={v:t[n][i]};if(null!==a.v){var r=XLSX.utils.encode_cell({c:i,r:n});"number"==typeof a.v?a.t="n":"boolean"==typeof a.v?a.t="b":a.v instanceof Date?(a.t="n",a.z=XLSX.SSF._table[14],a.v=w(a.v)):a.t="s",e[r]=a}}return o.s.c<1e7&&(e["!ref"]=XLSX.utils.encode_range(o)),e}(G);et["!merges"]=Z,tt.SheetNames.push(E.worksheetName),tt.Sheets[E.worksheetName]=et;var ot=XLSX.write(tt,{bookType:E.type,bookSST:!1,type:"binary"});try{N=new Blob([function(t){for(var e=new ArrayBuffer(t.length),o=new Uint8Array(e),n=0;n!=t.length;++n)o[n]=255&t.charCodeAt(n);return e}(ot)],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8"}),saveAs(N,E.fileName+"."+E.type)}catch(t){S(E.fileName+"."+E.type,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8",G)}}else if("png"==E.type)html2canvas($(j)[0]).then(function(t){for(var e=t.toDataURL(),o=atob(e.substring(22)),n=new ArrayBuffer(o.length),i=new Uint8Array(n),a=0;a<o.length;a++)i[a]=o.charCodeAt(a);if(!0===E.consoleLog&&console.log(o),"string"===E.outputMode)return o;if("base64"===E.outputMode)return A(e);if("window"===E.outputMode)return void window.open(e);try{N=new Blob([n],{type:"image/png"}),saveAs(N,E.fileName+".png")}catch(t){S(E.fileName+".png","data:image/png,",e)}});else if("pdf"==E.type)if(!0===E.pdfmake.enabled){var nt=[],it=[];D=0,O=$(this).find("thead").first().find(E.theadSelector),O.each(function(){var t=[];n(this,"th,td",D,O.length,function(e,o,n){t.push(f(e,o,n))}),t.length&&it.push(t);for(var e=nt.length;e<t.length;e++)nt.push("*");D++}),$(this).find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,$(this).find("tfoot").find(E.tfootSelector)),$(L).each(function(){var t=[];n(this,"td,th",D,O.length+L.length,function(e,o,n){t.push(f(e,o,n))}),t.length&&it.push(t),D++});var at={pageOrientation:"landscape",content:[{table:{headerRows:O.length,widths:nt,body:it}}]};pdfMake.createPdf(at).getBuffer(function(t){try{var e=new Blob([t],{type:"application/pdf"});saveAs(e,E.fileName+".pdf")}catch(e){S(E.fileName+".pdf","data:application/pdf;base64,",t)}})}else if(!1===E.jspdf.autotable){var rt={dim:{w:v($(j).first().get(0),"width","mm"),h:v($(j).first().get(0),"height","mm")},pagesplit:!1},lt=new jsPDF(E.jspdf.orientation,E.jspdf.unit,E.jspdf.format);lt.addHTML($(j).first(),E.jspdf.margins.left,E.jspdf.margins.top,rt,function(){i(lt)})}else{var st=E.jspdf.autotable.tableExport;if("string"==typeof E.jspdf.format&&"bestfit"===E.jspdf.format.toLowerCase()){var ht={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89]},ct="",dt="",ft=0;$(j).filter(":visible").each(function(){if("none"!=$(this).css("display")){var t=v($(this).get(0),"width","pt");if(t>ft){t>ht.a0[0]&&(ct="a0",dt="l");for(var e in ht)ht.hasOwnProperty(e)&&ht[e][1]>t&&(ct=e,dt="l",ht[e][0]>t&&(dt="p"));ft=t}}}),E.jspdf.format=""===ct?"a4":ct,E.jspdf.orientation=""===dt?"w":dt}st.doc=new jsPDF(E.jspdf.orientation,E.jspdf.unit,E.jspdf.format),!0===st.outputImages&&(st.images={}),void 0!==st.images&&($(j).filter(function(){return"none"!=$(this).data("tableexport-display")&&($(this).is(":visible")||"always"==$(this).data("tableexport-display"))}).each(function(){var t=0;O=$(this).find("thead").find(E.theadSelector),$(this).find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,$(this).find("tfoot").find(E.tfootSelector)),$(L).each(function(){n(this,"td,th",O.length+t,O.length+L.length,function(t,e,o){if(void 0!==t&&null!==t){var n=$(t).children();void 0!==n&&n.length>0&&r(t,n,st)}}),t++})}),O=[],L=[]),function(t,e){function o(){e(i)}var n,i=0,a=0;if(void 0!==t.images)for(n in t.images)t.images.hasOwnProperty(n)&&function(t){if(t.url){var e=new Image;i=++a,e.crossOrigin="Anonymous",e.onerror=e.onload=function(){if(e.complete&&(0===e.src.indexOf("data:image/")&&(e.width=t.width||e.width||0,e.height=t.height||e.height||0),e.width+e.height)){var n=document.createElement("canvas"),i=n.getContext("2d");n.width=e.width,n.height=e.height,i.drawImage(e,0,0),t.src=n.toDataURL("image/jpeg")}--a||o()},e.src=t.url}}(t.images[n]);a||o()}(st,function(t){$(j).filter(function(){return"none"!=$(this).data("tableexport-display")&&($(this).is(":visible")||"always"==$(this).data("tableexport-display"))}).each(function(){var t,o=0;if(P=e(this),st.columns=[],st.rows=[],st.rowoptions={},"function"==typeof st.onTable&&!1===st.onTable($(this),E))return!0;E.jspdf.autotable.tableExport=null;var i=$.extend(!0,{},E.jspdf.autotable);E.jspdf.autotable.tableExport=st,i.margin={},$.extend(!0,i.margin,E.jspdf.margins),i.tableExport=st,"function"!=typeof i.beforePageContent&&(i.beforePageContent=function(t){if(1==t.pageCount){t.table.rows.concat(t.table.headerRow).forEach(function(e){e.height>0&&(e.height+=(2-k)/2*e.styles.fontSize,t.table.height+=(2-k)/2*e.styles.fontSize)})}}),"function"!=typeof i.createdHeaderCell&&(i.createdHeaderCell=function(t,e){if(t.styles=$.extend({},e.row.styles),void 0!==st.columns[e.column.dataKey]){var o=st.columns[e.column.dataKey];if(void 0!==o.rect){var n;t.contentWidth=o.rect.width,void 0!==st.heightRatio&&0!==st.heightRatio||(n=e.row.raw[e.column.dataKey].rowspan?e.row.raw[e.column.dataKey].rect.height/e.row.raw[e.column.dataKey].rowspan:e.row.raw[e.column.dataKey].rect.height,st.heightRatio=t.styles.rowHeight/n),n=e.row.raw[e.column.dataKey].rect.height*st.heightRatio,n>t.styles.rowHeight&&(t.styles.rowHeight=n)}void 0!==o.style&&!0!==o.style.hidden&&(t.styles.halign=o.style.align,"inherit"===i.styles.fillColor&&(t.styles.fillColor=o.style.bcolor),"inherit"===i.styles.textColor&&(t.styles.textColor=o.style.color),"inherit"===i.styles.fontStyle&&(t.styles.fontStyle=o.style.fstyle))}}),"function"!=typeof i.createdCell&&(i.createdCell=function(t,e){var o=st.rowoptions[e.row.index+":"+e.column.dataKey];void 0!==o&&void 0!==o.style&&!0!==o.style.hidden&&(t.styles.halign=o.style.align,"inherit"===i.styles.fillColor&&(t.styles.fillColor=o.style.bcolor),"inherit"===i.styles.textColor&&(t.styles.textColor=o.style.color),"inherit"===i.styles.fontStyle&&(t.styles.fontStyle=o.style.fstyle))}),"function"!=typeof i.drawHeaderCell&&(i.drawHeaderCell=function(t,e){var o=st.columns[e.column.dataKey];return(!0!==o.style.hasOwnProperty("hidden")||!0!==o.style.hidden)&&o.rowIndex>=0&&a(t,e,o)}),"function"!=typeof i.drawCell&&(i.drawCell=function(t,e){var o=st.rowoptions[e.row.index+":"+e.column.dataKey];if(a(t,e,o)){if(st.doc.rect(t.x,t.y,t.width,t.height,t.styles.fillStyle),void 0!==o&&void 0!==o.kids&&o.kids.length>0){var n=t.height/o.rect.height;(n>st.dh||void 0===st.dh)&&(st.dh=n),st.dw=t.width/o.rect.width,l(t,o.kids,st)}st.doc.autoTableText(t.text,t.textPos.x,t.textPos.y,{halign:t.styles.halign,valign:t.styles.valign})}return!1}),st.headerrows=[],O=$(this).find("thead").find(E.theadSelector),O.each(function(){t=0,st.headerrows[o]=[],n(this,"th,td",o,O.length,function(e,n,i){var a=g(e);a.title=f(e,n,i),a.key=t++,a.rowIndex=o,st.headerrows[o].push(a)}),o++}),o>0&&$.each(st.headerrows[o-1],function(){var t=this;o>1&&null===this.rect&&(t=st.headerrows[o-2][this.key]),null!==t&&st.columns.push(t)});var r=0;L=[],$(this).find("tbody").each(function(){L.push.apply(L,$(this).find(E.tbodySelector))}),E.tfootSelector.length&&L.push.apply(L,$(this).find("tfoot").find(E.tfootSelector)),$(L).each(function(){var e=[];t=0,n(this,"td,th",o,O.length+L.length,function(o,n,i){if(void 0===st.columns[t]){var a={title:"",key:t,style:{hidden:!0}};st.columns.push(a)}if(void 0!==o&&null!==o){var a=g(o);a.kids=$(o).children(),st.rowoptions[r+":"+t++]=a}else{var a=$.extend(!0,{},st.rowoptions[r+":"+(t-1)]);a.colspan=-1,st.rowoptions[r+":"+t++]=a}e.push(f(o,n,i))}),e.length&&(st.rows.push(e),r++),o++}),"function"==typeof st.onBeforeAutotable&&st.onBeforeAutotable($(this),st.columns,st.rows,i),st.doc.autoTable(st.columns,st.rows,i),"function"==typeof st.onAfterAutotable&&st.onAfterAutotable($(this),i),E.jspdf.autotable.startY=st.doc.autoTableEndPosY()+i.margin.top}),i(st.doc),void 0!==st.headerrows&&(st.headerrows.length=0),void 0!==st.columns&&(st.columns.length=0),void 0!==st.rows&&(st.rows.length=0),delete st.doc,st.doc=null})}return this}})}(jQuery);