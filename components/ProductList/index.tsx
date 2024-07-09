import { GET_PRODUCTS } from "@/graphql/product";
import { ProductsData, ProductsVars } from "@/types/product";
import { useQuery } from "@apollo/client";
import { Empty, Pagination, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

const ProductList = () => {
  const router = useRouter();
  const { search, page } = router.query;

  const [currentPage, setCurrentPage] = useState(Number(page) || 1);

  const { loading, error, data, refetch } = useQuery<
    ProductsData,
    ProductsVars
  >(GET_PRODUCTS, {
    variables: {
      search: (search as string) || "",
      pageSize: 20,
      currentPage: Number(page) || 1,
    },
  });

  useEffect(() => {
    if (search || page) {
      const currentPage = Number(page) || 1;
      refetch({
        search: (search as string) || "",
        currentPage,
      });
      setCurrentPage(currentPage);
    }
  }, [search, page, refetch]);

  useEffect(() => {
    refetch();
  }, []);

  const handlePageChange = async (page: number) => {
    const { ...otherQueries } = router.query;
    router.push({
      pathname: "/",
      query: { ...otherQueries, page },
    });
    setCurrentPage(page);
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
      <Spin spinning={loading} className="min-h-[300px]" size="large">
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
