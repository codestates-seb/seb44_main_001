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