export interface Product {
  uid: string;
  name: string;
  description: { html: string };
  price_range: {
    maximum_price: {
      final_price: { value: number };
      regular_price: { value: number };
    };
  };
  image: { url: string };
  rating_summary: number;
}

export interface ProductsData {
  products: {
    items: Product[];
  };
}

export interface ProductsVars {
  search: string;
  pageSize: number;
  currentPage: number;
}
