import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { MessageService } from '../../../services/message.service';
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
  messageService: MessageService = inject(MessageService);
  postApiService: PostApiService = inject(PostApiService);
  postService: PostService = inject(PostService);
  router: Router = inject(Router);

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
  });

  onSubmit(): void {
    const formValue: IPost = this.postCreateForm.value;

    const newPost: Partial<IPost> = {
      title: formValue.title,
      body: formValue.body,
      tags: formValue.tags,
      reactions: {
        likes: Number(formValue.reactions?.likes),
        dislikes: Number(formValue.reactions?.dislikes),
      },
      views: Number(formValue.views),
      userId: Number(formValue.userId),
    };

    this.postService
      .createPostForm(newPost)
      .pipe(
        tap(() => {
          this.router.navigate(['/posts']);
        }),
        catchError(() => {
          return throwError(() => {
            this.messageService.showError('Не удалось создать пост!');
          });
        }),
      )
      .subscribe();
  }

}
