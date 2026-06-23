import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
// import { PostsComponent } from './features/posts/posts/posts.component';

export const routes: Routes = [
    {
        path: 'posts',
        loadComponent: () => import('./features/posts/posts/posts.component').then((m) => m.PostsComponent)
    },
    {
        path: 'homePage',
        loadComponent: () => import('./home-page/home-page.component').then((m) => m.HomePageComponent),
    },
    {
        path: 'users',
        loadComponent: () => import('./users-page/users-page.component').then((m) => m.UsersPageComponent),
    },
    {
        path: '**',
        loadComponent: () => import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
    },

];