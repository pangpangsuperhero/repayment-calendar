"use strict";

const VERSION = "1.0.0";
const scope = new URL(self.registration.scope);
const prefix = "repayment-calendar:" + scope.href + ":";
const cacheName = prefix + VERSION;
const path = name => new URL(name, scope).href;
const assets = [
  "index.html",
  "manifest.webmanifest",
  "version.json",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png"
].map(path);
const index = path("index.html");

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    try {
      await cache.addAll(assets.map(url => new Request(url, {cache:"reload"})));
      const [meta, html] = await Promise.all([
        cache.match(path("version.json")).then(response => response.json()),
        cache.match(index).then(response => response.text())
      ]);
      if (meta.version !== VERSION ||
          !html.includes('<meta name="app-version" content="' + VERSION + '">')) {
        throw new Error("The published files have different versions.");
      }
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
  })());
});

self.addEventListener("message", event => {
  if (event.data?.type === "APPLY_UPDATE") event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const old = (await caches.keys()).filter(key => key.startsWith(prefix) && key !== cacheName);
    await Promise.all(old.map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  const clean = url.origin + url.pathname;
  const appPage = event.request.mode === "navigate" && (clean === scope.href || clean === index);
  const key = appPage ? index : clean;
  if (!assets.includes(key)) return;
  event.respondWith((async () => {
    const cached = await (await caches.open(cacheName)).match(key);
    return cached || fetch(event.request);
  })());
});
