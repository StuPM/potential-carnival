import { ref } from "vue";

const BASE_URL = import.meta.env.VITE_API_BACKEND_URL;

function useApi() {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  async function request(method, path, body) {
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
    get: (path) => request("GET", path),
    post: (path, body) => request("POST", path, body),
    patch: (path, body) => request("PATCH", path, body),
    del: (path) => request("DELETE", path),
  };
}

export function backendAPIRoutes() {
  const api = useApi();
  return {
    ...api,
    fetchMedia: () => api.get("media"),
    fetchStats: () => api.get("stats"),
  };
}
