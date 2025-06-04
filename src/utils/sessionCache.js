const EXPIRY_DAYS = 30;

export function setCache(key, value) {
  const expires = new Date();
  expires.setTime(expires.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))};expires=${expires.toUTCString()};path=/`;
}

export function getCache(key) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    const [k, v] = c.split("=");
    if (k === key) {
      try {
        return JSON.parse(decodeURIComponent(v));
      } catch {
        return null;
      }
    }
  }
  return null;
}
