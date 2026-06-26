export interface IPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
}
