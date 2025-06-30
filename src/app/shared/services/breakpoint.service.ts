import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService implements OnDestroy {
  private destroyed$ = new Subject<void>();
  private screenSize$ = new BehaviorSubject<string>('Unknown');

  private displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.screenSize$.next(this.displayNameMap.get(query) ?? 'Unknown');
          }
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public getScreenSize() {
    return this.screenSize$.asObservable();
  }

  public getCurrentValue() {
    return this.screenSize$.value;
  }
}
