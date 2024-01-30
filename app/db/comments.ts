import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore"
import { db } from "./db.server"
import { CommentType, MatchAnyField } from "~/types";

export const getComments = async (userId: string, postId: string) => {
  let comments: any = [];
  const q = query(
    collection(db, `users/${userId}/posts/${postId}/comments`),
    orderBy("pinned", "desc"),
    orderBy("created_at", "desc"),
  );
  const querySnapshots = await getDocs(q);
  querySnapshots.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });
  return comments;
}

export const getComment = async (
  userId:string,
  postId: string,
  commentId: string,
) => {
  const docRef = doc(db, `users/${userId}/posts/${postId}/comments/${commentId}`);
  const comment = await getDoc(docRef);
  return comment.data();
}

export const createComment = async (
  userId: string,
  postId: string,
  commentData: CommentType,
) => {
  const collectionRef = collection(db, `users/${userId}/posts/${postId}/comments`)
  const commentSnap = await addDoc(collectionRef, {
    liked: null,
    disliked: null,
    pinned: null,
    created_at: new Date(),
    ...commentData,
  });
  return commentSnap.id; 
}

export const updateComment = async (
  userId:string,
  postId: string,
  commentId: string,
  commentData: MatchAnyField<CommentType>,
) => {
  const comment: any = await getComment(userId, postId, commentId);
  const docRef = doc(db, `users/${userId}/posts/${postId}/comments/${commentId}`);
  await setDoc(docRef, { ...comment, ...commentData });
}

export const destroyComment = async (
  userId: string,
  postId: string,
  commentId: string,
) => {
  const docRef = doc(db, `users/${userId}/posts/${postId}/comments/${commentId}`);
  return await deleteDoc(docRef);
}
