import axios from "axios";
// import { CacheableResponse } from "workbox-cacheable-response";

// const cacheable = new CacheableResponse({
//   statuses: [0, 200],
//   headers: {
//     "X-Is-Cacheable": "true",
//   },
// });

export interface AniTimetableElem {
  i: number;
  a: number;
  sd: number;
  img: string;
  t: string;
  ed: number;
  n?: [
    {
      i: number;
      s: string;
    }
  ];
  l: string;
  b: number;
  s: string;
  e: number;
}

export interface AniTimetableError {
  errorMessage: string;
}

export async function getAniTimetableInfo(): Promise<
  AniTimetableElem[][] | AniTimetableError
> {
  try {
    const response = await fetch(`https://api.ohli.moe/timetable/list/now`);
    // if (cacheable.isResponseCacheable(response)) {
    //   const cache = await caches.open("api-cache");
    //   cache.put(response.url, response);
    // } else {
    // }
    return await response.json();
  } catch (error) {
    const reason: AniTimetableError = { errorMessage: JSON.stringify(error) };
    return Promise.resolve(reason);
  }
}
