export interface IPostResponce {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: object;
    views: number;
    userId: number;
}