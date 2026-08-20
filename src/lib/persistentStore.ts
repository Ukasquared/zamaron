export function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function loadStore<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return cloneValue(fallback);
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return cloneValue(fallback);
    return JSON.parse(raw) as T;
  } catch {
    return cloneValue(fallback);
  }
}

export function saveStore<T>(key: string, value: T): void {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota / private-mode failures; in-memory state still works.
  }
}

export function createId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}-${Date.now().toString(36)}-${rand}`;
}

export function fingerprint(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  const a = (hash >>> 0).toString(16).padStart(8, '0');
  const b = Math.abs(hash * 31).toString(16).padStart(8, '0');
  return `0x${a}${b}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function todayStamp(): string {
  return new Date().toISOString().slice(0, 10);
}
