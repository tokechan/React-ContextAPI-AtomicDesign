const normalizeBaseUrl = (url: string) => {
  if (!url) {
    return "";
  }

  return url.endsWith("/") ? url.slice(0, -1) : url;
};

const apiBase = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000");

export const API_BASE_URL = apiBase;
export const API_URL = `${apiBase}/api`;
