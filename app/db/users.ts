import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./db.server";
import { UserType } from "~/types";
import { getBlankUser } from "./blankCollections";

export const login = async (email: string, password: string) => {
  let users: any = [];
  const q = query(
    collection(db, "users"),
    where("email", "==", email),
    where("password", "==", password)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });

  if (users.length === 1) return users[0];
  return null;
}

export const getUsers = async () => {
  let users: any = [];
  const q = query(collection(db, "users"), where("type", "==", "user"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
}

export const getUser = async (userId: string) => {
  const docSnap = await getDoc(doc(db, "users", userId));
  return docSnap.data() as UserType;
}

type UserDataType = Pick<UserType, "first_name"
  | "last_name"
  | "email"
  | "password"
  | "contact"
  | "about"
  | "avatar"
>
export const createUser = async (userData: UserDataType) => {
  const newUserData = { ...getBlankUser(), ...userData };
  await setDoc(doc(db, "users", newUserData.id), newUserData);
}

export const updateUser = async (userId: string, userData: UserType) => {
  const user = await getUser(userId);
  await setDoc(doc(db, "users", userId), { ...user, ...userData });
}

export const destroyUser = async (userId: string) => {
  await deleteDoc(doc(db, "users", userId));
}