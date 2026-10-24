/* Notre Japon — service worker
   cœur de l'app mis en cache à l'installation ; villes, relief et photos téléchargés ensuite en arrière-plan.
   Tout est servi depuis le téléphone en priorité : la carte marche sans réseau. */
const CORE_V = "jp-core-54e514d5e3", DATA_V = "jp-data-96b2720a5b";
const CORE = ["./", "index.html", "app.enc", "photos.enc", "maplibre-gl.js", "manifest.webmanifest", "icons/icon-180.png", "icons/icon-192.png", "data/manifest.json", "data/base.json", "data/base.wasm", "data/relief.webp", "data/relief-hi.webp"];
const REST = ["data/d10-226-100.wasm", "data/d10-226-101.wasm", "data/d11-452-201.wasm", "data/d11-452-202.wasm", "data/d11-453-201.wasm", "data/d11-453-202.wasm", "data/d11-454-201.wasm", "data/d11-454-202.wasm", "data/fonts.wasm", "data/t10-224-100.wasm", "data/t10-224-101.wasm", "data/t10-225-100.wasm", "data/t10-225-101.wasm", "data/t10-226-100.wasm", "data/t10-226-101.wasm", "data/t10-227-100.wasm", "data/t10-227-101.wasm", "data/t11-448-202.wasm", "data/t11-448-203.wasm", "data/t11-449-202.wasm", "data/t11-453-201.wasm", "data/t11-453-202.wasm", "data/t11-454-201.wasm", "data/t11-454-202.wasm", "data/t11-455-201.wasm", "data/t11-455-202.wasm", "data/t12-1794-813.wasm", "data/t12-1794-814.wasm", "data/t12-1795-810.wasm", "data/t12-1795-811.wasm", "data/t12-1795-813.wasm", "data/t12-1795-814.wasm", "data/t12-1796-810.wasm", "data/t12-1796-811.wasm", "data/t12-1812-808.wasm", "data/t12-1812-809.wasm", "data/t12-1813-807.wasm", "data/t12-1815-809.wasm", "data/t12-1816-807.wasm", "data/t12-1817-806.wasm", "data/t12-1817-807.wasm", "data/t12-1817-808.wasm", "data/t12-1818-805.wasm", "data/t12-1818-806.wasm", "data/t12-1818-807.wasm", "data/t12-1818-808.wasm", "data/t12-1819-805.wasm", "data/t12-1819-806.wasm", "data/t12-1819-807.wasm", "data/t12-1819-808.wasm", "data/t12-1822-805.wasm", "data/t13-3588-1626.wasm", "data/t13-3588-1627.wasm", "data/t13-3589-1626.wasm", "data/t13-3589-1627.wasm", "data/t13-3589-1628.wasm", "data/t13-3590-1621.wasm", "data/t13-3590-1622.wasm", "data/t13-3590-1626.wasm", "data/t13-3590-1627.wasm", "data/t13-3590-1628.wasm", "data/t13-3591-1621.wasm", "data/t13-3591-1622.wasm", "data/t13-3592-1620.wasm", "data/t13-3592-1622.wasm", "data/t13-3593-1622.wasm", "data/t13-3624-1616.wasm", "data/t13-3624-1617.wasm", "data/t13-3624-1618.wasm", "data/t13-3625-1614.wasm", "data/t13-3625-1615.wasm", "data/t13-3625-1617.wasm", "data/t13-3625-1618.wasm", "data/t13-3626-1614.wasm", "data/t13-3626-1615.wasm", "data/t13-3627-1614.wasm", "data/t13-3627-1615.wasm", "data/t13-3629-1618.wasm", "data/t13-3629-1619.wasm", "data/t13-3630-1618.wasm", "data/t13-3630-1619.wasm", "data/t13-3631-1618.wasm", "data/t13-3631-1619.wasm", "data/t13-3634-1615.wasm", "data/t13-3634-1616.wasm", "data/t13-3635-1613.wasm", "data/t13-3636-1612.wasm", "data/t13-3637-1611.wasm", "data/t13-3637-1612.wasm", "data/t13-3637-1613.wasm", "data/t13-3637-1614.wasm", "data/t13-3637-1615.wasm", "data/t13-3637-1616.wasm", "data/t13-3638-1612.wasm", "data/t13-3638-1613.wasm", "data/t13-3638-1614.wasm", "data/t13-3639-1615.wasm", "data/t13-3639-1616.wasm", "data/t13-3645-1611.wasm", "data/t14-7177-3254.wasm", "data/t14-7178-3254.wasm", "data/t14-7178-3255.wasm", "data/t14-7179-3252.wasm", "data/t14-7179-3253.wasm", "data/t14-7179-3254.wasm", "data/t14-7180-3252.wasm", "data/t14-7180-3254.wasm", "data/t14-7180-3256.wasm", "data/t14-7181-3244.wasm", "data/t14-7182-3243.wasm", "data/t14-7182-3244.wasm", "data/t14-7183-3243.wasm", "data/t14-7183-3244.wasm", "data/t14-7185-3241.wasm", "data/t14-7185-3244.wasm", "data/t14-7249-3233.wasm", "data/t14-7249-3236.wasm", "data/t14-7251-3229.wasm", "data/t14-7251-3230.wasm", "data/t14-7251-3231.wasm", "data/t14-7252-3229.wasm", "data/t14-7252-3230.wasm", "data/t14-7252-3231.wasm", "data/t14-7253-3229.wasm", "data/t14-7253-3230.wasm", "data/t14-7253-3231.wasm", "data/t14-7259-3237.wasm", "data/t14-7259-3238.wasm", "data/t14-7259-3239.wasm", "data/t14-7260-3237.wasm", "data/t14-7260-3238.wasm", "data/t14-7260-3239.wasm", "data/t14-7261-3237.wasm", "data/t14-7261-3238.wasm", "data/t14-7261-3239.wasm", "data/t14-7268-3230.wasm", "data/t14-7268-3231.wasm", "data/t14-7269-3231.wasm", "data/t14-7270-3227.wasm", "data/t14-7274-3224.wasm", "data/t14-7274-3225.wasm", "data/t14-7274-3226.wasm", "data/t14-7274-3227.wasm", "data/t14-7274-3231.wasm", "data/t14-7274-3232.wasm", "data/t14-7275-3222.wasm", "data/t14-7275-3223.wasm", "data/t14-7275-3224.wasm", "data/t14-7275-3225.wasm", "data/t14-7275-3226.wasm", "data/t14-7275-3229.wasm", "data/t14-7276-3224.wasm", "data/t14-7276-3225.wasm", "data/t14-7276-3226.wasm", "data/t14-7276-3229.wasm", "data/t14-7277-3224.wasm", "data/t14-7277-3225.wasm", "data/t14-7277-3226.wasm", "data/t14-7277-3227.wasm", "data/t14-7278-3231.wasm", "data/t14-7278-3232.wasm", "data/t14-7279-3231.wasm", "data/t14-7279-3232.wasm", "data/t8-55-25.wasm", "data/t8-56-25.wasm", "data/t9-111-50.wasm", "data/t9-111-51.wasm", "data/t9-112-50.wasm", "data/t9-112-51.wasm", "data/t9-113-50.wasm", "data/t9-113-51.wasm"];
const SIZES = {"data/d10-226-100.wasm": 149790, "data/d10-226-101.wasm": 346694, "data/d11-452-201.wasm": 64352, "data/d11-452-202.wasm": 209173, "data/d11-453-201.wasm": 266380, "data/d11-453-202.wasm": 589719, "data/d11-454-201.wasm": 55920, "data/d11-454-202.wasm": 58086, "data/fonts.wasm": 184055, "data/t10-224-100.wasm": 35360, "data/t10-224-101.wasm": 216047, "data/t10-225-100.wasm": 47775, "data/t10-225-101.wasm": 186424, "data/t10-226-100.wasm": 60232, "data/t10-226-101.wasm": 97415, "data/t10-227-100.wasm": 167332, "data/t10-227-101.wasm": 59960, "data/t11-448-202.wasm": 58392, "data/t11-448-203.wasm": 101464, "data/t11-449-202.wasm": 32112, "data/t11-453-201.wasm": 17883, "data/t11-453-202.wasm": 35175, "data/t11-454-201.wasm": 149419, "data/t11-454-202.wasm": 43701, "data/t11-455-201.wasm": 32450, "data/t11-455-202.wasm": 17876, "data/t12-1794-813.wasm": 167357, "data/t12-1794-814.wasm": 63283, "data/t12-1795-810.wasm": 20248, "data/t12-1795-811.wasm": 50581, "data/t12-1795-813.wasm": 130151, "data/t12-1795-814.wasm": 61871, "data/t12-1796-810.wasm": 58308, "data/t12-1796-811.wasm": 75510, "data/t12-1812-808.wasm": 18354, "data/t12-1812-809.wasm": 30610, "data/t12-1813-807.wasm": 40853, "data/t12-1815-809.wasm": 55848, "data/t12-1816-807.wasm": 35352, "data/t12-1817-806.wasm": 50171, "data/t12-1817-807.wasm": 153023, "data/t12-1817-808.wasm": 93460, "data/t12-1818-805.wasm": 51634, "data/t12-1818-806.wasm": 252332, "data/t12-1818-807.wasm": 137939, "data/t12-1818-808.wasm": 59224, "data/t12-1819-805.wasm": 93118, "data/t12-1819-806.wasm": 181348, "data/t12-1819-807.wasm": 17435, "data/t12-1819-808.wasm": 4155, "data/t12-1822-805.wasm": 18640, "data/t13-3588-1626.wasm": 15840, "data/t13-3588-1627.wasm": 14547, "data/t13-3589-1626.wasm": 219195, "data/t13-3589-1627.wasm": 189639, "data/t13-3589-1628.wasm": 88583, "data/t13-3590-1621.wasm": 12335, "data/t13-3590-1622.wasm": 30626, "data/t13-3590-1626.wasm": 226511, "data/t13-3590-1627.wasm": 114287, "data/t13-3590-1628.wasm": 94156, "data/t13-3591-1621.wasm": 8218, "data/t13-3591-1622.wasm": 38226, "data/t13-3592-1620.wasm": 2568, "data/t13-3592-1622.wasm": 78867, "data/t13-3593-1622.wasm": 18416, "data/t13-3624-1616.wasm": 4825, "data/t13-3624-1617.wasm": 6513, "data/t13-3624-1618.wasm": 11999, "data/t13-3625-1614.wasm": 2287, "data/t13-3625-1615.wasm": 5017, "data/t13-3625-1617.wasm": 2948, "data/t13-3625-1618.wasm": 4610, "data/t13-3626-1614.wasm": 3173, "data/t13-3626-1615.wasm": 42077, "data/t13-3627-1614.wasm": 1276, "data/t13-3627-1615.wasm": 9052, "data/t13-3629-1618.wasm": 11182, "data/t13-3629-1619.wasm": 12119, "data/t13-3630-1618.wasm": 12267, "data/t13-3630-1619.wasm": 21691, "data/t13-3631-1618.wasm": 31037, "data/t13-3631-1619.wasm": 8511, "data/t13-3634-1615.wasm": 199178, "data/t13-3634-1616.wasm": 38360, "data/t13-3635-1613.wasm": 101595, "data/t13-3636-1612.wasm": 114619, "data/t13-3637-1611.wasm": 109061, "data/t13-3637-1612.wasm": 214233, "data/t13-3637-1613.wasm": 221649, "data/t13-3637-1614.wasm": 104605, "data/t13-3637-1615.wasm": 12171, "data/t13-3637-1616.wasm": 8103, "data/t13-3638-1612.wasm": 235014, "data/t13-3638-1613.wasm": 80795, "data/t13-3638-1614.wasm": 29288, "data/t13-3639-1615.wasm": 933, "data/t13-3639-1616.wasm": 2511, "data/t13-3645-1611.wasm": 19831, "data/t14-7177-3254.wasm": 28742, "data/t14-7178-3254.wasm": 89254, "data/t14-7178-3255.wasm": 64904, "data/t14-7179-3252.wasm": 162078, "data/t14-7179-3253.wasm": 347957, "data/t14-7179-3254.wasm": 480561, "data/t14-7180-3252.wasm": 100732, "data/t14-7180-3254.wasm": 144573, "data/t14-7180-3256.wasm": 170729, "data/t14-7181-3244.wasm": 11911, "data/t14-7182-3243.wasm": 2763, "data/t14-7182-3244.wasm": 4143, "data/t14-7183-3243.wasm": 6824, "data/t14-7183-3244.wasm": 160397, "data/t14-7185-3241.wasm": 10529, "data/t14-7185-3244.wasm": 351692, "data/t14-7249-3233.wasm": 2748, "data/t14-7249-3236.wasm": 17677, "data/t14-7251-3229.wasm": 94, "data/t14-7251-3230.wasm": 2586, "data/t14-7251-3231.wasm": 8334, "data/t14-7252-3229.wasm": 987, "data/t14-7252-3230.wasm": 18137, "data/t14-7252-3231.wasm": 25472, "data/t14-7253-3229.wasm": 5396, "data/t14-7253-3230.wasm": 103238, "data/t14-7253-3231.wasm": 40370, "data/t14-7259-3237.wasm": 63804, "data/t14-7259-3238.wasm": 24231, "data/t14-7259-3239.wasm": 14323, "data/t14-7260-3237.wasm": 34618, "data/t14-7260-3238.wasm": 30128, "data/t14-7260-3239.wasm": 2252, "data/t14-7261-3237.wasm": 2250, "data/t14-7261-3238.wasm": 22965, "data/t14-7261-3239.wasm": 1380, "data/t14-7268-3230.wasm": 85446, "data/t14-7268-3231.wasm": 78665, "data/t14-7269-3231.wasm": 155498, "data/t14-7270-3227.wasm": 161281, "data/t14-7274-3224.wasm": 356560, "data/t14-7274-3225.wasm": 393800, "data/t14-7274-3226.wasm": 334642, "data/t14-7274-3227.wasm": 283066, "data/t14-7274-3231.wasm": 6881, "data/t14-7274-3232.wasm": 3133, "data/t14-7275-3222.wasm": 141557, "data/t14-7275-3223.wasm": 220784, "data/t14-7275-3224.wasm": 120463, "data/t14-7275-3225.wasm": 345806, "data/t14-7275-3226.wasm": 336194, "data/t14-7275-3229.wasm": 146757, "data/t14-7276-3224.wasm": 119237, "data/t14-7276-3225.wasm": 331915, "data/t14-7276-3226.wasm": 163281, "data/t14-7276-3229.wasm": 20854, "data/t14-7277-3224.wasm": 317889, "data/t14-7277-3225.wasm": 339466, "data/t14-7277-3226.wasm": 32826, "data/t14-7277-3227.wasm": 13557, "data/t14-7278-3231.wasm": 850, "data/t14-7278-3232.wasm": 56, "data/t14-7279-3231.wasm": 363, "data/t14-7279-3232.wasm": 216, "data/t8-55-25.wasm": 21300, "data/t8-56-25.wasm": 71432, "data/t9-111-50.wasm": 19623, "data/t9-111-51.wasm": 9622, "data/t9-112-50.wasm": 110252, "data/t9-112-51.wasm": 18299, "data/t9-113-50.wasm": 111608, "data/t9-113-51.wasm": 1793};
const TOTAL = Object.values(SIZES).reduce((a, b) => a + b, 0);
const abs = p => new URL(p, self.registration.scope).href;
let filling = null;

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CORE_V).then(c => c.addAll(CORE.map(p => new Request(abs(p), {cache: "reload"})))));
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    // on ne supprime que l'ancien cœur ; les anciennes données restent utilisables hors connexion
    // jusqu'à ce que les nouvelles soient complètes (voir fill)
    for (const k of await caches.keys()) if (k.startsWith("jp-core-") && k !== CORE_V) await caches.delete(k);
    await self.clients.claim();
    filling ||= fill().finally(() => { filling = null; });
  })());
});


