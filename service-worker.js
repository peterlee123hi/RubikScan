"use strict";var precacheConfig=[["/RubikScan/index.html","299bc601724c23c7f522663dbb2d3ac1"],["/RubikScan/static/css/main.6c45b3d3.css","2049964fb9ea17e1aada28a2cad6453e"],["/RubikScan/static/js/main.0f2d6428.js","985e8fe1128e72342e3e8328e1348096"],["/RubikScan/static/media/back.2c84a3e0.svg","2c84a3e062aecfbf9960d1f6c67d06fe"],["/RubikScan/static/media/bottom.acbbbbdf.svg","acbbbbdf5476374da632db4d6e2b9492"],["/RubikScan/static/media/front.e016f1f0.svg","e016f1f096609b090f482be4b1dca9b8"],["/RubikScan/static/media/guide.06af4a95.svg","06af4a95e8abddccc2c42055c824ec60"],["/RubikScan/static/media/left.8fb46683.svg","8fb466834d811de0a7fdd0ef032885ef"],["/RubikScan/static/media/logo.4bd204f8.svg","4bd204f8248b06b5b2013b435853cea4"],["/RubikScan/static/media/right.95814fed.svg","95814fed805aaed915c325728f115b88"],["/RubikScan/static/media/tilt.f3a5d0f9.svg","f3a5d0f98b071336b71ad4f1a237b45f"],["/RubikScan/static/media/top.1e6ebcd9.svg","1e6ebcd96e57217214d85d32ef066dd7"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),a="index.html";(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),t=urlsToCacheKeys.has(n));var r="/RubikScan/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});