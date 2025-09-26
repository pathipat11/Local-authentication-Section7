import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = Constants.expoConfig.extra.apiUrl;

interface RequestOptions extends RequestInit {
  body?: any;
}

async function request(endpoint: string, options: RequestOptions = {}) {
  try {
    const token = await AsyncStorage.getItem("authToken");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "API request failed");

    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}

// Shortcut functions
export const apiGet = (endpoint: string) => request(endpoint, { method: "GET" });
export const apiPost = (endpoint: string, body: any) => request(endpoint, { method: "POST", body });
export const apiPut = (endpoint: string, body: any) => request(endpoint, { method: "PUT", body });
export const apiDelete = (endpoint: string) => request(endpoint, { method: "DELETE" });

export default { apiGet, apiPost, apiPut, apiDelete };
