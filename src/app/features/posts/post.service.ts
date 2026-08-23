import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
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

  postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  totalSubject: BehaviorSubject<IPostResponce['total']> = new BehaviorSubject<
    IPostResponce['total']
  >(0);

  totalRecords$: Observable<number> = this.totalSubject.asObservable();

  setPosts(posts: IPost[], total: number): void {
    const currentPosts: IPost[] = this.postsSubject.value;
    const newlyCreatedPost: IPost = currentPosts[0];

    const isCreatedPost: boolean =
      newlyCreatedPost && !posts.some((p: IPost) => p.id === newlyCreatedPost.id);
    const finalPosts: IPost[] = isCreatedPost ? [newlyCreatedPost, ...posts] : posts;

    this.postsSubject.next(finalPosts);
    this.totalSubject.next(isCreatedPost ? total + 1 : total);
  }

  addPost(newPost: IPost): void {
    const currentPosts: IPost[] = this.postsSubject.value;
    this.postsSubject.next([newPost, ...currentPosts]);
    this.totalSubject.next(this.totalSubject.value + 1);
  }

  loadNewPosts(limit: number, skip: number): Observable<IPostResponce> {
    return this.postApiService.getPost(limit, skip).pipe(
      catchError(() => {
        this.messageService.showError('Не удалось загрузить посты');
        return of();
      }),
    );
  }

  getPostById(id: number): Observable<IPost> {
    const currentPosts: IPost[] = this.postsSubject.value;

    const numericId: number = Number(id);
    const localPost: IPost | undefined = currentPosts.find((p: IPost) => p.id === numericId);

    if (localPost) {
      return of(localPost);
    }

    return this.postApiService.getPostById(numericId);
  }

  updatePostInList(id: number, data: Partial<IPost>): Observable<IPost> {
    const currentPosts: IPost[] = this.postsSubject.value;

    const isLocal: IPost | undefined = currentPosts.find((p: IPost) => p.id === id);
    const update$: Observable<IPost> = isLocal
      ? of({ ...isLocal, ...data })
      : this.postApiService.updatePosts(id, data);

    return update$.pipe(
      tap((updatedPost: IPost) => {
        this.updateState(id, updatedPost);
      }),
    );
  }

  updateState(id: number, updatedPost: Partial<IPost>) {
    const currentPosts: IPost[] = this.postsSubject.value;
    const updatedPosts: IPost[] = currentPosts.map((p: IPost) =>
      p.id === id ? { ...p, ...updatedPost } : p,
    );
    this.postsSubject.next(updatedPosts);
  }

  createPostForm(postData: Partial<IPost>): Observable<IPost> {
    return this.postApiService.createPost(postData).pipe(
      tap((newPost: IPost) => {
        const fullPost: IPost = { ...postData, ...newPost };
        this.addPost(fullPost);
      }),
    );
  }

  deletePost(id: number): Observable<IPost> {
    const currentPosts: IPost[] = this.postsSubject.value;
    const updatedLocalPosts: IPost[] = currentPosts.filter((p: IPost) => p.id !== id);
    this.postsSubject.next(updatedLocalPosts);

    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const updatedPosts: IPost[] = currentPosts.filter((p: IPost) => p.id !== id);
        this.postsSubject.next(updatedPosts);
        this.loadService.hideLoader();
      }),
    );
  }

}
