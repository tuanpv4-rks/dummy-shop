export class LoadProducts {
  static readonly type = '[Product] Load products';
}

export class AddToFavorites {
  static readonly type = '[Product] Add to favorites';
  constructor(public productId: number) {}
}

export class RemoveFromFavorites {
  static readonly type = '[Product] Remove from favorites';
  constructor(public productId: number) {}
}
