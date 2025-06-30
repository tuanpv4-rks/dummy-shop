import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
    path: '**',
    redirectTo: '/',
  },
];
