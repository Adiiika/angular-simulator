import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs'
import { LocalStorageService } from '../../../services/local-storage.service';
import { PostApiService } from '../post-api.service';
import { PostService } from '../post.service';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  postApiService: PostApiService = inject(PostApiService);
  postService: PostService = inject(PostService);
  router: Router = inject(Router);

  posts: IPost[] = [];

  postCreateForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('', Validators.required),
    tags: new FormControl('', Validators.required),
    reactions: new FormGroup({
      likes: new FormControl('', Validators.required),
      dislikes: new FormControl('', Validators.required),
    }),
    views: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  })

  onSubmit(): void {
    const newPost: IPost = {
      id:  this.posts.length + 1,
      title: this.postCreateForm.value.title,
      body: this.postCreateForm.value.body,
      tags: this.postCreateForm.value.tags ? this.postCreateForm.value.tags.split(',').map((tag: string) => tag.trim()) : [],
      reactions: {
        likes: Number(this.postCreateForm.value.reactions?.likes),
        dislikes: Number(this.postCreateForm.value.reactions?.dislikes),
      },
      views: Number(this.postCreateForm.value.views),
      userId: Number(this.postCreateForm.value.userId),
    }

    this.postService.createPostForm(newPost)
      .pipe(
        tap(() => {
          this.localStorageService.setItem('posts', newPost);
          this.router.navigate(['/posts']);
        })
      ).subscribe()
  }
}