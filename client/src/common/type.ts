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
  memberInfo: {
    memberId: number;
    nickname: string;
    profileImage: string;
  };
  categoryInfo: {
    categoryId: number;
    name: string;
  };
  tags: string[];
  locationInfo: {
    locationId: number;
    city: string;
    province: string;
  };
  postLikeCount:number;
  liked:boolean;
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
  postId: number;
  memberInfo: MemberInfo;
  locationInfo: LocationInfo;
  categoryInfo: CategoryInfo;
};

export type MemberInfo = {
  profileImage: string | null;
  nickname: string | null;
};

export type LocationInfo = {
  city: string;
  province: string;
};

export type CategoryInfo = {
  categoryId: number;
  name: string;
};

export type SignupData = {
  email: string;
  password: string;
  nickname: string;
  age: number | null;
  isMale: boolean | null;
  locationId: number | null;
  welcomeMsg: string;
};

export type LoginData = {
  username: string;
  password: string;
};

export type Member = {
  memberId: number;
  email: string;
  locationId: number;
  welcomeMsg: string;
  profileImage: string | null;
  nickname: string;
  isMale: boolean;
  age: number;
  createdAt: string;
  posts: CardData[];
};

export type SignupPatchData = {
  location: number;
  welcomeMsg: string;
  nickname: string;
  isMale: boolean;
  age: number;
};

export type Room = {
  roomId: number;
  roomName: string;
  lastMessage: string;
  lastSentTime: string;
  lastCheckTime: string;
};

export type ChatRoomData = {
  rooms: Room[];
};

export type ChatData = {
  memberId: number;
  nickname: string;
  content: string;
  sentTime: string;
};

export type PrevChatData = {
  chats: ChatData[];
};

export type PostChat = {
  content: string;
};

export type ChatMembers = {
  memberId: number;
};

export type IsLikedType = {
  isLiked: boolean;
  memberId: number;
  postId: string | undefined;
};
