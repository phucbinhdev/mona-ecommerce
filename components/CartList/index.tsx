import { REMOVE_CART_ITEM, UPDATE_CART_ITEM_QUANTITY } from "@/mutations/cart";
import { useMutation } from "@apollo/client";

const CartList = ({ cart }: { cart: any }) => {
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);

  const handleRemoveItem = (itemUid: string) => {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      removeCartItem({
        variables: {
          removeItemFromCartInput: { cart_id: cartId, cart_item_uid: itemUid },
        },
        refetchQueries: ["getCart"],
      });
    }
  };

  const onUpdateQuantity = (itemUid: string, quantity: number) => {
    const cartId = localStorage.getItem("cartId");
    if (cartId && quantity > 0) {
      updateCartItemQuantity({
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
      });
    }
  };

  return (
    <>
      {cart.items.map((item: any) => (
        <div
          key={item.uid}
          className="border p-3 rounded-lg mb-3 bg-white shadow-sm"
        >
          <div className="flex">
            <div>
              <img
                src={item.product.image.url}
                alt={item.product.name}
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
                  <div
                    className="bg-slate-100 hover:bg-slate-200 cursor-pointer size-8 flex items-center justify-center rounded-md text-black select-none"
                    onClick={() =>
                      onUpdateQuantity(item.uid, item.quantity - 1)
                    }
                  >
                    <b className="-translate-y-[2px]">-</b>
                  </div>
                  <b>{item.quantity}</b>
                  <div
                    className="bg-black cursor-pointer size-8 flex items-center justify-center rounded-md text-white select-none"
                    onClick={() =>
                      onUpdateQuantity(item.uid, item.quantity + 1)
                    }
                  >
                    <b className="-translate-y-[1px]">+</b>
                  </div>
                </div>
                <div
                  className="bg-red-100 cursor-pointer size-8 flex items-center justify-center rounded-md text-white select-none ml-auto"
                  onClick={() => handleRemoveItem(item.uid)}
                >
                  <img
                    src="/images/icons/trash-sharp.svg"
                    className="size-4 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartList;
