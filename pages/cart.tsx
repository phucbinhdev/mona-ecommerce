import CartList from "@/components/CartList";
import { useCart } from "@/context/CartContext";
import { GET_CART } from "@/graphql/cart";
import { formatVND } from "@/utils/formatVND";
import { useQuery } from "@apollo/client";
import { Button, Empty, Spin } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CartPage: React.FC = () => {
  const [cartLoading, setCartLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>();
  const { setTotalQuantity } = useCart();
  const router = useRouter();

  const { data, loading, error, refetch } = useQuery(GET_CART, {
    variables: { cart_id: cartId },
    skip: !cartId,
  });

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  useEffect(() => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      refreshPage(cartId);
    }
  }, [router.pathname]);

  const refreshPage = async (cartId: string) => {
    setPageLoading(true);
    await refetch({ cart_id: cartId });
    setPageLoading(false);
  };

  useEffect(() => {
    if (data?.cart?.total_quantity >= 0) {
      setTotalQuantity(data.cart.total_quantity);
    }
  }, [data?.cart?.total_quantity]);

  if (!cartId || !data) {
    return <></>;
  }

  if (loading)
    return (
      <Spin spinning size="large">
        <div className="w-full min-h-[500px]"></div>
      </Spin>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Head>
        <title>Giỏ hàng | Adidas - Just do it</title>
      </Head>
      <div className="container mx-auto">
        <Spin size="large" spinning={loading || pageLoading}>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12">
              <h3 className="font-bold text-2xl">Giỏ hàng</h3>
              {data.cart.total_quantity > 0 && (
                <p>Tổng {data.cart.total_quantity} món</p>
              )}
            </div>
            {!data.cart.total_quantity && (
              <div className="col-span-12 flex items-center justify-center flex-col gap-5">
                <Empty
                  className="w-full col-span-12"
                  description={
                    <span className="text-gray-500">Giỏ hàng trống</span>
                  }
                />
                <Link href={"/"}>
                  <Button type="primary">Mua sắm ngay</Button>
                </Link>
              </div>
            )}
            {data.cart.total_quantity > 0 && (
              <>
                <div className="col-span-8">
                  <CartList
                    cart={data.cart}
                    onCartChange={(loading) => {
                      setCartLoading(loading);
                    }}
                  />
                </div>
                <div className="col-span-4">
                  <div className="border p-5 rounded-md bg-white shadow-sm">
                    <h3 className="font-bold text-xl mb-3">Tạm tính</h3>
                    <Spin spinning={loading || cartLoading}>
                      <div className="divide-y divide-dashed max-h-[500px] overflow-auto">
                        {data.cart.items.map((item: any) => (
                          <div
                            className="flex justify-between pb-2 pt-2"
                            key={item.uid}
                          >
                            <div className="flex flex-col">
                              <span>{item.product.name}</span>
                              <span className="text-gray-900 text-sm">
                                x{item.quantity}
                              </span>
                            </div>
                            <b>
                              {
                                item.product.price_range.maximum_price
                                  .final_price.value
                              }
                              ₫
                            </b>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mb-2 border-t pt-3 text-lg">
                        <b>Tổng tiền</b>
                        <b>{formatVND(data.cart.prices.grand_total.value)}₫</b>
                      </div>
                      <Button type="primary" block className="mt-3 custom">
                        Thanh toán ngay
                      </Button>
                    </Spin>
                  </div>
                </div>
              </>
            )}
          </div>
        </Spin>
      </div>
    </>
  );
};

export default CartPage;
