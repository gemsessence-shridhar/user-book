import { v4 as uuidv4 } from 'uuid';
import { PostLikeType, PostType } from "~/types";

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