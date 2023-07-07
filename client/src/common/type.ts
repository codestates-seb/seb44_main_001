export type RegionData = {
  [key: string]: string[];
};

export type PostData = {
  title: string;
  content: string;
  memberId: number;
  categoryId: number;
  tags: string[];
  locationId: number;
};

export type CardData = {
  title: string;
  content: string;
  userImg: string;
  userName: string;
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
}

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
}
