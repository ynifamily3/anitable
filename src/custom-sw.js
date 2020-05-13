// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import {
  NetworkFirst,
  CacheFirst,
  StaleWhileRevalidate,
} from "workbox-strategies";

/* eslint-disable-next-line no-restricted-globals */
precacheAndRoute(self.__WB_MANIFEST);

// app-shell
registerRoute("/", new NetworkFirst());
registerRoute("/manifest.json", new NetworkFirst());
registerRoute("/custom-sw.js", new NetworkFirst());

// 정적 이미지 파일 등
registerRoute(
  ({ url }) => url.pathname.startsWith("/icons/"),
  new StaleWhileRevalidate()
);
registerRoute(
  /^http(s)?:\/\/fonts\.googleapis\.com.*$/,
  new StaleWhileRevalidate()
);
registerRoute(
  /^http(s)?:\/\/pbs\.twimg\.com\/media\/.*$/,
  new StaleWhileRevalidate()
);

// api
registerRoute("https://api.miel.dev/timetable/list/now", new NetworkFirst());
