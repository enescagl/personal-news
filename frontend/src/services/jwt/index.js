import jwtDefaultConfig from "./config";
import router from "@/router";

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig };

  constructor(axiosInstance) {
    this.fillAxiosHeader(axiosInstance);
    this.handleUnauthorizedRequest(axiosInstance);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  deleteToken() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  deleteRefreshToken() {
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setUserData(value) {
    localStorage.setItem(this.jwtConfig.storageUserKeyName, value);
  }

  getUserData() {
    localStorage.getItem(this.jwtConfig.storageUserKeyName);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  fillAxiosHeader(axiosInstance) {
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers[
            "Authorization"
          ] = `${this.jwtConfig.tokenType} ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  }

  handleUnauthorizedRequest(axiosInstance) {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          this.deleteToken();
          router.push("/auth/login");
          return Promise.reject(error);
        }

        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = this.getRefreshToken();
          return axiosInstance
            .post("token/refresh/", {
              refresh: refreshToken,
            })
            .then((res) => {
              if (res.status === 200) {
                this.setToken(res.data.access);
                axiosInstance.defaults.headers.common["Authorization"] =
                  "Bearer " + this.getToken();
                return axiosInstance(originalRequest);
              }
            });
        }
        return Promise.reject(error);
      }
    );
  }
}
