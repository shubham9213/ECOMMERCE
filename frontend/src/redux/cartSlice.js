import {createSlice} from "@reduxjs/toolkit";

const initialState={
    cartItem:localStorage.getItem("cartItem")?JSON.parse(localStorage.getItem("cartItem")):[]
}


const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
let data=action.payload;
let existing=state.cartItem.find((items)=>items.id===data.id)
if(existing){
    state.cartItem=state.cartItem.map((items)=>items.id===data.id? data: items);

}else{
    state.cartItem=[...state.cartItem,data];
}
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter(item => item.id !== action.payload);
            localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
        },
        clearcart:(state,action)=>{
            localStorage.removeItem("cartItem");
            state.cartItem=[];

        }
    }
});

export const { addToCart, removeFromCart ,clearcart} = cartSlice.actions;
export default cartSlice.reducer;
