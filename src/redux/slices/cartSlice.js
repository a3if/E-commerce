// cartSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchCartProduct = createAsyncThunk("cart/cartProduct", async () => {
  try {
    const response = await fetch("http://localhost:3001/cart");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
});

const addToCart = createAsyncThunk(
  "api/sendUserDataToApi",
  async (product, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          quantity: 1,
          productPrice:product.price,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const increment = createAsyncThunk(
  "cart/incrementQuantity",
  async ({ productId, quantity, price, productPrice }, { rejectWithValue }) => {
    try {
      let productBody = {
        quantity: ++quantity,
        price: quantity * productPrice,
      };
      const response = await fetch(`http://localhost:3001/cart/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(productBody),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const decrement = createAsyncThunk(
  "cart/decrementQuantity",
  async ({ productId, quantity, price, productPrice }, { rejectWithValue }) => {
    if (quantity === 1) {
      try {
        const response = await fetch(
          `http://localhost:3001/cart/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();
        if (data !== {}) {
          return {
            id: productId,
            quantity: quantity,
          };
        } else {
          return data;
        }

      
      } catch (error) {
        return rejectWithValue(error.message);
      }
    } else {
      try {
        let productBody = {
          quantity: --quantity,
          price: quantity * productPrice,
        };
        const response = await fetch(
          `http://localhost:3001/cart/${productId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productBody),
          }
        );

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

const emptyCart = createAsyncThunk(
  "cart/emptyCart",
  async (productID, { rejectWithValue }) => {
    try {
      const responses = await Promise.all(
        productID.map((id) =>
          fetch(`http://localhost:3001/cart/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
        )
      );

      responses.forEach((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
      });

      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: null,
    cart: [],
  },
  reducers: {
    emptyModal: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart = [...state.cart, payload];
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCartProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(increment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(increment.fulfilled, (state, { payload }) => {
        state.loading = false;

        const { id } = payload;
        const productIndex = state.cart.findIndex((item) => item.id === id);

        if (productIndex !== -1) {
          state.cart[productIndex].quantity += 1;
          state.cart[productIndex].price =
            state.cart[productIndex].productPrice *
            state.cart[productIndex].quantity;
        }
      })
      .addCase(increment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(decrement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(decrement.fulfilled, (state, { payload }) => {
        state.loading = false;

        const { id, } = payload;
        const productIndex = state.cart.findIndex((item) => item.id === id);
  
        if (productIndex >= 0 && state.cart[productIndex].quantity > 1) {
          state.cart[productIndex].quantity -= 1;
          state.cart[productIndex].price =
            state.cart[productIndex].productPrice *
            state.cart[productIndex].quantity;
        } else  {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      })

      .addCase(decrement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(emptyCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(emptyCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = [];
      })

      .addCase(emptyCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { emptyModal } = cartSlice.actions;
export {
  addToCart,
  fetchCartProduct,
  increment,
  decrement,
  emptyCart,
};
export default cartSlice.reducer;
