export type MatchAnyField<T> = {
  [K in keyof T]: any;
};

export type OutletContextType = {
  currentUser: UserType;
}

// users
export type UserType = {
  id: string; // auto-generated
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
  contact: string;
  about: string;
  created_at: Date;
}

// users > posts
export type PostType = {
  id: string; // auto-generated
  user_id: string;
  title: string;
  description: string;
  photo: string;
  created_at: Date;
}

// post_likes
export type PostLikeType = {
  id: string; // auto-generated
  post_id: string;
  user_id: string;
}

// post_comments
export type PostCommentType = {
  id: string; // auto-generated
  post_id: string;
  user_id: string;
  description: string;
  commented_at: Date;
}

export type CommentType = {
  id?: string;
  description?: string;
  liked?: boolean;
  disliked?: boolean;
  pinned?: boolean;
}
