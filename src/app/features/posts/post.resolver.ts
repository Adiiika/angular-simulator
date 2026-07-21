import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { PostService } from './post.service';
import { IPost } from './IPost';

export const postResolver: ResolveFn<any> = (route) => {

  const postId: string | null = route.paramMap.get('id');
  const postService: PostService = inject(PostService);

  if (!postId) return null as any;

  const localPost: IPost | undefined = postService.posts.find(p => p.id === Number(postId));

  if (localPost) {
    return of(localPost);
  }

  return postService.getPostById(Number(postId));
};