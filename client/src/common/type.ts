export type Location = {
  locationId: number;
  city: string;
  province: string;
};

export type Locations = Location[];

export type Category = {
  name: string;
  categoryId: number;
};

export type Categories = Category[];

export type ArticleToPost = {
  title: string;
  content: string;
  memberId: number;
  categoryId: number;
  tags: string[];
  locationId: number;
};

export type ArticleToGet = {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  editedAt: string;
  memberId: number;
  categoryId: number;
  tags: string[];
  locationId: number;
};

export type CommentToPost = {
  memberId: number;
  content: string;
};

export type CommentToGet = {
  commentId: number;
  content: string;
  isPostWriter: boolean;
  createdAt: string;
  editedAt: string;
  memberInfo: {
    memberId: number;
    nickname: string;
    image: string;
  };
};

export type CommentPageInfoToGet = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type CommentListToGet = {
  pageInfo: CommentPageInfoToGet;
  data: CommentToGet[];
};

export type CardData = {
  title: string;
  content: string;
  userImg: string;
  userName: string;
  postId: number;
};

export type SignupData = {
  email: string;
  password: string;
  nickName: string;
  birthYear: number | null;
  gender: boolean | null;
  location: number | null;
  welcomeMsg: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type Member = {
  memberId: number;
  email: string;
  password: string;
  location: string;
  welcomeMsg: number;
  profileImage: string | null;
  nickname: string;
  isMale: boolean;
  age: number;
  createdAt: string;
  posts: CardData[];
  comments: string[];
  sentMessages: string[];
  receivedMessages: string[];
};
