import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ISimpleProduct } from '../models/product.model';

import { ProductState, ProductStateModel } from './product.state';
import {
  LoadProducts,
  AddToFavorites,
  RemoveFromFavorites,
} from './product.actions';

describe('ProductState', () => {
  let store: Store;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts: ISimpleProduct[] = [
    { id: 1, title: 'Product 1', price: 10, description: 'Desc 1', thumbnail: 'thumb1.jpg' },
    { id: 2, title: 'Product 2', price: 20, description: 'Desc 2', thumbnail: 'thumb2.jpg' },
  ];

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ProductState])],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
    });

    store = TestBed.inject(Store);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should have correct initial state', () => {
    const state: ProductStateModel = store.selectSnapshot(s => s.product);
    expect(state.products).toEqual([]);
    expect(state.favoriteIds).toEqual([]);
    expect(state.isLoading).toBe(false);
  });

  describe('Actions', () => {
    it('should dispatch LoadProducts action and update state', () => {
      productService.getProducts.and.returnValue(of(mockProducts));

      store.dispatch(new LoadProducts());

      const state: ProductStateModel = store.selectSnapshot(s => s.product);
      expect(productService.getProducts).toHaveBeenCalled();
      expect(state.products).toEqual(mockProducts);
    });

    it('should dispatch AddToFavorites action and update favoriteIds', () => {
      store.reset({ product: { products: [], favoriteIds: [], isLoading: false } });
      store.dispatch(new AddToFavorites(1));

      const favoriteIds = store.selectSnapshot(ProductState.getFavoriteIds);
      expect(favoriteIds).toEqual([1]);
    });

    it('should dispatch RemoveFromFavorites action and update favoriteIds', () => {
      store.reset({ product: { products: [], favoriteIds: [1, 2], isLoading: false } });
      store.dispatch(new RemoveFromFavorites(1));

      const favoriteIds = store.selectSnapshot(ProductState.getFavoriteIds);
      expect(favoriteIds).toEqual([2]);
    });
  });

  describe('Selectors', () => {
    const fullState = {
      product: {
        products: mockProducts,
        favoriteIds: [1],
        isLoading: false,
      },
    };

    it('should return correct values from getProducts selector', () => {
      store.reset(fullState);
      const products = store.selectSnapshot(ProductState.getProducts);
      expect(products).toEqual(mockProducts);
    });

    it('should return correct values from getFavorites selector', () => {
      store.reset(fullState);
      const favorites = store.selectSnapshot(ProductState.getFavorites);
      expect(favorites).toEqual([mockProducts[0]]);
    });

    it('should return correct values from getFavoriteIds selector', () => {
      store.reset(fullState);
      const favoriteIds = store.selectSnapshot(ProductState.getFavoriteIds);
      expect(favoriteIds).toEqual([1]);
    });
  });
});
