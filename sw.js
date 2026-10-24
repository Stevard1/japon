/* Notre Japon — service worker
   cœur de l'app mis en cache à l'installation ; villes, relief et photos téléchargés ensuite en arrière-plan.
   Tout est servi depuis le téléphone en priorité : la carte marche sans réseau. */
const CORE_V = "jp-core-d8d2b81d90", DATA_V = "jp-data-cc7ae34618";
const CORE = ["./", "index.html", "app.enc", "photos.enc", "maplibre-gl.js", "manifest.webmanifest", "icons/icon-180.png", "icons/icon-192.png", "data/manifest.json", "data/base.json", "data/base.wasm", "data/land.json", "data/lakes.json"];
const REST = ["data/fonts.wasm", "data/t10-224-100.wasm", "data/t10-224-101.wasm", "data/t10-225-100.wasm", "data/t10-225-101.wasm", "data/t10-226-100.wasm", "data/t10-226-101.wasm", "data/t10-227-100.wasm", "data/t10-227-101.wasm", "data/t11-448-202.wasm", "data/t11-448-203.wasm", "data/t11-449-202.wasm", "data/t11-453-201.wasm", "data/t11-453-202.wasm", "data/t11-454-201.wasm", "data/t11-454-202.wasm", "data/t11-455-201.wasm", "data/t11-455-202.wasm", "data/t12-1794-813.wasm", "data/t12-1794-814.wasm", "data/t12-1795-810.wasm", "data/t12-1795-811.wasm", "data/t12-1795-813.wasm", "data/t12-1795-814.wasm", "data/t12-1796-810.wasm", "data/t12-1796-811.wasm", "data/t12-1812-808.wasm", "data/t12-1812-809.wasm", "data/t12-1813-807.wasm", "data/t12-1815-809.wasm", "data/t12-1816-807.wasm", "data/t12-1817-806.wasm", "data/t12-1817-807.wasm", "data/t12-1817-808.wasm", "data/t12-1818-805.wasm", "data/t12-1818-806.wasm", "data/t12-1818-807.wasm", "data/t12-1818-808.wasm", "data/t12-1819-805.wasm", "data/t12-1819-806.wasm", "data/t12-1819-807.wasm", "data/t12-1819-808.wasm", "data/t12-1822-805.wasm", "data/t13-3588-1626.wasm", "data/t13-3588-1627.wasm", "data/t13-3589-1626.wasm", "data/t13-3589-1627.wasm", "data/t13-3589-1628.wasm", "data/t13-3590-1621.wasm", "data/t13-3590-1622.wasm", "data/t13-3590-1626.wasm", "data/t13-3590-1627.wasm", "data/t13-3590-1628.wasm", "data/t13-3591-1621.wasm", "data/t13-3591-1622.wasm", "data/t13-3592-1620.wasm", "data/t13-3592-1622.wasm", "data/t13-3593-1622.wasm", "data/t13-3624-1616.wasm", "data/t13-3624-1617.wasm", "data/t13-3624-1618.wasm", "data/t13-3625-1614.wasm", "data/t13-3625-1615.wasm", "data/t13-3625-1617.wasm", "data/t13-3625-1618.wasm", "data/t13-3626-1614.wasm", "data/t13-3626-1615.wasm", "data/t13-3627-1614.wasm", "data/t13-3627-1615.wasm", "data/t13-3629-1618.wasm", "data/t13-3629-1619.wasm", "data/t13-3630-1618.wasm", "data/t13-3630-1619.wasm", "data/t13-3631-1618.wasm", "data/t13-3631-1619.wasm", "data/t13-3634-1615.wasm", "data/t13-3634-1616.wasm", "data/t13-3635-1613.wasm", "data/t13-3636-1612.wasm", "data/t13-3637-1611.wasm", "data/t13-3637-1612.wasm", "data/t13-3637-1613.wasm", "data/t13-3637-1614.wasm", "data/t13-3637-1615.wasm", "data/t13-3637-1616.wasm", "data/t13-3638-1612.wasm", "data/t13-3638-1613.wasm", "data/t13-3638-1614.wasm", "data/t13-3639-1615.wasm", "data/t13-3639-1616.wasm", "data/t13-3645-1611.wasm", "data/t14-7177-3254.wasm", "data/t14-7178-3254.wasm", "data/t14-7178-3255.wasm", "data/t14-7179-3252.wasm", "data/t14-7179-3253.wasm", "data/t14-7179-3254.wasm", "data/t14-7180-3252.wasm", "data/t14-7180-3254.wasm", "data/t14-7180-3256.wasm", "data/t14-7181-3244.wasm", "data/t14-7182-3243.wasm", "data/t14-7182-3244.wasm", "data/t14-7183-3243.wasm", "data/t14-7183-3244.wasm", "data/t14-7185-3241.wasm", "data/t14-7185-3244.wasm", "data/t14-7249-3233.wasm", "data/t14-7249-3236.wasm", "data/t14-7251-3229.wasm", "data/t14-7251-3230.wasm", "data/t14-7251-3231.wasm", "data/t14-7252-3229.wasm", "data/t14-7252-3230.wasm", "data/t14-7252-3231.wasm", "data/t14-7253-3229.wasm", "data/t14-7253-3230.wasm", "data/t14-7253-3231.wasm", "data/t14-7259-3237.wasm", "data/t14-7259-3238.wasm", "data/t14-7259-3239.wasm", "data/t14-7260-3237.wasm", "data/t14-7260-3238.wasm", "data/t14-7260-3239.wasm", "data/t14-7261-3237.wasm", "data/t14-7261-3238.wasm", "data/t14-7261-3239.wasm", "data/t14-7268-3230.wasm", "data/t14-7268-3231.wasm", "data/t14-7269-3231.wasm", "data/t14-7270-3227.wasm", "data/t14-7274-3224.wasm", "data/t14-7274-3225.wasm", "data/t14-7274-3226.wasm", "data/t14-7274-3227.wasm", "data/t14-7274-3231.wasm", "data/t14-7274-3232.wasm", "data/t14-7275-3222.wasm", "data/t14-7275-3223.wasm", "data/t14-7275-3224.wasm", "data/t14-7275-3225.wasm", "data/t14-7275-3226.wasm", "data/t14-7275-3229.wasm", "data/t14-7276-3224.wasm", "data/t14-7276-3225.wasm", "data/t14-7276-3226.wasm", "data/t14-7276-3229.wasm", "data/t14-7277-3224.wasm", "data/t14-7277-3225.wasm", "data/t14-7277-3226.wasm", "data/t14-7277-3227.wasm", "data/t14-7278-3231.wasm", "data/t14-7278-3232.wasm", "data/t14-7279-3231.wasm", "data/t14-7279-3232.wasm", "data/t8-55-25.wasm", "data/t8-56-25.wasm", "data/t9-111-50.wasm", "data/t9-111-51.wasm", "data/t9-112-50.wasm", "data/t9-112-51.wasm", "data/t9-113-50.wasm", "data/t9-113-51.wasm"];
const SIZES = {"data/fonts.wasm": 184055, "data/t10-224-100.wasm": 35360, "data/t10-224-101.wasm": 216047, "data/t10-225-100.wasm": 47775, "data/t10-225-101.wasm": 186424, "data/t10-226-100.wasm": 60232, "data/t10-226-101.wasm": 97415, "data/t10-227-100.wasm": 167332, "data/t10-227-101.wasm": 59960, "data/t11-448-202.wasm": 58392, "data/t11-448-203.wasm": 101464, "data/t11-449-202.wasm": 32112, "data/t11-453-201.wasm": 17883, "data/t11-453-202.wasm": 35175, "data/t11-454-201.wasm": 149419, "data/t11-454-202.wasm": 43701, "data/t11-455-201.wasm": 32450, "data/t11-455-202.wasm": 17876, "data/t12-1794-813.wasm": 167357, "data/t12-1794-814.wasm": 63283, "data/t12-1795-810.wasm": 20248, "data/t12-1795-811.wasm": 50581, "data/t12-1795-813.wasm": 130151, "data/t12-1795-814.wasm": 61871, "data/t12-1796-810.wasm": 58308, "data/t12-1796-811.wasm": 75510, "data/t12-1812-808.wasm": 18354, "data/t12-1812-809.wasm": 30610, "data/t12-1813-807.wasm": 40853, "data/t12-1815-809.wasm": 55848, "data/t12-1816-807.wasm": 35352, "data/t12-1817-806.wasm": 50171, "data/t12-1817-807.wasm": 153023, "data/t12-1817-808.wasm": 93460, "data/t12-1818-805.wasm": 51634, "data/t12-1818-806.wasm": 252332, "data/t12-1818-807.wasm": 137939, "data/t12-1818-808.wasm": 59224, "data/t12-1819-805.wasm": 93118, "data/t12-1819-806.wasm": 181348, "data/t12-1819-807.wasm": 17435, "data/t12-1819-808.wasm": 4155, "data/t12-1822-805.wasm": 18640, "data/t13-3588-1626.wasm": 6766, "data/t13-3588-1627.wasm": 7808, "data/t13-3589-1626.wasm": 95628, "data/t13-3589-1627.wasm": 69819, "data/t13-3589-1628.wasm": 32221, "data/t13-3590-1621.wasm": 11639, "data/t13-3590-1622.wasm": 22236, "data/t13-3590-1626.wasm": 82565, "data/t13-3590-1627.wasm": 47756, "data/t13-3590-1628.wasm": 41524, "data/t13-3591-1621.wasm": 6513, "data/t13-3591-1622.wasm": 17420, "data/t13-3592-1620.wasm": 1850, "data/t13-3592-1622.wasm": 31566, "data/t13-3593-1622.wasm": 8668, "data/t13-3624-1616.wasm": 3872, "data/t13-3624-1617.wasm": 5562, "data/t13-3624-1618.wasm": 9304, "data/t13-3625-1614.wasm": 1902, "data/t13-3625-1615.wasm": 4168, "data/t13-3625-1617.wasm": 2493, "data/t13-3625-1618.wasm": 3358, "data/t13-3626-1614.wasm": 2707, "data/t13-3626-1615.wasm": 23657, "data/t13-3627-1614.wasm": 1276, "data/t13-3627-1615.wasm": 4537, "data/t13-3629-1618.wasm": 7088, "data/t13-3629-1619.wasm": 9768, "data/t13-3630-1618.wasm": 8849, "data/t13-3630-1619.wasm": 17144, "data/t13-3631-1618.wasm": 14118, "data/t13-3631-1619.wasm": 6514, "data/t13-3634-1615.wasm": 61758, "data/t13-3634-1616.wasm": 13194, "data/t13-3635-1613.wasm": 38877, "data/t13-3636-1612.wasm": 46382, "data/t13-3637-1611.wasm": 37939, "data/t13-3637-1612.wasm": 97689, "data/t13-3637-1613.wasm": 93024, "data/t13-3637-1614.wasm": 42150, "data/t13-3637-1615.wasm": 5669, "data/t13-3637-1616.wasm": 4093, "data/t13-3638-1612.wasm": 104117, "data/t13-3638-1613.wasm": 38966, "data/t13-3638-1614.wasm": 15829, "data/t13-3639-1615.wasm": 872, "data/t13-3639-1616.wasm": 2086, "data/t13-3645-1611.wasm": 14617, "data/t14-7177-3254.wasm": 8583, "data/t14-7178-3254.wasm": 9571, "data/t14-7178-3255.wasm": 6264, "data/t14-7179-3252.wasm": 21739, "data/t14-7179-3253.wasm": 47248, "data/t14-7179-3254.wasm": 44571, "data/t14-7180-3252.wasm": 7637, "data/t14-7180-3254.wasm": 11272, "data/t14-7180-3256.wasm": 21413, "data/t14-7181-3244.wasm": 6561, "data/t14-7182-3243.wasm": 2293, "data/t14-7182-3244.wasm": 4104, "data/t14-7183-3243.wasm": 3141, "data/t14-7183-3244.wasm": 14445, "data/t14-7185-3241.wasm": 3039, "data/t14-7185-3244.wasm": 30199, "data/t14-7249-3233.wasm": 1591, "data/t14-7249-3236.wasm": 5249, "data/t14-7251-3229.wasm": 94, "data/t14-7251-3230.wasm": 1600, "data/t14-7251-3231.wasm": 3471, "data/t14-7252-3229.wasm": 987, "data/t14-7252-3230.wasm": 5905, "data/t14-7252-3231.wasm": 10777, "data/t14-7253-3229.wasm": 1872, "data/t14-7253-3230.wasm": 14069, "data/t14-7253-3231.wasm": 10242, "data/t14-7259-3237.wasm": 13280, "data/t14-7259-3238.wasm": 7454, "data/t14-7259-3239.wasm": 4815, "data/t14-7260-3237.wasm": 6983, "data/t14-7260-3238.wasm": 8628, "data/t14-7260-3239.wasm": 1702, "data/t14-7261-3237.wasm": 1820, "data/t14-7261-3238.wasm": 5107, "data/t14-7261-3239.wasm": 1249, "data/t14-7268-3230.wasm": 5322, "data/t14-7268-3231.wasm": 5449, "data/t14-7269-3231.wasm": 13910, "data/t14-7270-3227.wasm": 19492, "data/t14-7274-3224.wasm": 21341, "data/t14-7274-3225.wasm": 32380, "data/t14-7274-3226.wasm": 34656, "data/t14-7274-3227.wasm": 14544, "data/t14-7274-3231.wasm": 3413, "data/t14-7274-3232.wasm": 1636, "data/t14-7275-3222.wasm": 13567, "data/t14-7275-3223.wasm": 17671, "data/t14-7275-3224.wasm": 11981, "data/t14-7275-3225.wasm": 43595, "data/t14-7275-3226.wasm": 46659, "data/t14-7275-3229.wasm": 9450, "data/t14-7276-3224.wasm": 14513, "data/t14-7276-3225.wasm": 60260, "data/t14-7276-3226.wasm": 40123, "data/t14-7276-3229.wasm": 4066, "data/t14-7277-3224.wasm": 19504, "data/t14-7277-3225.wasm": 28516, "data/t14-7277-3226.wasm": 9150, "data/t14-7277-3227.wasm": 4264, "data/t14-7278-3231.wasm": 639, "data/t14-7278-3232.wasm": 56, "data/t14-7279-3231.wasm": 363, "data/t14-7279-3232.wasm": 216, "data/t8-55-25.wasm": 21300, "data/t8-56-25.wasm": 71432, "data/t9-111-50.wasm": 19623, "data/t9-111-51.wasm": 9622, "data/t9-112-50.wasm": 110252, "data/t9-112-51.wasm": 18299, "data/t9-113-50.wasm": 111608, "data/t9-113-51.wasm": 1793};
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

