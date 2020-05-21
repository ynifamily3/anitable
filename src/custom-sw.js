/* eslint-disable no-restricted-globals */
// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { skipWaiting, clientsClaim } from "workbox-core";

import {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
} from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

skipWaiting();
clientsClaim();

async function doSomeStuff() {
  return new Promise(async (resolve, reject) => {
    console.log("두 썸 스텁");
    resolve({
      emoji: "=ㅅ=",
    });
  });
}

// 싱크
self.addEventListener("sync", function (event) {
  if (event.tag === "myFirstSync") {
    event.waitUntil(doSomeStuff());
  }
});

// app-shell
registerRoute("/", new StaleWhileRevalidate());
registerRoute("/manifest.json", new StaleWhileRevalidate());
registerRoute("/custom-sw.js", new StaleWhileRevalidate());

// 정적 이미지 파일 등
registerRoute(
  ({ url }) => url.pathname.startsWith("/icons/"),
  new CacheFirst()
);
registerRoute(
  /^http(s)?:\/\/fonts\.googleapis\.com.*$/,
  new StaleWhileRevalidate()
);
registerRoute(
  /^http(s)?:\/\/fonts\.gstatic\.com.*$/,
  new StaleWhileRevalidate()
);
registerRoute(
  /^http(s)?:\/\/pbs\.twimg\.com\/media\/.*$/,
  new StaleWhileRevalidate()
);

// api 캐시
registerRoute("https://api.miel.dev/timetable/list/now", new NetworkFirst());

// 10분마다 서비스 워커가 로컬포리지를 읽어서
