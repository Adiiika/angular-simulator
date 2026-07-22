import { IPost } from "./IPost";

export interface IPostResponce {
  posts: IPost[];
  total: number;
  skip: number;
  limit: number;
}
