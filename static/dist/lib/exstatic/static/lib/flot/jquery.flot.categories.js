!function($){function r(r,o,e,i){var s="categories"==o.xaxis.options.mode,n="categories"==o.yaxis.options.mode;if(s||n){var a=i.format;if(!a){var t=o;if(a=[],a.push({x:!0,number:!0,required:!0}),a.push({y:!0,number:!0,required:!0}),t.bars.show||t.lines.show&&t.lines.fill){var u=!!(t.bars.show&&t.bars.zero||t.lines.show&&t.lines.zero);a.push({y:!0,number:!0,required:!1,defaultValue:0,autoscale:u}),t.bars.horizontal&&(delete a[a.length-1].y,a[a.length-1].x=!0)}i.format=a}for(var f=0;f<a.length;++f)a[f].x&&s&&(a[f].number=!1),a[f].y&&n&&(a[f].number=!1)}}function o(r){var o=-1;for(var e in r)r[e]>o&&(o=r[e]);return o+1}function e(r){var o=[];for(var e in r.categories){var i=r.categories[e];i>=r.min&&i<=r.max&&o.push([i,e])}return o.sort(function(r,o){return r[0]-o[0]}),o}function i(r,o,i){if("categories"==r[o].options.mode){if(!r[o].categories){var n={},a=r[o].options.categories||{};if($.isArray(a))for(var t=0;t<a.length;++t)n[a[t]]=t;else for(var u in a)n[u]=a[u];r[o].categories=n}r[o].options.ticks||(r[o].options.ticks=e),s(i,o,r[o].categories)}}function s(r,e,i){for(var s=r.points,n=r.pointsize,a=r.format,t=e.charAt(0),u=o(i),f=0;f<s.length;f+=n)if(null!=s[f])for(var c=0;c<n;++c){var l=s[f+c];null!=l&&a[c][t]&&(l in i||(i[l]=u,++u),s[f+c]=i[l])}}function n(r,o,e){i(o,"xaxis",e),i(o,"yaxis",e)}function a(o){o.hooks.processRawData.push(r),o.hooks.processDatapoints.push(n)}var t={xaxis:{categories:null},yaxis:{categories:null}};$.plot.plugins.push({init:a,options:t,name:"categories",version:"1.0"})}(jQuery);