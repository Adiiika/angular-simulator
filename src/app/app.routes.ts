import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { MessageComponent } from './message/message.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'users', component: UsersPageComponent },
    { path: '**', component: NotFoundPageComponent },
];
