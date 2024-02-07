import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "./db.server";
import { UserType } from "~/types";
import { getBlankUser } from "./blankCollections";
import { destroyPost, getCommentsSnapshots, getPostLikesSnapshots, getPostsSnapshots } from "./posts";

export const login = async (email: string, password: string) => {
  let users: Array<UserType> = [];
  const q = query(
    collection(db, "users"),
    where("email", "==", email),
    where("password", "==", password)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({ ...getBlankUser(), id: doc.id, ...doc.data() });
  });

  if (users.length === 1) return users[0];
  return null;
}

export const getUsers = async () => {
  let users: Array<UserType> = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    users.push({ ...getBlankUser(), id: doc.id, ...doc.data() });
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
  await destroyAllPosts(userId);
  await destroyAllLikesOfUser(userId);
  await destroyAllCommentsOfUser(userId);
  await deleteDoc(doc(db, "users", userId));
}

const destroyAllPosts = async (userId: string) => {
  const postsSnapshots = await getPostsSnapshots(userId);
  postsSnapshots.forEach(async (doc) => await destroyPost(doc.id));
}

const destroyAllLikesOfUser = async (userId: string) => {
  const batch = writeBatch(db);
  const likesSnapshots = await getPostLikesSnapshots(userId);
  likesSnapshots.forEach((doc) => { batch.delete(doc.ref) });
  await batch.commit();
}

const destroyAllCommentsOfUser = async (userId: string) => {
  const batch = writeBatch(db);
  const commentsSnapshots = await getCommentsSnapshots(undefined, userId);
  commentsSnapshots.forEach((doc) => { batch.delete(doc.ref) });
  await batch.commit();
}
