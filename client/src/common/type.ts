export type RegionData = {
  [key: string]: string[];
};

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
  postId:number;
};

export type SignupData = {
  email: string;
  password: string;
  nickName: string;
  birthYear: number | null;
  gender: boolean | null;
  location: string | null;
  welcome_msg: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type Member = {
  memberId: number,
  email: string,
  password: string,
  location: string,
  welcomeMsg: number,
  profileImage: string | null,
  nickname: string,
  isMale: boolean,
  age: number,
  createdAt: string,
  posts: CardData[],
  comments: string[],
  sentMessages: string[],
  receivedMessages: string[]
};