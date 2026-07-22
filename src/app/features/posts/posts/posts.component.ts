import { Component, inject, } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, throwError } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog'
import { ContextMenuModule } from 'primeng/contextmenu';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { MenuItem, LazyLoadEvent } from 'primeng/api';
import { PostService } from '../post.service';
import { PostApiService } from '../post-api.service';
import { MessageService } from '../../../services/message.service';
import { LoaderService } from '../../../services/loader.service';
import { IPost } from '../IPost';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { IPostResponce } from '../IPostResponce';

@Component({
  selector: 'app-posts',
  imports: [TableModule, AsyncPipe, SkeletonModule, ContextMenuModule, NgFor, PaginatorModule, RouterLink],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {

  postService: PostService = inject(PostService);
  loadService: LoaderService = inject(LoaderService);
  dialogService: DialogService = inject(DialogService);
  postApiService: PostApiService = inject(PostApiService);
  messageService: MessageService = inject(MessageService);

  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);

  selectedProduct: IPost | null = {} as IPost;
  skeletonRows: Array<string> = new Array(10);
  pageSize: number = 5;
  posts: IPost[] = [];
  first: number = 0;

  menuPost: MenuItem[] = [
    {
      label: 'Просмотр',
      command: () => {
        if (this.selectedProduct?.id) {
          this.viewPost(this.selectedProduct?.id);
        }
      }
    },
    {
      label: 'Редактировать',
      command: () => {
        this.showDialog();
      }
    },
    {
      label: 'Удалить',
      command: () => {
        this.onDelete();
      }
    }
  ]

  ngOnInit(): void {
    this.loadPosts(this.pageSize, this.first);
  }

  loadPosts(limit: number, skip: number): void {
    this.postService.loadNewPosts(limit, skip)
      .pipe(
        map((response: IPostResponce | { posts: never[] }) => {
          const total: number = 'total' in response ? response.total : 0;
          this.postService.setPosts(response.posts, total);
          this.loadService.showLoader();
        }),
        finalize(() => {
          this.loadService.hideLoader();
        })
      ).subscribe();
  }

  showDialog(): void {
    this.dialogService.open(PostEditDialogComponent, {
      header: 'Редактирование поста',
      width: '25vw',
      height: '30vw',
      contentStyle: {
        overflow: 'auto'
      },
      data: this.selectedProduct,
      draggable: false,
    })
  }

  onPageChange(event: LazyLoadEvent): void {
    if (event.rows && event.first) {
      this.loadPosts(event.rows, event.first);
      this.loadService.hideLoader();
    }
  }

  viewPost(id: number): void {
    this.router.navigate([`/post/${id}`]);
  }

  onDelete(): void {
    if (this.selectedProduct) {
      this.postService.deletePost(this.selectedProduct.id).pipe(
        catchError(() => {
          return throwError(() => {
            this.messageService.showError('Не удалось удалить пост!');
          })
        }))
    }
  }
}