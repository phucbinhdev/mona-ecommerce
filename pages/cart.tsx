import CartList from "@/components/CartList";
import { GET_CART } from "@/mutations/cart";
import { useQuery } from "@apollo/client";
import { Button } from "antd";
import React, { useEffect, useState } from "react";

const CartPage: React.FC = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  const { data, loading, error } = useQuery(GET_CART, {
    variables: { cart_id: cartId },
    skip: !cartId,
  });

  if (!cartId) {
    return <p>Bạn chưa có sản phẩm nào trong giỏ hàng. Mua sắm ngay</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { cart } = data;

  return (
    <div className="container mx-auto pt-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12">
          <h3 className="font-bold text-2xl">Giỏ hàng</h3>
          <p>Tổng {cart.total_quantity} món</p>
        </div>
        <div className="col-span-8">
          <CartList cart={cart} />
        </div>
        <div className="col-span-4">
          <div className="border p-5 rounded-md bg-white shadow-sm">
            <h3 className="font-bold text-xl mb-5">Tạm tính</h3>
            {cart.items.map((item: any) => (
              <div className="flex justify-between mb-2">
                <div className="flex flex-col">
                  <span>{item.product.name}</span>
                  <span className="text-gray-900 text-sm">
                    x{item.quantity}
                  </span>
                </div>
                <b>
                  {item.product.price_range.maximum_price.final_price.value}₫
                </b>
              </div>
            ))}
            <div className="flex justify-between mb-2 border-t pt-3 text-lg">
              <b>Tổng tiền hàng</b>
              <b>{cart.prices.grand_total.value}₫</b>
            </div>
            <Button type="primary" block className="mt-3">
              Thanh toán ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
