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
  alarm?: boolean;
}

export interface AniTimetableError {
  errorMessage: string;
}

export async function getAniTimetableInfo(): Promise<Response> {
  try {
    return await fetch(`https://api.miel.dev/timetable/list/now`, {
      mode: "cors",
    });
  } catch (error) {
    const reason: AniTimetableError = { errorMessage: error };
    return Promise.reject(reason);
  }
}
