import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { ProductsComponent } from './components/products/products.component';
import { ListComponent } from './components/list/list.component';
import { ListDetailComponent } from './components/list-detail/list-detail.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
   { path: 'products', component: ProductsComponent},
   { path: 'List', component: ListComponent},
   {path:'list-detail/:id', component: ListDetailComponent},
   {path: 'home', component: HomeComponent}
];