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
  where,
} from "firebase/firestore";
import { db } from "./db.server";
import { getBlankComment, getBlankPost, getBlankPostLike } from "./blankCollections";
import { PostCommentType, PostLikeType, PostType } from "~/types";


export const createPost = async (
  userId: string,
  postData: Pick<PostType, 'title' | 'description' | 'photo'>,
) => {
  const post: PostType = { ...getBlankPost(), ...postData, user_id: userId }
  await setDoc(doc(db, `posts`, post.id), post);
}

export const updatePost = async (
  postId: string,
  updatedData: Pick<PostType, 'title' | 'description' | 'photo'>,
) => {
  const post = await getPost(postId);
  await setDoc(doc(db, `posts/${postId}`), { ...post, ...updatedData });
}

export const getPost = async (postId: string) => {
  const postSnap = await getDoc(doc(db, `posts/${postId}`));
  return postSnap.data() as PostType;
}

// we will implement infinite scroll with pagination
export const getPosts = async (userId?: string, limit?: number) => {
  let posts: Array<PostType> = [];
  const postsCollection = collection(db, `posts`);
  let postsQuery = query(postsCollection);
  if (userId) {
    postsQuery = query(postsQuery, where("user_id", "==", userId))
  }
  if (limit) {
    postsQuery = query(postsQuery, endAt(limit));
  }
  postsQuery = query(postsQuery, orderBy("created_at", "desc"))

  const querySnapshots = await getDocs(postsQuery);
  querySnapshots.forEach((doc) => {
    posts.push({ ...getBlankPost(), id: doc.id, ...doc.data() });
  });
  return posts;
}

export const destroyPost = async (postId: string) => {
  await deleteDoc(doc(db, `posts/${postId}`));
}

// post > likes

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

// post > comments

export const commentForAPost = async (userId: string, postId: string, description: string) => {
  const commentData: PostCommentType = {
    ...getBlankComment(),
    description,
    post_id: postId,
    user_id: userId,
  };
  await setDoc(doc(db, 'post_comments', commentData.id), commentData);
  return commentData.id;
}

export const getComments = async () => {
  let comments: Array<PostCommentType> = [];
  const querySnapshots = await getDocs(collection(db, `post_comments`));
  querySnapshots.forEach((doc) => {
    comments.push({ ...getBlankComment(), id: doc.id, ...doc.data() });
  });
  return comments;
}
