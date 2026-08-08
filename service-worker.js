const CACHE='stagefront-v9';
const FILES=['./','index.html','styles.css','brand.css','app.js','manifest.webmanifest','icon.svg','sounds/applause-small.wav','sounds/applause-strong.wav','sounds/applause-show.wav','sounds/sarcastic-clap.wav','sounds/laughter.wav','sounds/buzzer.wav','sounds/boo.wav','sounds/fog-horn.wav','sounds/fall.wav','sounds/splat.wav','sounds/air-horn.wav','sounds/rimshot.wav','sounds/gasp.wav','sounds/record-scratch.wav','sounds/victory.wav','sounds/impact.wav','sounds/sparkle.wav'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./'))))});

