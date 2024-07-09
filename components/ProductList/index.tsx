import { GET_PRODUCTS } from "@/graphql/product";
import { ProductsData, ProductsVars } from "@/types/product";
import { useQuery } from "@apollo/client";
import { Empty, Pagination, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

const ProductList = () => {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();
  const { search } = router.query;

  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data, fetchMore, refetch } = useQuery<
    ProductsData,
    ProductsVars
  >(GET_PRODUCTS, {
    variables: {
      search: (search as string) || "",
      pageSize: 20,
      currentPage: 1,
    },
  });

  useEffect(() => {
    if (search) {
      refetch({ search: search as string, currentPage: 1 });
    }
  }, [search, refetch]);

  useEffect(() => {
    refetch();
  }, []);

  const handlePageChange = async (page: number) => {
    try {
      setPageLoading(true);
      setCurrentPage(page);
      await fetchMore({
        variables: { currentPage: page },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return fetchMoreResult;
        },
      });
    } finally {
      setPageLoading(false);
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  if (data?.products.total_count == 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <Empty description="Không tìm thấy sản phẩm phù hợp" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Spin
        spinning={loading || pageLoading}
        className="min-h-[300px]"
        size="large"
      >
        <div className="grid grid-cols-5 gap-5">
          {data?.products.items.map((product) => (
            <ProductCard key={product.uid} product={product} />
          ))}
        </div>
      </Spin>
      {!!data?.products.page_info.page_size && (
        <div className="mt-5 pb-5">
          <Pagination
            align="center"
            showSizeChanger={false}
            showLessItems
            current={currentPage}
            pageSize={data?.products.page_info.page_size}
            total={data?.products.total_count}
            onChange={handlePageChange}
            hideOnSinglePage
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
