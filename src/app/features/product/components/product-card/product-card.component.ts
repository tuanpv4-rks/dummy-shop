import { CurrencyPipe, NgStyle } from '@angular/common';
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
import { ImgFallbackDirective } from '@shared/directives/img-fallback.directive';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NgStyle,
    ImgFallbackDirective,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private store = inject(Store);

  public item = input.required<ISimpleProduct>();
  public favorite = input.required<boolean>();
  public height = input<number>(200);

  public handleAdd(productId: number): void {
    this.store.dispatch(new AddToFavorites(productId));
  }

  public handleRemove(productId: number): void {
    this.store.dispatch(new RemoveFromFavorites(productId));
  }
}
