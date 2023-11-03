import React, { useEffect } from "react";
import { Product } from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/apiSlice";
import { addToCart } from "../redux/slices/cartSlice";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import Loading from "../Components/Loading";

const ProductPage = () => {
  const dispatch = useDispatch();

  const { items, loading, error, openModal, cart } = useSelector((state) => ({
    items: state.products.items,
    loading: state.products.loading,
    error: state.products.error,
    openModal: state.modal.loading,
    cart: state.cart.cart,
  }));
  console.log(useSelector(state => state))

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchProducts());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [dispatch]);

  const handleAddToCart = (product) => {
      dispatch(addToCart(product));
  };

  let content;

  if (loading) {
    content = (
      <div>
        <Loading />
      </div>
    );
  }

 

  if (!items || items.length === 0) {
    content = (
      <p className="text-center p-[40px] text-[50px]">No products available.</p>
    );
  } else {
    content = (
      <Product
        items={items}
        handleAddToCart={handleAddToCart}
        openModal={openModal}
        cart={cart}
      />
    );
  }

  return content;
};

export default ProductPage;
