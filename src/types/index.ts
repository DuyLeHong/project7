export interface BookmarkedBy {
  email: string;
  uid: string;
}
export interface Idea {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  votes: number;
  comments: Comment[];
  votedUsers: string[];
  bookmarkedBy: BookmarkedBy[];
}

export interface Comment {
  id: string;
  user: string;
  content: string;
  createdAt: string;
}
