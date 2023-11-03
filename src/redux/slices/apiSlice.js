import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchProducts = createAsyncThunk("products/fetchProduct", async () => {
  try {
    const response = await fetch("http://localhost:3001/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.items = payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export { fetchProducts };
export default productsSlice.reducer;
