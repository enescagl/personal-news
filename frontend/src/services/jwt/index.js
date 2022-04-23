import jwtConfig from "./config";
import router from "@/router";

export function getToken() {
  return localStorage.getItem(jwtConfig.STORAGE_TOKEN_KEY_NAME);
}

export function deleteToken() {
  localStorage.removeItem(jwtConfig.STORAGE_TOKEN_KEY_NAME);
}

export function getRefreshToken() {
  return localStorage.getItem(jwtConfig.STORAGE_REFRESH_TOKEN_KEY_NAME);
}

export function deleteRefreshToken() {
  localStorage.removeItem(jwtConfig.STORAGE_REFRESH_TOKEN_KEY_NAME);
}

export function setToken(value) {
  localStorage.setItem(jwtConfig.STORAGE_TOKEN_KEY_NAME, value);
}

export function setRefreshToken(value) {
  localStorage.setItem(jwtConfig.STORAGE_REFRESH_TOKEN_KEY_NAME, value);
}

export function fillAxiosHeader(axiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `${jwtConfig.TOKEN_TYPE} ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return axiosInstance;
}

export function handleUnauthorizedRequest(axiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401) {
        deleteToken();
        router.push("/login");
        return Promise.reject(error);
      }

      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        return axiosInstance
          .post("auth/refresh/", {
            refresh: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              setToken(res.data.access);
              setRefreshToken(res.data.refresh);
              const token = getToken();
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `${jwtConfig.TOKEN_TYPE} ${token}`;
              return axiosInstance(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}
