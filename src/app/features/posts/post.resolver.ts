import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { PostService } from './post.service';
import { IPost } from './IPost';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot) => {
  const postId: string | null = route.paramMap.get('id');
  const postService: PostService = inject(PostService);
  const localPost: IPost | undefined = postService.postsSubject.value.find(
    (p: IPost) => p.id === Number(postId),
  );

  if (localPost) {
    return of(localPost);
  }

  return postService.getPostById(Number(postId));
};
