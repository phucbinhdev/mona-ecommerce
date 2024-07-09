import { REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from "@/graphql/cart";
import { debounce } from "@/utils/debounce";
import { useMutation } from "@apollo/client";
import { Popconfirm, Spin } from "antd";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const CartItem = ({
  item,
  onChange,
}: {
  item: any;
  onChange: (loading: boolean) => void;
}) => {
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleRemoveItem = async (itemUid: string) => {
    setLoading(true);
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      onChange(true);
      await removeCartItem({
        variables: {
          removeItemFromCartInput: {
            cart_id: cartId,
            cart_item_uid: itemUid,
          },
        },
        refetchQueries: ["getCart"],
        awaitRefetchQueries: true,
        onError: () => {
          setLoading(false);
          onChange(false);
        },
        onCompleted: () => onChange(false),
      });
    }
  };

  const handleUpdateQuantity = async (itemUid: string, quantity: number) => {
    const cartId = localStorage.getItem("cartId");
    if (cartId && quantity > 0) {
      onChange(true);
      await updateCartItemQuantity({
        variables: {
          input: {
            cart_id: cartId,
            cart_items: [
              {
                cart_item_uid: itemUid,
                quantity,
              },
            ],
          },
        },
        refetchQueries: ["getCart"],
        awaitRefetchQueries: true,
        onError: () => {
          setLoading(false);
          onChange(false);
        },
        onCompleted: () => onChange(false),
      });
    }
  };

  const debouncedHandleUpdateQuantity = useCallback(
    debounce(handleUpdateQuantity, 300),
    []
  );

  return (
    <Spin spinning={loading}>
      <div
        key={item.uid}
        className="border p-3 rounded-lg mb-3 bg-white shadow-sm"
      >
        <div className="flex">
          <div>
            <Image
              height={80}
              width={80}
              src={item?.product?.image?.url}
              alt={item?.product?.name}
              className="w-20 h-20 object-cover mr-5 rounded-lg border aspect-square"
            />
          </div>
          <div className="w-full">
            <div className="flex justify-between w-full">
              <h4 className="font-bold text-lg">{item.product.name}</h4>
              <b className="text-lg">
                {item.product.price_range.maximum_price.final_price.value}₫
              </b>
            </div>
            <div className="flex justify-between items-center w-full mt-5">
              <div className="flex items-center gap-4">
                {quantity > 1 ? (
                  <div
                    className="bg-slate-100 hover:bg-slate-200 cursor-pointer size-8 flex items-center justify-center rounded-md text-black select-none"
                    onClick={() => {
                      debouncedHandleUpdateQuantity(item.uid, quantity - 1);
                      setQuantity((quantity) => quantity - 1);
                    }}
                  >
                    <b className="-translate-y-[2px]">-</b>
                  </div>
                ) : (
                  <Popconfirm
                    title={`Bạn chắc chắn muốn bỏ sản phẩm này?`}
                    onConfirm={() => handleRemoveItem(item.uid)}
                    okText={"Đồng ý"}
                    cancelText={"Không"}
                    okButtonProps={{ size: "middle" }}
                    cancelButtonProps={{ size: "middle" }}
                  >
                    <div className="bg-slate-100 hover:bg-slate-200 cursor-pointer size-8 flex items-center justify-center rounded-md text-black select-none">
                      <b className="-translate-y-[2px]">-</b>
                    </div>
                  </Popconfirm>
                )}

                <b>{quantity}</b>
                <div
                  className="bg-black cursor-pointer size-8 flex items-center justify-center rounded-md text-white select-none"
                  onClick={() => {
                    debouncedHandleUpdateQuantity(item.uid, quantity + 1);
                    setQuantity((quantity) => quantity + 1);
                  }}
                >
                  <b className="-translate-y-[1px]">+</b>
                </div>
              </div>
              <Popconfirm
                title={`Bạn chắc chắn muốn bỏ sản phẩm này?`}
                onConfirm={() => {
                  handleRemoveItem(item.uid);
                }}
                okText={"Đồng ý"}
                cancelText={"Không"}
                okButtonProps={{ size: "middle" }}
                cancelButtonProps={{ size: "middle" }}
              >
                <div className="bg-red-100 cursor-pointer size-8 flex items-center justify-center rounded-md text-white select-none ml-auto">
                  <Image
                    width={16}
                    height={16}
                    src="/images/icons/trash-sharp.svg"
                    className="size-4"
                    alt={""}
                  />
                </div>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default CartItem;
