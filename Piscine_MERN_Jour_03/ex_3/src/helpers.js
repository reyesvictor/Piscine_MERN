import cookie from "js-cookie";

export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (window !== "undefined") {
    cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.getItem(key, JSON.stringify(value));
  }
};

export const rempveLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (res, next) => {
  console.log("====AUTHENTICATE ON RESPONSE=====", res);
  setCookie("token", res.data.user.email);
  setLocalStorage("user", res.data.user);
  next();
};

export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      }
    } else {
      return false;
    }
  }
};
