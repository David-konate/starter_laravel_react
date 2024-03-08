import { create, test, enforce } from "vest";
// import { cleanHtmlText } from ".";

const IS_REQUIRED_MESSAGE = "Ce champ est requis";
const IS_NOT_REGEX_VALID_MESSAGE = "Le format est invalide";
const IS_NOT_SAME_VALUE_MESSAGE = "Les mots de passe ne correspondent pas";
const PSEUDO_REGEX = /^[a-zA-Z0-9_.]+$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const maxLength = (length) =>
  `Le champ ne doit pas dépasser ${length} caractères.`;
export const minLength = (length) =>
  `Le champ doit avoir au minimum ${length} caractères.`;
export const minNumber = (number) => `Minimum ${number}`;

export const validationRegister = create((data = {}) => {
  test("user_pseudo", IS_REQUIRED_MESSAGE, () => {
    enforce(data.user_pseudo).isNotEmpty();
  });
  test("user_pseudo", IS_NOT_REGEX_VALID_MESSAGE, () => {
    enforce(data.user_pseudo).matches(PSEUDO_REGEX);
  });
  test("user_pseudo", maxLength(20), () => {
    enforce(data.user_pseudo).shorterThanOrEquals(20);
  });

  test("user_email", IS_REQUIRED_MESSAGE, () => {
    enforce(data.user_email).isNotEmpty();
  });
  test("user_email", IS_NOT_REGEX_VALID_MESSAGE, () => {
    enforce(data.user_email).matches(EMAIL_REGEX);
  });

  test("password", IS_REQUIRED_MESSAGE, () => {
    enforce(data.password).isNotEmpty();
  });
  test("password", minLength(6), () => {
    enforce(data.password).longerThanOrEquals(6);
  });

  test("confirmPassword", IS_REQUIRED_MESSAGE, () => {
    enforce(data.confirmPassword).isNotEmpty();
  });
  test("confirmPassword", IS_NOT_SAME_VALUE_MESSAGE, () => {
    enforce(data.confirmPassword).equals(data.password);
  });
});

export const validationLogin = create((data = {}) => {
  test("user_email", IS_REQUIRED_MESSAGE, () => {
    enforce(data.user_email).isNotEmpty();
  });
  test("user_email", IS_NOT_REGEX_VALID_MESSAGE, () => {
    enforce(data.user_email).matches(EMAIL_REGEX);
  });

  test("password", IS_REQUIRED_MESSAGE, () => {
    enforce(data.password).isNotEmpty();
  });
});

// export const validationForgotPassword = create((data = {}) => {
//   test('user_email', IS_REQUIRED_MESSAGE, () => {enforce(data.user_email).isNotEmpty()});
//   test('user_email', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.user_email).matches(EMAIL_REGEX)});
// })

// export const validationChangePassword = create((data = {}) => {
//   test('user_email', IS_REQUIRED_MESSAGE, () => {enforce(data.user_email).isNotEmpty()});
//   test('user_email', IS_NOT_REGEX_VALID_MESSAGE, () => {enforce(data.user_email).matches(EMAIL_REGEX)});

//   test('password', IS_REQUIRED_MESSAGE, () => {enforce(data.password).isNotEmpty()});
//   test('password', minLength(6), () => {enforce(data.password).longerThanOrEquals(6)});

//   test('confirmPassword', IS_REQUIRED_MESSAGE, () => {enforce(data.confirmPassword).isNotEmpty()});
//   test('confirmPassword', IS_NOT_SAME_VALUE_MESSAGE, () => {
//     enforce(data.confirmPassword).equals(data.password);
//   });

// })

// export const validationProfil = create((data = {}) => {
//   test('introduction', maxLength(250), () => {enforce(data.introduction).shorterThanOrEquals(250)});
//   test('hobby', maxLength(50), () => {enforce(data.hobby).shorterThanOrEquals(50)});
//   test('occupation', maxLength(50), () => {enforce(data.occupation).shorterThanOrEquals(50)});
//   test('facebook', maxLength(20), () => {enforce(data.facebook).shorterThanOrEquals(20)});
//   test('youtube', maxLength(20), () => {enforce(data.youtube).shorterThanOrEquals(20)});
//   test('instagram', maxLength(20), () => {enforce(data.instagram).shorterThanOrEquals(20)});
//   test('tiktok', maxLength(20), () => {enforce(data.tiktok).shorterThanOrEquals(20)});
//   test('kakao', maxLength(20), () => {enforce(data.kakao).shorterThanOrEquals(20)});
// })

export const errorField = (error) => {
  return {
    error: Boolean(error),
    helperText: error?.message || "",
  };
};
