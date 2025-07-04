import { Component, input, OnInit, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorite-toggle',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './favorite-toggle.component.html',
  styleUrl: './favorite-toggle.component.css',
})
export class FavoriteToggleComponent implements OnInit {
  public initialValue = input<boolean>(false);
  public favoriteChanged = output<boolean>();

  public favorite = signal<boolean>(false);

  public ngOnInit(): void {
    this.favorite.set(this.initialValue());
  }

  public handleToggle(): void {
    this.favorite.update(value => !value);
    this.favoriteChanged.emit(this.favorite());
  }
}
