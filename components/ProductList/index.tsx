// pages/products.tsx
import { ProductsData, ProductsVars } from "@/types/product";
import { gql, useQuery } from "@apollo/client";
import ProductCard from "./components/ProductCard";

const GET_PRODUCTS = gql`
  query getProducts(
    $search: String
    $filter: ProductAttributeFilterInput
    $pageSize: Int
    $currentPage: Int
  ) {
    products(
      search: $search
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      sort_fields {
        default
        options {
          label
          value
        }
      }
      items {
        sku
        uid
        name
        url_key
        url_suffix
        canonical_url
        stock_status
        meta_description
        meta_keyword
        meta_title
        new_from_date
        new_to_date
        description {
          html
        }
        rating_summary
        review_count
        short_description {
          html
        }
        thumbnail {
          url
          position
        }
        image {
          url
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
        color
        size
        rating_summary_start {
          star_1
          star_2
          star_3
          star_4
          star_5
        }
        attributes {
          attribute_code
          label
          value
        }
      }
      total_count
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`;

const ProductList = () => {
  const { loading, error, data } = useQuery<ProductsData, ProductsVars>(
    GET_PRODUCTS,
    {
      variables: { search: "", pageSize: 10, currentPage: 1 },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto">
      <h1>Products</h1>
      <div className="grid grid-cols-5 gap-5">
        {data?.products.items.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
