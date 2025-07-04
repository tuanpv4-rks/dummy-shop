import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgStyle } from '@angular/common';
import { Component, inject, input, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ISimpleProduct } from '@features/product/models/product.model';
import { ProductState } from '@features/product/stores/product.state';
import { Store } from '@ngxs/store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    ScrollingModule,
    ProductCardComponent,
    MatDividerModule,
    NgStyle,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private store = inject(Store);

  public items = input.required<ISimpleProduct[]>();
  public title = input<string>('');
  public emptyMessage = input<string>('No records found.');

  public favoriteIds: Signal<number[]> = this.store.selectSignal(
    ProductState.getFavoriteIds
  );

  public itemHeight = 176;

  public trackByFn(index: number, item: ISimpleProduct): number {
    return item.id;
  }
}
