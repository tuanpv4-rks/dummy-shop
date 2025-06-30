import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavLink } from '@shared/models/nav-list.model';

@Component({
  selector: 'app-nav-list',
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.css',
})
export class NavListComponent {
  public items = input.required<INavLink[]>();
}
