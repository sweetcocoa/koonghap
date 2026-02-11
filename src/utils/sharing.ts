export interface SharedData {
  name: string;
  answers: Record<number, number>;
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

export function getShareUrl(encoded: string): string {
  const base = window.location.href.split('#')[0].split('?')[0];
  return `${base}?d=${encoded}`;
}

export function getSharedDataFromUrl(): SharedData | null {
  const params = new URLSearchParams(window.location.search);
  const d = params.get('d');
  if (!d) return null;
  return decodeSharedData(d);
}
