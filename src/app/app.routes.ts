import { Routes } from '@angular/router';
import { postResolver } from './features/posts/post.resolver';
import { authGuard } from './features/auth/auth.guard';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./features/auth/layout/layout.component').then(module => module.LayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'homePage',
                pathMatch: 'full'
            },
            {
                path: 'homePage',
                loadComponent: () => import('./home-page/home-page.component').then(
                    (module => module.HomePageComponent),
                ),
            },
            {
                path: 'post/:id',
                loadComponent: () => import('./features/posts/post-detail/post-detail.component').then(module => module.PostDetailComponent),
                resolve: {
                    postData: postResolver,
                },
            },
            {
                path: 'posts/create',
                loadComponent: () => import('../app/features/posts/post-create/post-create.component').then(module => module.PostCreateComponent),
            },

            {
                path: 'posts',
                loadComponent: () => import('../app/features/posts/posts/posts.component').then(module => module.PostsComponent),
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('../app/users-page/users-page.component').then(
                        (module) => module.UsersPageComponent
                    ),
            },
        ],
    },
    {
        path: '**',
        loadComponent: () => import('./not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent),
    },
];