import {
  addDoc,
  collection,
  doc,
  endAt,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"
import { db } from "./db.server"
import { PostType } from "~/types";

export const getUserPosts = async (userId: string, limit?: number) => {
  let posts: any = [];
  const q = query(
    collection(db, `users/${userId}/posts`),
    orderBy("created_at", "desc"),
    endAt(limit || 10000)
  );
  const querySnapshots = await getDocs(q);
  querySnapshots.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });
  return posts;
}

export const createUserPost = async (userId: string, postData: PostType) => {
  return await addDoc(collection(db, `users/${userId}/posts`), { ...postData });
}
