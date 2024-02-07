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
  writeBatch,
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

export const getPostsSnapshots = async (userId?: string, limit?: number) => {
  let postsQuery = query(collection(db, `posts`));

  if (userId)
    postsQuery = query(postsQuery, where("user_id", "==", userId))
  if (limit)
    postsQuery = query(postsQuery, endAt(limit));

  postsQuery = query(postsQuery, orderBy("created_at", "desc"))
  return await getDocs(postsQuery);
}

// we will implement infinite scroll with pagination
export const getPosts = async (userId?: string, limit?: number) => {
  let posts: Array<PostType> = [];
  const querySnapshots = await getPostsSnapshots(userId, limit);
  querySnapshots.forEach((doc) => {
    posts.push({ ...getBlankPost(), id: doc.id, ...doc.data() });
  });
  return posts;
}

export const destroyPost = async (postId: string) => {
  await destroyPostLikes(postId);
  await destroyAllComments(postId);
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

export const getPostLikesSnapshots = async (userId?: string, postId?: string) => {
  let likesQuery = query(collection(db, `post_likes`));
  if (userId)
    likesQuery = query(likesQuery, where("user_id", "==", userId));
  if (postId)
    likesQuery = query(likesQuery, where("post_id", "==", postId));

  return await getDocs(likesQuery);
}

export const getPostLikes = async () => {
  let likes: Array<PostLikeType> = [];
  const querySnapshots = await getPostLikesSnapshots();
  querySnapshots.forEach((doc) => {
    likes.push({ ...getBlankPostLike(), id: doc.id, ...doc.data() });
  });
  return likes;
}

export const destroyPostLikes = async (postId: string) => {
  const batch = writeBatch(db);
  let likeQuery = query(collection(db, "post_likes"), where("post_id", "==", postId));
  const likesSnapshots = await getDocs(likeQuery);
  likesSnapshots.forEach((doc) => { batch.delete(doc.ref) });
  await batch.commit();
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

export const getCommentsSnapshots = async (postId?: string, userId?: string) => {
  let commentsQuery = query(collection(db, `post_comments`));
  if (postId) {
    commentsQuery = query(commentsQuery, where("post_id", "==", postId));
  }
  if (userId) {
    commentsQuery = query(commentsQuery, where("user_id", "==", userId));
  }
  return await getDocs(commentsQuery);
}

export const getComments = async (postId?: string, userId?: string) => {
  let comments: Array<PostCommentType> = [];
  const commentsSnapshots = await getCommentsSnapshots(postId, userId);
  commentsSnapshots.forEach((doc) => {
    comments.push({ ...getBlankComment(), id: doc.id, ...doc.data() });
  });
  return comments;
}

export const destroyAllComments = async (postId: string) => {
  const batch = writeBatch(db);
  const commentsSnapshots = await getCommentsSnapshots(postId);
  commentsSnapshots.forEach((doc) => { batch.delete(doc.ref) });
  await batch.commit();
}
