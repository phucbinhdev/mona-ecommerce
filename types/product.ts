export interface Product {
  uid: string;
  name: string;
  description: { html: string };
  image: { url: string };
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
