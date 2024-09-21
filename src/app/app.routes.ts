import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ListProductComponent } from './layout/list-product/list-product.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { redirectTo: 'login', path: '', pathMatch: 'full' },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () =>
      import('./layout/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'product',
    canActivate: [authGuard],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./layout/list-product/list-product.component').then(
            (mod) => mod.ListProductComponent
          ),
      },
      {
        path: 'edit:idProduct',
        loadComponent: () =>
          import('./layout/detail-product/detail-product.component').then(
            (mod) => mod.DetailProductComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./layout/detail-product/detail-product.component').then(
            (mod) => mod.DetailProductComponent
          ),
      },
    ],
  },
  {
    path: 'category',
    canActivate: [authGuard],
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import(
            './layout/category/list-category/list-category.component'
          ).then((mod) => mod.ListCategoryComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './layout/category/detail-category/detail-category.component'
          ).then((mod) => mod.DetailCategoryComponent),
      },
    ],
  },
];
