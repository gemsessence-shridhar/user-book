import { v4 as uuidv4 } from 'uuid';
import { PostCommentType, PostLikeType, PostType, UserType } from "~/types";

export const getBlankUser = (): UserType => ({
  id: uuidv4(),
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  contact: "",
  about: "",
  avatar: "",
  created_at: new Date(),
})

export const getBlankPost = (): PostType => ({
  id: uuidv4(),
  user_id: "",
  title: "",
  description: "",
  photo: "",
  created_at: new Date(),
})

export const getBlankPostLike = (): PostLikeType => ({
  id: uuidv4(),
  post_id: "",
  user_id: "",
})

export const getBlankComment = (): PostCommentType => ({
  id: uuidv4(),
  commented_at: new Date(),
  description: "",
  post_id: "",
  user_id: "",
})
