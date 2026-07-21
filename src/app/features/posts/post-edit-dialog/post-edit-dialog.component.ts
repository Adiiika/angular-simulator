import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { Component, inject, NgModule } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { tap } from 'rxjs';
import { PostService } from '../post.service';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-edit-dialog',
  providers: [NgModule],
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})

export class PostEditDialogComponent {

  dynamicDialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);
  dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  formBuilder: FormBuilder = inject(FormBuilder);
  postService: PostService = inject(PostService);

  posts: Partial<IPost[]> = [];

  ngOnInit(): void {
    this.postService.posts$.subscribe(data => this.posts = data);
  }

  postForm: FormGroup = this.formBuilder.group({
    title: this.dynamicDialogConfig.data.title,
    tags: this.dynamicDialogConfig.data.tags.join(', '),
    views: this.dynamicDialogConfig.data.views,
  })

  onSubmit(): void {
    const formValue: IPost = this.postForm.value;

    const convertedData: Partial<IPost> = {
      title: this.postForm.value.title,
      tags: this.postForm.value.tags.split(', '),
      views: Number(formValue.views),
    }

    this.postService.updatePostInList(this.dynamicDialogConfig.data.id, convertedData)
      .pipe(
        tap(() => {
          this.dynamicDialogRef.close();
        })
      ).subscribe()
  }
}