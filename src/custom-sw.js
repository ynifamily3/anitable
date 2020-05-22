/* eslint-disable no-restricted-globals */
// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { skipWaiting, clientsClaim } from "workbox-core";
import localforage from "localforage";

import {
  StaleWhileRevalidate,
  NetworkFirst,
  CacheFirst,
} from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

skipWaiting();
clientsClaim();

async function aniAlarm() {
  console.log("aniAlarm 스타트.");
  return new Promise(async (resolve, reject) => {
    setInterval(async () => {
      try {
        const aniAlarm = await localforage.getItem("ani-alarm");
        const today = new Date();
        const day = today.getDay();
        const combinedTime = Number(
          "" + today.getHours() + "" + today.getMinutes()
        );
        Array.isArray(aniAlarm) &&
          aniAlarm.map((x) => {
            const { aniDay, aniNumber, aniTitle, aniTime } = x;
            if (
              aniDay === day &&
              Math.abs(combinedTime - Number(aniTime)) < 20
            ) {
              self.registration.showNotification("Anime Reminder", {
                body:
                  "[" +
                  aniNumber +
                  "] " +
                  aniTitle +
                  "의 방영시간이 " +
                  aniTime +
                  "입니다!",
                vibrate: [200, 100, 200, 100, 200, 100, 200],
              });
            }
          });
      } catch (e) {
        console.error(e);
      }
    }, 1000 * 60 * 10); // 10분마다 점검하기
  });
}

// 싱크
self.addEventListener("sync", function (event) {
  if (event.tag === "aniAlarmSync") {
    event.waitUntil(aniAlarm());
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
