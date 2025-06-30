import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';
import { NavListComponent } from '@shared/components/nav-list/nav-list.component';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    NavListComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  public items = [
    { label: 'Products', routeLink: '/products' },
    { label: 'Favorites', routeLink: '/favorites' },
  ];

  public handleLogout(): void {
    this.authService.logout();
  }
}
