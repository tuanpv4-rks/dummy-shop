import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { ISimpleProduct } from '@features/product/models/product.model';
import { ProductState } from '@features/product/store/product.state';
import { Store } from '@ngxs/store';
import { BreakpointService } from '@shared/services/breakpoint.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-list',
  imports: [
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    ScrollingModule,
    ProductCardComponent,
    MatDividerModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);
  private breakpointService = inject(BreakpointService);

  public items = input.required<ISimpleProduct[]>();
  public title = input<string>('');
  public emptyMessage = input<string>('No records found.');

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
    this.breakpointService.getScreenSize().subscribe(size => {
      const cols = this.colsDefs.get(size) ?? 1;
      this.cols.set(cols);
    });
  }
}
