import jwtDefaultConfig from "./config";

export default class JwtService {
  axiosIns = null;

  jwtConfig = { ...jwtDefaultConfig };

  constructor(axiosIns) {
    this.axiosIns = axiosIns;
    this.jwtConfig = { ...this.jwtConfig };

    this.axiosIns.interceptors.request.use(
      (config) => {
        const accessToken = this.getTokenFromLocal();
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosIns.interceptors.response.use(
      (response) => response,
      // eslint-disable-next-line no-unused-vars
      (_error) => {}
    );
  }

  getTokenFromLocal() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshTokenFromLocal() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setTokenToLocal(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setUserDataToLocal(value) {
    localStorage.setItem(this.jwtConfig.storageUserKeyName, value);
  }

  getUserDataFromLocal() {
    localStorage.getItem(this.jwtConfig.storageUserKeyName);
  }

  setRefreshTokenToLocal(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(args) {
    return this.axiosIns.post(this.jwtConfig.loginEndpoint, args);
  }

  refreshToken() {
    return this.axiosIns.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshTokenFromLocal(),
    });
  }
}
