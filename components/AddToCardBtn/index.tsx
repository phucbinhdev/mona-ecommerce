import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { gql, useMutation } from "@apollo/client";
import { Button, message } from "antd";
import { useState } from "react";

// Mutation to create an empty cart
const CREATE_EMPTY_CART = gql`
  mutation createEmptyCart {
    createEmptyCart
  }
`;

// Mutation to add products to cart
const ADD_PRODUCT_TO_CART = gql`
  mutation addProductToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $cartItems) {
      cart {
        email
        id
        is_virtual
        total_quantity
      }
      user_errors {
        code
        message
      }
    }
  }
`;

const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
  const { setTotalQuantity } = useCart();
  const [createEmptyCart] = useMutation(CREATE_EMPTY_CART);
  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      let cartId = localStorage.getItem("cartId");
      if (!cartId) {
        // Create an empty cart
        const { data: createCartData } = await createEmptyCart();
        cartId = createCartData.createEmptyCart;
        localStorage.setItem("cartId", cartId || "");
      }

      // Add product to the cart
      const cartItems = [{ sku: product.sku, quantity: 1 }];
      const { data: addProductData } = await addProductToCart({
        variables: {
          cartId,
          cartItems,
        },
        refetchQueries: ["getCart"],
      });

      // Handle errors
      if (addProductData.addProductsToCart.user_errors.length > 0) {
        message.error(
          addProductData?.addProductsToCart?.user_errors?.[0]?.message
        );
      } else {
        setTotalQuantity(addProductData.addProductsToCart.cart.total_quantity);
        message.success("Đã thêm vào giỏ hàng");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      onClick={handleAddToCart}
      block
      className="font-semibold text-sm custom"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      }
      type="primary"
    >
      Thêm vào giỏ hàng
    </Button>
  );
};

export default AddToCartButton;
