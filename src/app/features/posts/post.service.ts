import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { MessageService } from '../../services/message.service';
import { LoaderService } from '../../services/loader.service';
import { PostApiService } from './post-api.service';
import { IPostResponce } from './IPostResponce';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})

export class PostService {

  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);
  private loadService: LoaderService = inject(LoaderService);

  postSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postSubject.asObservable();

  totalSubject: BehaviorSubject<IPostResponce['total']> = new BehaviorSubject<IPostResponce['total']>(0);
  totalRecords$: Observable<number> = this.totalSubject.asObservable();

  posts: IPost[] = [];

  setPosts(posts: IPost[], total: number): void {
    const combinedPosts = [...this.posts, ...posts];
    this.postSubject.next(combinedPosts);
    this.totalSubject.next(total + this.posts.length);
  }

  addPost(newPost: IPost): void {
    this.posts = [newPost, ...this.posts];
    this.setPosts(this.postSubject.value, this.totalSubject.value - this.posts.length + 1);
  }

  loadNewPosts(limit: number, skip: number): Observable<IPostResponce | { posts: never[] }> {
    return this.postApiService.getPosts(limit, skip)
      .pipe(
        catchError(() => {
          this.messageService.showError('Не удалось загрузить посты');
          return of({ posts: [] });
        })
      )
  }

  getPostById(id: number | string): Observable<IPost> {
    const numericId: number = Number(id);
    const localPost: IPost | undefined = this.posts.find((p: IPost) => p.id === numericId);

    if (localPost) {
      return of(localPost);
    }

    return this.postApiService.getPostById(numericId);
  }

  updatePostInList(id: number, data: Partial<IPost>): Observable<IPost> {
    const isLocal: IPost | undefined = this.posts.find((p: IPost) => p.id === id);
    const update$: Observable<IPost> = isLocal ? of({ ...this.posts.find((p: IPost) => p.id === id)!, ...data }) : this.postApiService.updatePosts(id, data);

    return update$.pipe(
      tap((updatedPost: IPost) => {
        this.updateState(id, updatedPost);
      })
    )
  }

  updateState(id: number, updatedPost: IPost): void {
    const currentPosts: IPost[] = this.postSubject.value;
    const updatedPosts: IPost[] = currentPosts.map((p: IPost) => p.id === id ? { ...p, ...updatedPost } : p);
    this.postSubject.next(updatedPosts);

    const localIndex: number = this.posts.findIndex((p: IPost) => p.id === id);

    if (localIndex !== -1) {
      this.posts[localIndex] = { ...this.posts[localIndex], ...updatedPost };
    }
  }

  createPostForm(postData: Partial<IPost>): Observable<Object> {
    return this.postApiService.createPost(postData)
      .pipe(
        tap((newPost: IPost) => {
          const fullPost: IPost = { ...postData, ...newPost };
          this.addPost(fullPost);
        }),
      )
  }

  deletePost(id: number): Observable<IPost> {
    const currentPosts: IPost[] = this.postSubject.value;
    const updatedLocalPosts: IPost[] = currentPosts.filter((p: IPost) => p.id !== id);
    this.postSubject.next(updatedLocalPosts);

    this.posts = this.posts.filter((p: IPost) => p.id !== id);
    this.loadService.hideLoader();

    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const updatedPosts: IPost[] = currentPosts.filter((p: IPost) => p.id !== id);
        this.postSubject.next(updatedPosts);
        this.loadService.hideLoader();
      }),
    )
  }
}