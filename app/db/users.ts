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
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return { id: userId, ...docSnap.data() } as UserType;
}

export const createUser = async (userData: UserType) => {
  return await addDoc(collection(db, "users"), { ...userData });
}

export const updateUser = async (userId: string, userData: UserType) => {
  await setDoc(doc(db, "users", userId), userData);
}

export const destroyUser = async (userId: string) => {
  await deleteDoc(doc(db, "users", userId));
}