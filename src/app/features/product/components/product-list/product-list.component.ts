import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ISimpleProduct } from '@features/product/models/product.model';
import {
  AddToFavorites,
  RemoveFromFavorites,
} from '@features/product/store/product.actions';
import { ProductState } from '@features/product/store/product.state';
import { Store } from '@ngxs/store';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointService } from '@shared/services/breakpoint.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-product-list',
  imports: [MatListModule, MatButtonModule, MatGridListModule, ScrollingModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  public store = inject(Store);
  public breakpointService = inject(BreakpointService);

  public items = input.required<ISimpleProduct[]>();
  public title = input<string>('');

  public favoriteIds: Signal<number[]> = this.store.selectSignal(
    ProductState.getFavoriteIds
  );

  private colsDefs = new Map<string, number>([
    ['XSmall', 1],
    ['Small', 1],
    ['Medium', 2],
    ['Large', 2],
    ['XLarge', 2],
  ]);

  public cols = signal<number>(1);

  public ngOnInit(): void {
    this.breakpointService.getScreenSize().subscribe((size) => {
      const cols = this.colsDefs.get(size) ?? 1;
      this.cols.set(cols);
    });
  }

  public handleAdd(productId: number): void {
    this.store.dispatch(new AddToFavorites(productId));
  }

  public handleRemove(productId: number): void {
    this.store.dispatch(new RemoveFromFavorites(productId));
  }
}
