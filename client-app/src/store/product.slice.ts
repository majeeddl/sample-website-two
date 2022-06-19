import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit"

import productServices from "../services/product.services"

const initialState :any = {
    loading : false,
    products : [],
    error : null,
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers : {
        setProducts : (state, action) => {
            state.products = action.payload
        },
        addProduct : (state, action:any) => {
            state.products.push(action.payload)
        },
        updateProducts : (state, action:any) => {

        }
    },
    extraReducers :(builder)=> {
        builder.addCase(fetchProducts.pending , (state, action) => {
            state.loading = true
            state.error = null
        })

        builder.addCase(fetchProducts.fulfilled , (state, action) => {
            state.loading = false
            state.products = action.payload
        })

        builder.addCase(fetchProducts.rejected , (state, action) => {
            state.loading = false
            state.products = []
            state.error = action.error.message
        })
    },
})



export const fetchProducts = createAsyncThunk("products/getProducts", async () => {
    const response:any = await productServices.getProducts();
    return response.data;
})

const { setProducts, addProduct } = productsSlice.actions

export default productsSlice.reducer;