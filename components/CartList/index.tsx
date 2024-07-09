import CartItem from "./components/CartItem";

const CartList = ({ cart }: { cart: any }) => {
  return (
    <div className="overflow-auto max-h-[calc(100vh-200px)]">
      {cart.items.map((item: any) => (
        <CartItem key={item.uid} item={item} />
      ))}
    </div>
  );
};

export default CartList;
