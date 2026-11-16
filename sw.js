/* Trainingsplanner: offline gebruik als app op het beginscherm.
   Zet dit bestand in dezelfde map als Trainingsschema.html (bijv. op GitHub Pages).
   Online: altijd de nieuwste versie van internet (en die wordt bewaard). Offline: de bewaarde versie. */
var CACHE="trainingsplanner-v1";
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){if(res&&res.ok){var c=res.clone();caches.open(CACHE).then(function(ca){ca.put(r,c)})}return res}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match(r.url.split("#")[0].split("?")[0])})}))});
