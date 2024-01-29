export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: string;
  contact: string;
  about: string;
}

export type PostType = {
  id: string;
  title: string;
  description: string;
  photo: string;
  created_at: any;
}

export type CommentType = {
  id: string;
  description: string;
}
