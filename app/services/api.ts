import Constants from "expo-constants";

// ดึง API URL จาก environment variable
const API_URL = Constants.expoConfig?.extra?.apiUrl || process.env.REACT_APP_NATIVE_API_URL;

// helper function สำหรับ GET request
export const get = async (endpoint: string, token?: string) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "GET request failed");
  }
  return res.json();
};

// helper function สำหรับ POST request
export const post = async (endpoint: string, data: any, token?: string) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "POST request failed");
  }
  return res.json();
};

// helper function สำหรับ PUT request
export const put = async (endpoint: string, data: any, token?: string) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "PUT request failed");
  }
  return res.json();
};

// helper function สำหรับ DELETE request
export const del = async (endpoint: string, token?: string) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : undefined,
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "DELETE request failed");
  }
  return res.json();
};
