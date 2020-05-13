// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";

/* eslint-disable-next-line no-restricted-globals */
precacheAndRoute(self.__WB_MANIFEST);

console.log("헬로우 프롬 커스텀서비스워커.js");

// app-shell
registerRoute("/", new NetworkFirst());
registerRoute("https://api.ohli.moe/timetable/list/now", new NetworkFirst());
registerRoute(/^http(s)?:\/\/pbs.twimg.com\/media\/.*$/, new NetworkFirst());
