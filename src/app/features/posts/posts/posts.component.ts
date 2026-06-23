import { Component, inject, OnInit } from '@angular/core';
import { TableModule, Table } from 'primeng/table';
import { IPost } from '../IPost';
import { PostService } from '../post.service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-posts',
  imports: [TableModule, RouterOutlet],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {

  postService: PostService = inject(PostService);

}
