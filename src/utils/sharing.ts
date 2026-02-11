export interface SharedData {
  name: string;
  answers: Record<number, number>;
}

export interface SharedResultData {
  nameA: string;
  nameB: string;
  answersA: Record<number, number>;
  answersB: Record<number, number>;
}

export function encodeSharedData(name: string, answers: Record<number, number>): string {
  const data = { n: name, a: answers };
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export function decodeSharedData(encoded: string): SharedData | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const data = JSON.parse(json);
    if (typeof data.n !== 'string' || typeof data.a !== 'object') return null;
    return { name: data.n, answers: data.a };
  } catch {
    return null;
  }
}

export function encodeResultData(
  nameA: string, answersA: Record<number, number>,
  nameB: string, answersB: Record<number, number>,
): string {
  const data = { na: nameA, aa: answersA, nb: nameB, ab: answersB };
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

export function decodeResultData(encoded: string): SharedResultData | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const data = JSON.parse(json);
    if (typeof data.na !== 'string' || typeof data.nb !== 'string') return null;
    if (typeof data.aa !== 'object' || typeof data.ab !== 'object') return null;
    return { nameA: data.na, nameB: data.nb, answersA: data.aa, answersB: data.ab };
  } catch {
    return null;
  }
}

export function getShareUrl(encoded: string): string {
  const base = window.location.href.split('#')[0].split('?')[0];
  return `${base}?d=${encoded}`;
}

export function getResultShareUrl(encoded: string): string {
  const base = window.location.href.split('#')[0].split('?')[0];
  return `${base}?r=${encoded}`;
}

export function getSharedDataFromUrl(): SharedData | null {
  const params = new URLSearchParams(window.location.search);
  const d = params.get('d');
  if (!d) return null;
  return decodeSharedData(d);
}

export function getResultDataFromUrl(): SharedResultData | null {
  const params = new URLSearchParams(window.location.search);
  const r = params.get('r');
  if (!r) return null;
  return decodeResultData(r);
}
