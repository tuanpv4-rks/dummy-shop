import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ISimpleProduct } from '@features/product/models/product.model';
import {
  AddToFavorites,
  RemoveFromFavorites,
} from '@features/product/stores/product.actions';
import { Store } from '@ngxs/store';
import { FavoriteToggleComponent } from '@shared/components/favorite-toggle/favorite-toggle.component';
import { ImgFallbackDirective } from '@shared/directives/img-fallback.directive';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ImgFallbackDirective,
    FavoriteToggleComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private store = inject(Store);

  public item = input.required<ISimpleProduct>();
  public favorite = input.required<boolean>();

  public handleFavorite(favorite: boolean): void {
    const id = this.item().id;
    if (!id) return;

    if (favorite) {
      this.store.dispatch(new AddToFavorites(id));
    } else {
      this.store.dispatch(new RemoveFromFavorites(id));
    }
  }
}
