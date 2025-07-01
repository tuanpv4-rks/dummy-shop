import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Logout } from '@features/auth/stores/auth.actions';
import { Actions, ofActionDispatched } from '@ngxs/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private actions$ = inject(Actions);
  private router = inject(Router);

  ngOnInit() {
    this.actions$.pipe(ofActionDispatched(Logout)).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
