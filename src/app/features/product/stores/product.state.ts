import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import {
  AddToFavorites,
  LoadProducts,
  RemoveFromFavorites,
} from './product.actions';
import { ISimpleProduct } from '../models/product.model';
import { append, patch, removeItem } from '@ngxs/store/operators';

export interface ProductStateModel {
  products: ISimpleProduct[];
  favoriteIds: number[];
  isLoading: boolean;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
    favoriteIds: [],
    isLoading: false,
  },
})
@Injectable()
export class ProductState {
  private productService = inject(ProductService);

  @Selector()
  static getProducts(state: ProductStateModel): ISimpleProduct[] {
    return state.products;
  }

  @Selector()
  static getFavorites(state: ProductStateModel): ISimpleProduct[] {
    return state.products.filter(product =>
      state.favoriteIds.includes(product.id)
    );
  }

  @Selector()
  static getFavoriteIds(state: ProductStateModel): number[] {
    return state.favoriteIds;
  }

  @Action(LoadProducts, { cancelUncompleted: true })
  public loadProducts(
    ctx: StateContext<ProductStateModel>
  ): Observable<ISimpleProduct[]> {
    return this.productService
      .getProducts()
      .pipe(tap(products => ctx.patchState({ products })));
  }

  @Action(AddToFavorites)
  public addToFavorites(
    ctx: StateContext<ProductStateModel>,
    { productId }: AddToFavorites
  ): void {
    const currentFavoriteIds = ctx.getState().favoriteIds;
    if (currentFavoriteIds.includes(productId)) return;
    ctx.setState(
      patch<ProductStateModel>({
        favoriteIds: append<number>([productId]),
      })
    );
  }

  @Action(RemoveFromFavorites)
  public removeFromFavorites(
    ctx: StateContext<ProductStateModel>,
    { productId }: RemoveFromFavorites
  ): void {
    ctx.setState(
      patch<ProductStateModel>({
        favoriteIds: removeItem<number>(id => id === productId),
      })
    );
  }
}
