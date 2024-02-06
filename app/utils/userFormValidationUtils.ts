import { UserType } from "~/types";

const AT_LEAST_TWO_ALPHABETS_REGEX = /[a-zA-Z].*[a-zA-Z]/;
const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CONTACT_NUMBER_REGEX = /^(?:\+91|0)?[6-9]\d{9}$/;
const VALID_URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,})([/\w.-]*)*\/?$/i;

export const validateUser = (formEntries: Partial<UserType>): Partial<UserType> => {
  let errors: Partial<UserType> = {};

  errors.first_name = validateName(formEntries.first_name);
  errors.last_name = validateName(formEntries.last_name);
  errors.email = validateEmail(formEntries.email);
  errors.password = validatePassword(formEntries.password);
  errors.contact = validateContact(formEntries.contact);
  errors.avatar = validateAvatar(formEntries.avatar);

  return errors;
}

// Used for both first_name and last_name
const validateName = (name: string | undefined) => {
  if (!name || name.length === 0) return "can't be blank";
  if (name.length < 2) return "must have at least 2 characters";
  if (!AT_LEAST_TWO_ALPHABETS_REGEX.test(name)) return "must have at least 2 alphabets";
}

const validateEmail = (email: string | undefined) => {
  if (!email || email.length === 0) return "can't be blank";
  if (!VALID_EMAIL_REGEX.test(email)) return "must be a valid email address";
}

const validatePassword = (password: string | undefined) => {
  if (!password || password.length === 0) return "can't be blank";
  if (password.length < 6) return "length must be at least 6 characters";
}

const validateContact = (contact: string | undefined) => {
  if (contact && !VALID_CONTACT_NUMBER_REGEX.test(contact))
    return "must be a valid contact number";
}

const validateAvatar = (avatar: string | undefined) => {
  if (!avatar || avatar.length === 0) return "can't be blank";
  if (!VALID_URL_REGEX.test(avatar)) return "must be a valid URL";
}
