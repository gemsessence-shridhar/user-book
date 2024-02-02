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
} from "firebase/firestore"
import { db } from "./db.server"
import { getBlankPost, getBlankPostLike } from "./blankCollections";
import { PostLikeType, PostType } from "~/types";


export const createPost = async (
  userId: string,
  postData: Pick<PostType, 'title' | 'description' | 'photo'>,
) => {
  const post: PostType = { ...getBlankPost(), ...postData, user_id: userId }
  const docRef = doc(db, `users/${userId}/posts`, post.id);
  await setDoc(docRef, post);
}

export const updatePost = async (
  userId: string,
  postId: string,
  updatedData: Pick<PostType, 'title' | 'description' | 'photo'>,
) => {
  const post = await getPost(userId, postId);
  const docRef = doc(db, `users/${userId}/posts/${postId}`);
  await setDoc(docRef, { ...post, updatedData });
}

export const getPost = async (userId: string, postId: string) => {
  const docRef = doc(db, `users/${userId}/posts/${postId}`);
  const postSnap = await getDoc(docRef);
  return postSnap.data() as PostType;
}

export const getPosts = async (userId: string, limit?: number) => {
  let posts: Array<PostType> = [];
  const q = query(
    collection(db, `users/${userId}/posts`),
    orderBy("created_at", "desc"),
    endAt(limit || 10000)
  );
  const querySnapshots = await getDocs(q);
  querySnapshots.forEach((doc) => {
    posts.push({ ...getBlankPost(), id: doc.id, ...doc.data() });
  });
  return posts;
}

export const destroyPost = async (userId: string, postId: string) => {
  const docRef = doc(db, `users/${userId}/posts/${postId}`);
  await deleteDoc(docRef);
}

export const likePost = async (userId: string, postId: string) => {
  const likeData: PostLikeType = { ...getBlankPostLike(), post_id: postId, user_id: userId };
  await setDoc(doc(db, 'post_likes', likeData.id), likeData);
}

export const unlikePost = async (likeId: string) => {
  const docRef = doc(db, `post_likes/${likeId}`);
  await deleteDoc(docRef);
}

export const getPostLikes = async () => {
  let likes: Array<PostLikeType> = [];
  const querySnapshots = await getDocs(collection(db, `post_likes`));
  querySnapshots.forEach((doc) => {
    likes.push({ ...getBlankPostLike(), id: doc.id, ...doc.data() });
  });
  return likes;
}
