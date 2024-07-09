import { gql } from "@apollo/client";

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation updateCartItem($input: UpdateCartItemsInput) {
    updateCartItems(input: $input) {
      cart {
        email
        id
        is_virtual
        total_quantity
      }
    }
  }
`;

export const REMOVE_CART_ITEM = gql`
  mutation removeItemFromCart(
    $removeItemFromCartInput: RemoveItemFromCartInput
  ) {
    removeItemFromCart(input: $removeItemFromCartInput) {
      cart {
        id
        items {
          uid
          errors {
            code
            message
          }
        }
      }
    }
  }
`;

export const GET_CART = gql`
  query getCart($cart_id: String!) {
    cart(cart_id: $cart_id) {
      id
      is_virtual
      total_quantity
      prices {
        grand_total {
          value
          currency
        }
      }
      items {
        uid
        quantity
        product {
          name
          image {
            url
          }
          price_range {
            maximum_price {
              final_price {
                value
                currency
              }
            }
          }
        }
      }
    }
  }
`;
