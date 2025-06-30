import { Component, inject, OnInit, Signal } from '@angular/core';
import { ISimpleProduct } from '@features/product/models/product.model';
import { LoadProducts } from '@features/product/store/product.actions';
import { ProductState } from '@features/product/store/product.state';
import { Store } from '@ngxs/store';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-products',
  imports: [ProductListComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private store = inject(Store);

  public products: Signal<ISimpleProduct[]> = this.store.selectSignal(
    ProductState.getProducts
  );

  public ngOnInit(): void {
    this.store.dispatch(new LoadProducts());
  }
}
