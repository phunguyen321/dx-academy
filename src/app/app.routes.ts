import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ListProductComponent } from './layout/list-product/list-product.component';
import { EditProductComponent } from './layout/edit-product/edit-product.component';

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
          import('./layout/edit-product/edit-product.component').then(
            (mod) => mod.EditProductComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./layout/edit-product/edit-product.component').then(
            (mod) => mod.EditProductComponent
          ),
      },
    ],
  },
];
