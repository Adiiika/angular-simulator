import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, tap, throwError } from 'rxjs';
import { PostService } from '../post.service';
import { IPost } from '../IPost';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-post-edit-dialog',
  providers: [NgModule],
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  formBuilder: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);
  messageService: MessageService = inject(MessageService);

  posts: Partial<IPost[]> = [];

  ngOnInit(): void {
    this.postService.posts$.subscribe((data) => (this.posts = data));
  }

  postForm: FormGroup = this.formBuilder.group({
    title: this.dynamicDialogConfig.data.title,
    tags: [this.dynamicDialogConfig.data.tags],
    views: this.dynamicDialogConfig.data.views,
  });

  onSubmit(): void {
    const formValue: IPost = this.postForm.value;

    const convertedData: Partial<IPost> = {
      title: formValue.title,
      tags: formValue.tags,
      views: Number(formValue.views),
    };

    this.postService
      .updatePostInList(this.dynamicDialogConfig.data.id, convertedData)
      .pipe(
        tap(() => {
          this.dynamicDialogRef.close();
        }),
        catchError(() => {
          return throwError(() => {
            this.messageService.showError('Не удалось обновить пост!');
          });
        }),
      )
      .subscribe();
  }

}
