import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore"
import { db } from "./db.server"
import { CommentType } from "~/types";

export const getComments = async (userId: string, postId: string) => {
  let comments: any = [];
  const q = query(
    collection(db, `users/${userId}/posts/${postId}/comments`),
    orderBy("created_at", "desc"),
  );
  const querySnapshots = await getDocs(q);
  querySnapshots.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });
  return comments;
}

export const createComment = async (
  userId: string,
  postId: string,
  commentData: CommentType,
) => {
  const collectionRef = collection(db, `users/${userId}/posts/${postId}/comments`)
  const commentSnap = await addDoc(collectionRef, { ...commentData, created_at: new Date() });
  return commentSnap.id; 
}
