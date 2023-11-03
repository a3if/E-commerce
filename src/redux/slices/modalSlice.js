import { createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
      loading: false,
    },
    reducers: {
      openModal:(state)=>{
        state.loading=true
        
      }, closeModal:(state)=>{
        state.loading=false
      }

    },
})


export const {openModal,closeModal} = modalSlice.actions
export default modalSlice.reducer
