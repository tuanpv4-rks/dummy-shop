import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@core/components/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products',
        title: 'Products',
        loadComponent: () =>
          import('@features/product/pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'favorites',
        title: 'Favorites',
        loadComponent: () =>
          import('@features/product/pages/favorites/favorites.component').then(
            (c) => c.FavoritesComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@features/auth/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
