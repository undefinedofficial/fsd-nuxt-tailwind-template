/**
 * fsd-nuxt-tailwind-template v0.0.0
 * https://github.com/undefinedofficial/fsd-nuxt-tailwind-template.git
 *
 * Copyright (c) 2024 https://github.com/undefinedofficial
 * Released under the MIT license
 */

// ./workers/sw.ts

/// <reference lib="WebWorker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, Route, registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

declare const self: ServiceWorkerGlobalScope;

if (import.meta.browser && !import.meta.dev) {
  // Google fonts dynamic cache
  registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/.*/i,
    new CacheFirst({
      cacheName: "google-fonts-cache",
      plugins: [
        new ExpirationPlugin({ maxEntries: 500, maxAgeSeconds: 5184e3 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    "GET"
  );

  // Google fonts dynamic cache
  registerRoute(
    /^https:\/\/fonts\.gstatic\.com\/.*/i,
    new CacheFirst({
      cacheName: "gstatic-fonts-cache",
      plugins: [
        new ExpirationPlugin({ maxEntries: 500, maxAgeSeconds: 5184e3 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    "GET"
  );
  // Dynamic cache for images from `/static/`
  registerRoute(
    /.*static.*/,
    new CacheFirst({
      cacheName: "dynamic-static-cache",
      plugins: [
        new ExpirationPlugin({ maxEntries: 500, maxAgeSeconds: 5184e3 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    "GET"
  );

  // Dynamic cache from `/assets/`
  registerRoute(
    /.*assets.*/,
    new CacheFirst({
      cacheName: "dynamic-assets-cache",
      plugins: [
        new ExpirationPlugin({ maxEntries: 500, maxAgeSeconds: 5184e3 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    "GET"
  );

  // Dynamic cache from `/`
  registerRoute(
    "/",
    new CacheFirst({
      cacheName: "dynamic-landing-cache",
      plugins: [
        new ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 1 }),
        new CacheableResponsePlugin({ statuses: [0, 200] }),
      ],
    }),
    "GET"
  );

  // clean old assets
  cleanupOutdatedCaches();

  const entries = (self as any).__WB_MANIFEST as string[];

  precacheAndRoute(entries);

  // only cache pages and external assets on local build + start or in production
  // to allow work offline
  // registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));

  // registerRoute(new NavigationRoute(createHandlerBoundToURL("landing.html")));

  // Перенаправление на отдельную страницу при переходе на главную
  // registerRoute(
  //   ({ request, url }) => request.mode === "navigate" && request.url === "/",
  //   new NetworkFirst({
  //     cacheName: "redirects",
  //     plugins: [
  //       {
  //         handlerWillRespond: async () => {
  //           // Перенаправляем на отдельную страницу
  //           return new Response(null, {
  //             status: 302,
  //             headers: {
  //               Location: "/landing.html"
  //             }
  //           });
  //         }
  //       }
  //     ]
  //   })
  // );

  // registerRoute("/", (event) => {
  //   if (event.request.mode === "navigate" && event.url.pathname === "/") {
  //     // Always respond to navigations with the cached /mail, regardless of the underlying event.request.url value.
  //     return (event as any).respondWith(Response.redirect("/landing.html", 302));
  //   }
  // });
}

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

/**
 * Find best client for navigation.
 * @param clients
 * @returns
 */
function findBestClient(clients: WindowClient[]) {
  const focusedClient = clients.find((client) => client.focused);
  const visibleClient = clients.find((client) => client.visibilityState === "visible");

  return focusedClient || visibleClient || clients[0];
}

/**
 * Open url in new tab or current.
 * @param url - relative url
 * @returns {Promise<boolean>}
 */
async function openUrl(url: string) {
  try {
    const clients = await self.clients.matchAll({ type: "window" });
    // Chrome 42-48 does not support navigate
    if (clients.length !== 0 && "navigate" in clients[0]) {
      const client = findBestClient(clients as WindowClient[]);
      client
        .navigate(url)
        .then((client) => client?.focus())
        .catch(console.error);
      return true;
    }

    await self.clients.openWindow(url).catch(console.error);
  } catch (error) {
    console.error(error);
    return false;
  }
}
