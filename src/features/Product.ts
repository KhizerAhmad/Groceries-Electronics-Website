import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type Item = {
  id: number;
  name: string;
  price: number;
  img: string;
};

type ProductsState = {
  products: Item[];
  loading: boolean;
  error: string | null | undefined;
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const api = await fetch("/api/homeItems");
    if (!api.ok) throw new Error("API is not working");
    const res = await api.json();
    return res as Item[];
  }
);

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});

export default productsSlice.reducer;
