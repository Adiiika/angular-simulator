import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('https://dummyjson.com/posts')
  }
}