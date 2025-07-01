import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Store } from '@ngxs/store';
import { ProductState } from '@features/product/stores/product.state';
import { ISimpleProduct } from '@features/product/models/product.model';

@Component({
  selector: 'app-favorites',
  imports: [ProductListComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store);

  public favorites = signal<ISimpleProduct[]>([]);

  public ngOnInit(): void {
    const favorites = this.store.selectSnapshot(ProductState.getFavorites);
    this.favorites.set(favorites);
  }
}
