import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostResponce } from './IPostResponce';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);

  getPost(limit: number, skip: number): Observable<IPostResponce> {
    return this.http.get<IPostResponce>(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);
  }

  getPostById(id: string | null | number): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${id}`);
  }

  updatePosts(id: number, data: Partial<IPost>): Observable<IPost> {
    return this.http.put<IPost>(`https://dummyjson.com/posts/${id}`, data);
  }

  deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`https://dummyjson.com/posts/${id}`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>('https://dummyjson.com/posts/add', post);
  }

}
