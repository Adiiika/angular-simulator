import { Routes } from '@angular/router';
import { postResolver } from './features/posts/post.resolver';
import { authGuard } from './features/auth/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { adminGuard } from './features/auth/admin.guard';
import { PostDetailComponent } from './features/posts/post-detail/post-detail.component';
import { PostCreateComponent } from '../app/features/posts/post-create/post-create.component';
import { UsersPageComponent } from '../app/users-page/users-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostsComponent } from '../app/features/posts/posts/posts.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/auth/layout/layout.component').then((module) => module.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'homePage',
        pathMatch: 'full',
      },
      {
        path: 'homePage',
        component: HomePageComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
        canActivate: [adminGuard],
      },
      {
        path: 'post/:id',
        component: PostDetailComponent,
        resolve: {
          postData: postResolver,
        },
      },
      {
        path: 'posts/create',
        component: PostCreateComponent,
      },

      {
        path: 'users',
        component: UsersPageComponent,
        canActivate: [adminGuard],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
  },
];
