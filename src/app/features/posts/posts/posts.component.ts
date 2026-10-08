import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { MenuItem, LazyLoadEvent } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PostService } from '../post.service';
import { PostApiService } from '../post-api.service';
import { MessageService } from '../../../services/message.service';
import { LoaderService } from '../../../services/loader.service';
import { IPost } from '../IPost';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { IPostResponce } from '../IPostResponce';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-posts',
  imports: [TableModule, AsyncPipe, SkeletonModule, ContextMenuModule, PaginatorModule, RouterLink, TranslatePipe],
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  translateService: TranslateService = inject(TranslateService);
  dialogService: DialogService = inject(DialogService);
  postApiService: PostApiService = inject(PostApiService);
  messageService: MessageService = inject(MessageService);
  loadService: LoaderService = inject(LoaderService);
  postService: PostService = inject(PostService);
  translatedHeader = this.translateService.instant('postEditSection.postEditTitle');
  
  translatedLabelView = this.translateService.instant('postsSection.postListLabel.detail');
  translatedLabelEdit = this.translateService.instant('postsSection.postListLabel.edit');
  translatedLabelDelete = this.translateService.instant('postsSection.postListLabel.delete');

  router: Router = inject(Router);

  selectedProduct: IPost | null = null;
  skeletonRows: string[] = new Array(10);
  pageSize: number = 5;
  posts: IPost[] = [];
  first: number = 0;

  menuPost: MenuItem[] = [
    {
      label: this.translatedLabelView,
      command: () => {
        if (this.selectedProduct?.id) {
          this.viewPost(this.selectedProduct?.id);
        }
      },
    },
    {
      label: this.translatedLabelEdit,
      command: () => {
        this.showDialog();
      },
    },
    {
      label: this.translatedLabelDelete,
      command: () => {
        if (this.selectedProduct?.id) {
          this.onDelete(this.selectedProduct?.id);
        }
      },
    },
  ];

  ngOnInit(): void {
    this.loadPosts(this.pageSize, this.first);
  }

  loadPosts(limit: number, skip: number): void {
    this.postService
      .loadNewPosts(limit, skip)
      .pipe(
        tap((response: IPostResponce) => {
          this.loadService.showLoader();
          this.postService.setPosts(response.posts, response.total);
        }),
        finalize(() => {
          this.loadService.hideLoader();
        }),
      )
      .subscribe();
  }

  showDialog(): void {
    this.dialogService.open(PostEditDialogComponent, {
      header: this.translatedHeader,
      width: '25vw',
      height: '30vw',
      contentStyle: {
        overflow: 'auto',
      },
      data: this.selectedProduct,
      draggable: false,
    });
  }

  onPageChange(event: LazyLoadEvent): void {
    if (event.rows !== undefined && event.first !== undefined) {
      this.loadPosts(event.rows, event.first);
      this.loadService.hideLoader();
    }
  }

  viewPost(id: number): void {
    this.router.navigate([`/post/${ id }`]);
  }

  onDelete(id: number): void {
    this.postService.deletePost(id);
  }

}
