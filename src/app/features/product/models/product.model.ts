export interface ISimpleProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

export interface IProductResponse {
  products: ISimpleProduct[];
  limit: number;
  skip: number;
  total: number;
}
