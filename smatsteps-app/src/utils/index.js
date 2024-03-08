// index.js

export const IMAGE_PATH = process.env.REACT_APP_BASE_URL + "/storage/uploads/";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

// Navigation
export const linksUserLoged = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Profil",
    path: "/profil",
  },

  {
    label: "Logout",
    path: "/login",
  },
  {
    label: "login",
    path: "/login",
  },
];
export const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Profil",
    path: "/profil",
  },
];

export const linksAcceuil = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Profil",
    path: "/rofil",
  },
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Logout",
    path: "/logout",
  },
];

// Transformation
export const firstLetterUppercase = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const convertToRoman = (num) => {
  const romanNumerals = ["I", "II", "III"];
  const values = [1, 2, 3];

  let result = "";

  for (let i = values.length - 1; i >= 0; i--) {
    while (num >= values[i]) {
      result += romanNumerals[i];
      num -= values[i];
    }
  }

  return result;
};

export const displayImage = (image) =>
  image ? IMAGE_PATH + "/" + image : IMAGE_PATH + "/notImage.png";

export const cleanHtmlText = (htmlString) => {
  const cleanText = htmlString
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleanText;
};
export const getViolationField = (error, setError) => {
  if ("errors" in error?.response?.data) {
    const errors = error?.response?.data?.errors;
    if (errors.length) {
      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          const messages = errors[field];
          for (const message of messages) {
            setError(field, {
              type: "manual",
              message: message,
            });
          }
        }
      }
    }
  }
};
