export type RegionData = {
  [key: string]: string[];
};

export type PostData = {
  title: string;
  location: string;
  content: string;
  tags: string[];
  category: string;
  memberId: number;
};

export type CardData = {
  title: string;
  content: string;
  userImg: string;
  userName: string;
}

export type SignupData = {
  email: string;
  password: string;
  nickName: string;
  birthYear: number | null;
  gender: boolean | null;
  location: string | null;
  welcome_msg: string;
}

export type LoginData = {
  email: string;
  password: string;
}