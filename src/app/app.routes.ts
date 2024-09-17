import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ListProductComponent } from './layout/list-product/list-product.component';

export const routes: Routes = [
    {redirectTo:'login', path:'', pathMatch: 'full'},
    {component: LoginComponent, path: 'login', pathMatch: 'full'},
    {component: ListProductComponent, path: 'list'}
];
