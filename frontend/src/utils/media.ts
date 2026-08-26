import { ref } from "vue";

const BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

function useApi() {
  const data = ref<any>(null);
  const error = ref(null);
  const loading = ref(false);

  async function request(method: string, path: string, body?: object) {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) throw new Error(res);
      data.value = await res.json();
      return data.value;
    } catch (e) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    error,
    loading,
    get: (path: string) => request("GET", path),
    post: (path: string, body: object) => request("POST", path, body),
    patch: (path: string, body: object) => request("PATCH", path, body),
    del: (path: string) => request("DELETE", path),
  };
}

export function backendAPIRoutes() {
  const api = useApi();
  return {
    ...api,
    fetchMedia: () => api.get("media"),
    fetchStats: () => api.get("stats"),
    fetchCustom: (custom: string) => api.get(custom),
  };
}