/* notifications : le contenu arrive chiffré (Web Push), seul ce téléphone peut le lire */
/* notification sans contenu = compte à rebours du matin : le téléphone calcule lui-même le nombre de jours */
const TIPS = {
  10: "Le compte à rebours est lancé ! Passeport : vérifie sa date d'expiration.",
  9: "Préviens ta banque et active le paiement à l'étranger sur ta carte.",
  8: "Prises au Japon : fiches plates (type A). Prends un adaptateur.",
  7: "Une semaine ! Télécharge les cartes hors connexion et ajoute une carte Suica dans Wallet.",
  6: "Prévois un peu de yens en liquide : beaucoup de petits restos ne prennent que le cash.",
  5: "eSIM ou pocket Wi-Fi : c'est le moment de t'en occuper.",
  4: "Visit Japan Web : remplis l'immigration et la douane en ligne, ça fait gagner du temps à l'arrivée.",
  3: "Pense aux chaussures confortables : on va beaucoup marcher.",
  2: "Après-demain ! Commence la valise, et garde de la place pour les achats 😉"
};
function countdownMsg(){
  const p = new Intl.DateTimeFormat("en-CA", {timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit"}).format(new Date());
  const n = Math.round((Date.UTC(2026, 10, 3) - Date.parse(p + "T00:00:00Z")) / 864e5);
  if (n > 1) return {title: `🇯🇵 Départ dans ${n} jours`, body: TIPS[n] || "Le Japon approche…", tag: "countdown"};
  if (n === 1) return {title: "🇯🇵 Départ demain !", body: "Valise bouclée ? Passeport, chargeurs, adaptateur…", tag: "countdown"};
  if (n === 0) return {title: "✈️ C'est le grand jour, les jeunes !", body: "Direction le Japon 🇯🇵 Bon voyage à tous !", tag: "countdown"};
  return {title: "Notre Japon", body: "Ouvre l'app pour voir les nouveautés", tag: "jp"};
}
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : countdownMsg(); } catch (err) { d = countdownMsg(); }
  e.waitUntil(Promise.all([
    self.registration.showNotification(d.title || "Notre Japon", {body: d.body || "", tag: d.tag || "jp", data: {url: d.url || "./"}, icon: "icons/icon-192.png"}),
    self.navigator && self.navigator.setAppBadge ? self.navigator.setAppBadge().catch(() => {}) : null
  ]));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "./", self.registration.scope).href;
  e.waitUntil((async () => {
    for (const c of await self.clients.matchAll({type: "window", includeUncontrolled: true})) { c.postMessage({type: "open", url}); if ("focus" in c) return c.focus(); }
    return self.clients.openWindow(url);
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin || /\/sw\.js$|\/suivre\//.test(new URL(req.url).pathname)) return;   // la page des proches vit sa vie
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