async function broadcast(msg){ for (const c of await self.clients.matchAll({includeUncontrolled: true})) c.postMessage(msg); }
async function fill(){
  const cache = await caches.open(DATA_V);
  let done = 0; const todo = [];
  for (const p of REST) {
    if (await cache.match(abs(p))) { done += SIZES[p]; continue; }
    // fichier inchangé depuis la version précédente : on le recopie au lieu de le retélécharger
    const old = await caches.match(abs(p));
    if (old) { const blob = await old.clone().blob(); if (blob.size === SIZES[p]) { await cache.put(abs(p), new Response(blob, {headers: old.headers})); done += SIZES[p]; continue; } }
    todo.push(p);
  }
  await broadcast({type: "progress", done, total: TOTAL});
  let last = 0, failed = 0;
  const worker = async () => {
    while (todo.length) {
      const p = todo.shift();
      try {
        const r = await fetch(abs(p), {cache: "no-cache"});
        if (!r.ok) throw new Error(r.status);
        await cache.put(abs(p), r);
        done += SIZES[p];
      } catch (err) { failed++; }
      const now = Date.now();
      if (now - last > 400 || !todo.length) { last = now; await broadcast({type: "progress", done, total: TOTAL}); }
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  if (!failed) for (const k of await caches.keys()) if (k.startsWith("jp-data-") && k !== DATA_V) await caches.delete(k);
  await broadcast(failed ? {type: "error", failed} : {type: "progress", done: TOTAL, total: TOTAL});
}
self.addEventListener("message", e => {
  if (e.data === "fill") { filling ||= fill().finally(() => { filling = null; }); e.waitUntil(filling); }
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith((async () => {
    if (req.mode === "navigate") {
      const hit = await caches.match(abs("index.html"));
      if (hit) { fetch(req).then(r => r.ok && caches.open(CORE_V).then(c => c.put(abs("index.html"), r))).catch(() => {}); return hit; }
      return fetch(req);
    }
    const hit = await caches.match(req.url, {ignoreSearch: true});
    if (hit) return hit;
    const r = await fetch(req);
    if (r.ok) { const copy = r.clone(); caches.open(DATA_V).then(c => c.put(req.url, copy)); }
    return r;
  })());
});
