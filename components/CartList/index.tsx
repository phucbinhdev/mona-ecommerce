import CartItem from "./components/CartItem";

const CartList = ({
  cart,
  onCartChange,
}: {
  cart: any;
  onCartChange: (loading: boolean) => void;
}) => {
  return (
    <div className="overflow-auto max-h-[calc(100vh-200px)]">
      {cart.items.map((item: any) => (
        <CartItem key={item.uid} item={item} onChange={onCartChange} />
      ))}
    </div>
  );
};

export default CartList;
