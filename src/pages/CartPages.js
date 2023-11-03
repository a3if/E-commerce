import React, { useEffect} from "react";
import { closeModal } from "../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { CartModal } from "../Components/CartModal";
import {
  decrement,
  fetchCartProduct,
  increment,
  emptyCart,
} from "../redux/slices/cartSlice";

const CartPages = () => {
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.modal.loading);

  const handleCloseModal = (e) => {
    dispatch(closeModal());
  };

  const { cart } = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchCartProduct());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [dispatch]);

  function findTotalPrice() {
    let totalPrice = 0;
    for (const item of cart) {
      totalPrice += item.price;
    }
    return totalPrice;
  }

  const handleIncrementQuantity = (
    productId,
    quantity,
    price,
    productPrice
  ) => {
    dispatch(increment({ productId, quantity, price, productPrice }));
  };

  const handleDecrementQuantity = (
    productId,
    quantity,
    price,
    productPrice
  ) => {
    dispatch(decrement({ productId, quantity, price, productPrice }));
  };

  const handleEmptyCart = () => {
    const productId = cart.map((item) => item.id);
    dispatch(emptyCart(productId));
  };
  return (
    <CartModal
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      cart={cart}
      findTotalPrice={findTotalPrice}
      handleDecrementQuantity={handleDecrementQuantity}
      handleIncrementQuantity={handleIncrementQuantity}
      handleEmptyCart={handleEmptyCart}
    />
  );
};

export default CartPages;
